/**
 * Trivis service worker bridge
 * - License validation against the public licensing service
 * - Heartbeat recheck (expire / ban / revoke → local kill)
 * - Inject freeze scripts ONLY when licensed
 * - Load original background logic via importScripts
 * Freeze script paths unchanged.
 */


const LOCK_FLAG_KEY = "trivis_extension_locked";
const LOCK_MSG_KEY = "trivis_lock_message";
const LEGACY_LOCK_FLAG_KEY = "zokys_extension_locked";
const LEGACY_LOCK_MSG_KEY = "zokys_lock_message";

const TRIVIS_API = "https://happy-little101.lovable.app/api/public/v1/licenses";
const LICENSE_PRODUCT = "browser-extension-core";
const EXTENSION_STATUS_API = "https://trivis-admin-panel.vercel.app/api/public/extension-status";
const EXTENSION_STATUS_API_FALLBACK = "https://trivis-admin-panel.vercel.app/api/extension-status";
const SWITCH_API = "https://trivis-admin-panel.vercel.app/api/public/switch-account";
const SWITCH_API_FALLBACK = "https://trivis-admin-panel.vercel.app/api/switch-account";
const KEY_RE = /^LXC-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/i;
const TOKEN_KEY = "trivis_license_key";
const OK_KEY = "trivis_lic_ok";
const SESSION_KEY = "trivis_lic_session";
const NAME_KEY = "trivis_user_name";
const EXP_KEY = "trivis_lic_expires";
const DEVICE_KEY = "trivis_device_id";
const LAST_CHECK_KEY = "trivis_last_recheck";

const HEARTBEAT_ALARM = "trivis_license_heartbeat";
const HEARTBEAT_MINUTES = 1;

const FREEZE_SCRIPTS_MAIN = ["scripts/content/z3hfc0.js"];
const FREEZE_SCRIPTS_ISOLATED = [
  "scripts/shared/a2m9kx.js",
  "scripts/shared/p5v0lc.js",
  "scripts/shared/j6y4bn.js",
  "scripts/content/r7wq1a.js"
];

function deviceId() {
  return new Promise((resolve) => {
    chrome.storage.local.get([DEVICE_KEY], (r) => {
      if (r[DEVICE_KEY]) return resolve(r[DEVICE_KEY]);
      let id = "tv_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      try {
        const arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        id =
          "tv_" +
          Array.from(arr)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .slice(0, 24);
      } catch (_) {}
      chrome.storage.local.set({ [DEVICE_KEY]: id }, () => resolve(id));
    });
  });
}

async function isLicensed() {
  const r = await chrome.storage.local.get([TOKEN_KEY, OK_KEY, EXP_KEY]);
  if (!(r[OK_KEY] === true || r[OK_KEY] === "1") || !r[TOKEN_KEY]) return false;
  if (!KEY_RE.test(String(r[TOKEN_KEY]).trim())) return false;
  if (r[EXP_KEY]) {
    const t = Date.parse(r[EXP_KEY]);
    if (t && Date.now() > t) return false;
  }
  return true;
}

async function clearLicense() {
  await chrome.storage.local.remove([
    TOKEN_KEY,
    OK_KEY,
    SESSION_KEY,
    NAME_KEY,
    EXP_KEY,
    LAST_CHECK_KEY
  ]);
}

/**
 * Server recheck using stored key + device.
 * Persistent login stays until server says invalid OR local expiry.
 * Network fail → keep current session (no false logout offline).
 */
async function revalidateFromServer() {
  const r = await chrome.storage.local.get([TOKEN_KEY, NAME_KEY, OK_KEY, EXP_KEY]);
  if (!(r[OK_KEY] === true || r[OK_KEY] === "1") || !r[TOKEN_KEY]) {
    return { ok: false, reason: "no_session" };
  }

  // Local expiry first
  if (r[EXP_KEY]) {
    const t = Date.parse(r[EXP_KEY]);
    if (t && Date.now() > t) {
      await clearLicense();
      return { ok: false, reason: "expired" };
    }
  }

  const key = String(r[TOKEN_KEY]).trim().toUpperCase();
  if (!KEY_RE.test(key)) {
    await clearLicense();
    return { ok: false, reason: "bad_key" };
  }

  try {
    const dev = await deviceId();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    let resp;
    try {
      resp = await fetch(TRIVIS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "check",
          licenseKey: key,
          productIdentifier: LICENSE_PRODUCT,
          deviceIdentifier: dev
        }),
        signal: ctrl.signal
      });
    } finally {
      clearTimeout(timer);
    }

    const data = await resp.json().catch(() => null);

    const status = String(data && data.status || "").toLowerCase();
    const definitive = ["invalid", "revoked", "expired", "device_mismatch", "device_limit_reached"];
    if (definitive.includes(status)) {
      await clearLicense();
      return {
        ok: false,
        reason: status,
        error: data.error || data.message || status
      };
    }

    if (!resp.ok || !data || status !== "active" || data.valid !== true) {
      await chrome.storage.local.set({ [LAST_CHECK_KEY]: Date.now() });
      return { ok: true, reason: "network_keep" };
    }

    const patch = { [LAST_CHECK_KEY]: Date.now(), [OK_KEY]: true };
    if (data.expiresAt) patch[EXP_KEY] = data.expiresAt;
    if (data.session) patch[SESSION_KEY] = data.session;
    await chrome.storage.local.set(patch);

    return {
      ok: true,
      reason: "revalidated",
      expires_at: data.expiresAt || r[EXP_KEY] || null,
      name: r[NAME_KEY] || null
    };
  } catch (_) {
    // Offline / abort → keep session
    return { ok: true, reason: "network_keep" };
  }
}

function isLovableProjectUrl(url) {
  try {
    // Only project workspace — never dashboard/home (freeze breaks project list + slows SPA)
    return /https:\/\/([a-z0-9-]+\.)?lovable\.dev\/projects\/[a-zA-Z0-9_-]+/i.test(String(url || ""));
  } catch (_) {
    return false;
  }
}

async function injectFreezeIntoTab(tabId, tabUrl) {
  try {
    if (tabUrl && !isLovableProjectUrl(tabUrl)) return;
    if (!tabUrl) {
      try {
        const t = await chrome.tabs.get(tabId);
        if (!t || !isLovableProjectUrl(t.url || "")) return;
      } catch (_) {
        return;
      }
    }
  } catch (_) {
    return;
  }

  try {
    const chk = await chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      world: "MAIN",
      func: function () {
        return !!(window.__TRIVIS_FREEZE_INJECTED__ || window.__ZOKYS_FREEZE_INJECTED__);
      }
    });
    if (chk && chk[0] && chk[0].result === true) return;
  } catch (_) {}

  await new Promise((r) => setTimeout(r, 2500));

  try {
    const chk2 = await chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      world: "MAIN",
      func: function () {
        return !!(window.__TRIVIS_FREEZE_INJECTED__ || window.__ZOKYS_FREEZE_INJECTED__);
      }
    });
    if (chk2 && chk2[0] && chk2[0].result === true) return;
  } catch (_) {}

  // Mark BEFORE inject so parallel onUpdated cannot double-run
  try {
    await chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      world: "MAIN",
      func: function () {
        try {
          window.__TRIVIS_FREEZE_INJECTED__ = true;
          window.__ZOKYS_FREEZE_INJECTED__ = true;
        } catch (e) {}
      }
    });
  } catch (_) {}

  try {
    for (const file of FREEZE_SCRIPTS_MAIN) {
      await chrome.scripting.executeScript({
        target: { tabId, allFrames: false },
        files: [file],
        world: "MAIN"
      });
    }
  } catch (_) {}

  try {
    await chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      files: FREEZE_SCRIPTS_ISOLATED,
      world: "ISOLATED"
    });
  } catch (_) {}

  try {
    await chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      files: ["scripts/content/trivis-label-main.js"],
      world: "MAIN"
    });
  } catch (_) {}

  try {
    await chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      world: "MAIN",
      func: function () {
        try {
          window.__TRIVIS_LICENSED__ = true;
          window.__ZOKYS_LICENSED__ = true;
        } catch (e) {}
      }
    });
  } catch (_) {}
}


async function injectFreezeAllLovableTabs() {
  const ok = await isLicensed();
  if (!ok) return;
  try {
    const tabs = await chrome.tabs.query({
      url: ["https://lovable.dev/projects/*", "https://*.lovable.dev/projects/*"]
    });
    for (const tab of tabs) {
      if (tab.id && isLovableProjectUrl(tab.url || "")) {
        await injectFreezeIntoTab(tab.id, tab.url);
      }
    }
  } catch (_) {}
}

function scheduleHeartbeat() {
  try {
    chrome.alarms.create(HEARTBEAT_ALARM, {
      delayInMinutes: 1,
      periodInMinutes: HEARTBEAT_MINUTES
    });
  } catch (_) {}
}



async function clearLovableSession() {
  try {
    const all = await chrome.cookies.getAll({});
    for (const c of all) {
      const host = (c.domain || "").replace(/^\./, "");
      if (!/lovable\.dev$/i.test(host) && host !== "lovable.dev") continue;
      try {
        const url = "https://" + host + (c.path || "/");
        await chrome.cookies.remove({ url: url, name: c.name });
        if (c.storeId) {
          await chrome.cookies.remove({ url: url, name: c.name, storeId: c.storeId });
        }
      } catch (_) {}
    }
  } catch (_) {}
  // Common auth cookie names explicit wipe
  const names = [
    "sb-access-token",
    "sb-refresh-token",
    "lovable-session",
    "lovable-session-id",
    "__session",
    "session"
  ];
  for (const name of names) {
    for (const host of ["lovable.dev", "www.lovable.dev"]) {
      try {
        await chrome.cookies.remove({ url: "https://" + host + "/", name: name });
      } catch (_) {}
    }
  }
}


async function executeAccountSwitch(inviteUrl) {
  const ok = await isLicensed();
  if (!ok) {
    return { ok: false, error: "Activate license first" };
  }
  const r = await chrome.storage.local.get([TOKEN_KEY, DEVICE_KEY]);
  const license_key = String(r[TOKEN_KEY] || "").trim();
  const device_id = r[DEVICE_KEY] || (await deviceId());
  if (!license_key) {
    return { ok: false, error: "No license key" };
  }

  const prev = await chrome.storage.local.get(["trivis_last_pool_email", "zokys_last_pool_email"]);
  const exclude_email = (prev && (prev.trivis_last_pool_email || prev.zokys_last_pool_email)) || "";
  const body = {
    license_key,
    device_id,
    invite_url: inviteUrl || "",
    exclude_email: exclude_email || undefined
  };

  async function post(url) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20000);
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
      const data = await resp.json().catch(() => null);
      return { resp, data };
    } finally {
      clearTimeout(t);
    }
  }

  let data = null;
  try {
    let out = await post(SWITCH_API);
    data = out.data;
    if (!data || (out.resp && out.resp.status === 404)) {
      out = await post(SWITCH_API_FALLBACK);
      data = out.data;
    }
  } catch (e) {
    return {
      ok: false,
      error: e && e.name === "AbortError" ? "Timeout" : "Network error"
    };
  }

  if (!data || data.ok === false) {
    return {
      ok: false,
      reason: (data && data.reason) || "failed",
      error: (data && (data.message || data.error)) || "Switch failed",
      switches_today: data && data.switches_today,
      daily_limit: data && data.daily_limit
    };
  }

  if (!data.account || !data.account.email || !data.account.password) {
    return { ok: false, error: "Server did not return account credentials" };
  }

  await clearLovableSession();

  const targetUrl = data.targetUrl || inviteUrl || "https://lovable.dev/";
  const email = String(data.account.email || "").trim();
  const password = String(data.account.password || "");

  await chrome.storage.local.set({
    trivis_switch_pending: true,
    trivis_switch_email: email,
    trivis_switch_password: password,
    trivis_invite_url: targetUrl,
    trivis_switch_at: Date.now(),
    trivis_switch_step: "login",
    trivis_last_pool_email: email,
    zokys_switch_pending: true,
    zokys_switch_email: email,
    zokys_switch_password: password,
    zokys_invite_url: targetUrl,
    zokys_switch_at: Date.now(),
    zokys_switch_step: "login",
    zokys_last_pool_email: email
  });

  // Wipe page storage on all Lovable tabs, then focus login
  try {
    const tabs = await chrome.tabs.query({ url: ["https://lovable.dev/*", "https://*.lovable.dev/*"] });
    for (const tab of tabs) {
      if (!tab.id) continue;
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          world: "MAIN",
          func: function () {
            try {
              localStorage.clear();
              sessionStorage.clear();
            } catch (e) {}
            try {
              if (indexedDB && indexedDB.databases) {
                indexedDB.databases().then(function (dbs) {
                  (dbs || []).forEach(function (db) {
                    if (db && db.name) indexedDB.deleteDatabase(db.name);
                  });
                });
              }
            } catch (e) {}
          }
        });
      } catch (_) {}
    }
  } catch (_) {}

  // Force all lovable tabs to login (replace) after storage wipe
  try {
    const tabs = await chrome.tabs.query({ url: ["https://lovable.dev/*", "https://*.lovable.dev/*"] });
    for (const tab of tabs) {
      if (!tab.id) continue;
      try {
        await chrome.tabs.update(tab.id, { url: "https://lovable.dev/login?trivis_sw=" + Date.now() });
      } catch (_) {}
    }
  } catch (_) {}

  return {
    ok: true,
    email: email,
    targetUrl: targetUrl,
    switches_today: data.switches_today,
    switches_left_today: data.switches_left_today,
    daily_limit: data.daily_limit || 2,
    cost: data.cost || 0
  };
}



async function applyLockState(data) {
  if (!data || typeof data !== "object") return;
  const locked = data.extension_locked === true || data.extension_locked === "true" || data.extension_locked === 1;
  const msg = String(data.lock_message || "Extension is locked. Please contact the administrator.").trim();
  await chrome.storage.local.set({
    [LOCK_FLAG_KEY]: locked,
    [LOCK_MSG_KEY]: msg || "Extension is locked. Please contact the administrator.",
    [LEGACY_LOCK_FLAG_KEY]: locked,
    [LEGACY_LOCK_MSG_KEY]: msg || "Extension is locked. Please contact the administrator."
  });
  try {
    const tabs = await chrome.tabs.query({ url: ["https://lovable.dev/*", "https://*.lovable.dev/*"] });
    for (const tab of tabs) {
      if (!tab.id) continue;
      try {
        chrome.tabs.sendMessage(tab.id, {
          type: "TRIVIS_LOCK_STATE",
          locked,
          message: msg
        }).catch(() => {});
        chrome.tabs.sendMessage(tab.id, {
          type: "ZOKYS_LOCK_STATE",
          locked,
          message: msg
        }).catch(() => {});
      } catch (_) {}
    }
  } catch (_) {}
}

async function fetchExtensionStatus() {
  const body = {};
  try {
    const r = await chrome.storage.local.get([TOKEN_KEY]);
    if (r[TOKEN_KEY]) body.license_key = r[TOKEN_KEY];
  } catch (_) {}
  async function post(url) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
      return await resp.json().catch(() => null);
    } finally {
      clearTimeout(t);
    }
  }
  try {
    let data = await post(EXTENSION_STATUS_API);
    if (!data || data.ok === undefined) {
      data = await post(EXTENSION_STATUS_API_FALLBACK);
    }
    if (data) await applyLockState(data);
    return data;
  } catch (_) {
    return null;
  }
}


chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (!msg || !msg.type) return false;

  if (msg.type === "TRIVIS_LOCK_STATUS" || msg.type === "ZOKYS_LOCK_STATUS") {
    (async () => {
      try {
        await fetchExtensionStatus();
      } catch (_) {}
      const r = await chrome.storage.local.get([LOCK_FLAG_KEY, LOCK_MSG_KEY, LEGACY_LOCK_FLAG_KEY, LEGACY_LOCK_MSG_KEY]);
      sendResponse({
        locked: r[LOCK_FLAG_KEY] === true || r[LEGACY_LOCK_FLAG_KEY] === true,
        message: r[LOCK_MSG_KEY] || r[LEGACY_LOCK_MSG_KEY] || "Extension is locked"
      });
    })();
    return true;
  }

  if (msg.type === "TRIVIS_VALIDATE") {
    (async () => {
      try {
        const key = String(msg.key || "").trim().toUpperCase();
        const name = String(msg.name || "").trim().slice(0, 64);
        const dev = await deviceId();
        if (!KEY_RE.test(key)) {
          sendResponse({ ok: false, error: "Format: LXC-XXXXX-XXXXX-XXXXX-XXXXX" });
          return;
        }
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 15000);
        let resp;
        try {
          resp = await fetch(TRIVIS_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              operation: "activate",
              licenseKey: key,
              productIdentifier: LICENSE_PRODUCT,
              deviceIdentifier: dev
            }),
            signal: ctrl.signal
          });
        } finally {
          clearTimeout(t);
        }
        const data = await resp.json().catch(() => null);
        const status = String(data && data.status || "").toLowerCase();
        const definitive = ["invalid", "revoked", "expired", "device_mismatch", "device_limit_reached"];
        if (definitive.includes(status)) {
          await clearLicense();
          sendResponse({
            ok: false,
            error: (data && (data.error || data.message)) || status
          });
          return;
        }
        if (!resp.ok || !data || data.valid !== true || status !== "active") {
          sendResponse({
            ok: false,
            error: (data && (data.error || data.message)) || "License service unavailable"
          });
          return;
        }
        const patch = {
          [TOKEN_KEY]: key,
          [OK_KEY]: true,
          [SESSION_KEY]: data.session || "sess_" + Date.now(),
          [NAME_KEY]: data.user_name || name || "Trivis User",
          [LAST_CHECK_KEY]: Date.now()
        };
        if (data.expiresAt) patch[EXP_KEY] = data.expiresAt;
        await chrome.storage.local.set(patch);
        await injectFreezeAllLovableTabs();
        scheduleHeartbeat();
        sendResponse({
          ok: true,
          session: patch[SESSION_KEY],
          expires_at: data.expiresAt || null,
          user_name: patch[NAME_KEY],
          name: patch[NAME_KEY],
          key
        });
      } catch (e) {
        sendResponse({
          ok: false,
          error: e && e.name === "AbortError" ? "Timeout" : "Network error"
        });
      }
    })();
    return true;
  }

  // Fast local status — persistent login, no key prompt
  if (msg.type === "TRIVIS_STATUS") {
    (async () => {
      const ok = await isLicensed();
      const r = await chrome.storage.local.get([TOKEN_KEY, NAME_KEY, EXP_KEY]);
      sendResponse({
        ok,
        key: r[TOKEN_KEY] || null,
        name: r[NAME_KEY] || null,
        expires_at: r[EXP_KEY] || null
      });
    })();
    return true;
  }

  // Explicit server recheck (UI / manual)
  if (msg.type === "TRIVIS_RECHECK") {
    (async () => {
      const result = await revalidateFromServer();
      const r = await chrome.storage.local.get([TOKEN_KEY, NAME_KEY, EXP_KEY]);
      sendResponse({
        ok: result.ok && (await isLicensed()),
        reason: result.reason || null,
        error: result.error || null,
        key: r[TOKEN_KEY] || null,
        name: r[NAME_KEY] || null,
        expires_at: r[EXP_KEY] || null
      });
    })();
    return true;
  }

  if (msg.type === "TRIVIS_SWITCH_ACCOUNT" || msg.type === "ZOKYS_SWITCH_ACCOUNT") {
    (async () => {
      try {
        const res = await executeAccountSwitch(msg.inviteUrl || msg.invite_url || "");
        sendResponse(res);
      } catch (e) {
        sendResponse({ ok: false, error: String(e && e.message || e) });
      }
    })();
    return true;
  }

  if (msg.type === "TRIVIS_LOGOUT") {
    clearLicense().then(() => sendResponse({ ok: true }));
    return true;
  }

  return false;
});

// Heartbeat alarm — only kills on expire / ban / revoke
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== HEARTBEAT_ALARM) return;
  revalidateFromServer().then((res) => {
    if (res && res.ok === false && ["invalid", "revoked", "expired", "device_mismatch", "device_limit_reached"].includes(res.reason)) {
      // session cleared; next UI poll will show gate
    }
  });
});

// When user opens / navigates Lovable, inject freeze if licensed
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status !== "complete" || !tab.url) return;
  // Dashboard: no freeze inject (blank projects / lag)
  if (!isLovableProjectUrl(tab.url)) return;
  isLicensed().then((ok) => {
    if (ok) injectFreezeIntoTab(tabId, tab.url);
  });
});

function boot() {
  scheduleHeartbeat();
  fetchExtensionStatus().catch(() => {});
  isLicensed().then((ok) => {
    if (ok) {
      injectFreezeAllLovableTabs();
      // soft recheck soon after boot (ban catch without waiting full period)
      setTimeout(() => {
        revalidateFromServer();
      }, 3000);
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  boot();
});
chrome.runtime.onStartup.addListener(() => {
  boot();
});

// SW wake — schedule + soft check
boot();

// Load original background (obfuscated) — freeze / panel support logic
try {
  importScripts("xoqoebay2.js");
} catch (e) {
  console.warn("[Trivis] original background import failed", e);
}


// Re-run login helper when landing on login during switch
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status !== "complete" || !tab.url) return;
  if (!/lovable\.dev\/(login|signin)/i.test(tab.url) && !/lovable\.dev\/login/i.test(tab.url)) return;
  chrome.storage.local.get(["trivis_switch_pending", "zokys_switch_pending"], (s) => {
    if (!s || (!s.trivis_switch_pending && !s.zokys_switch_pending)) return;
    try {
      chrome.scripting.executeScript({
        target: { tabId, allFrames: false },
        files: ["scripts/content/trivis-switch-login.js"]
      });
    } catch (_) {}
  });
});


// Soft keepalive — never re-inject method scripts
try {
  chrome.alarms.create("TRIVIS_FREEZE_KEEPALIVE", { periodInMinutes: 5 });
} catch (_) {}
chrome.alarms.onAlarm.addListener((alarm) => {
  if (!alarm || (alarm.name !== "TRIVIS_FREEZE_KEEPALIVE" && alarm.name !== "ZOKYS_FREEZE_KEEPALIVE")) return;
  isLicensed().then((ok) => {
    if (!ok) return;
    chrome.tabs.query({ active: true, url: ["https://lovable.dev/projects/*", "https://*.lovable.dev/projects/*"] }, (tabs) => {
      (tabs || []).forEach((tab) => {
        if (!tab || !tab.id) return;
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          world: "MAIN",
          func: function () {
            try {
              window.__TRIVIS_LICENSED__ = true;
              window.__ZOKYS_LICENSED__ = true;
            } catch (e) {}
          }
        }).catch(() => {});
      });
    });
  });
});

