/**
 * Global Extension Lock — UI lock, shake, notice.
 */
(function () {
  "use strict";
  if (window.__trivisGlobalLock1__ || window.__zokysGlobalLock1__) return;
  window.__trivisGlobalLock1__ = true;
  window.__zokysGlobalLock1__ = true;
  if (!/lovable\.dev/i.test(location.hostname || "")) return;

  var locked = false;
  var lockMessage = "Extension is locked. Please contact the administrator.";

  function load() {
    try {
      chrome.storage.local.get(
        ["trivis_extension_locked", "trivis_lock_message", "zokys_extension_locked", "zokys_lock_message"],
        function (s) {
          locked = !!(s && (s.trivis_extension_locked === true || s.zokys_extension_locked === true));
          if (s && (s.trivis_lock_message || s.zokys_lock_message)) {
            lockMessage = s.trivis_lock_message || s.zokys_lock_message;
          }
          paintLocks();
        }
      );
    } catch (_) {}
  }

  function paintLocks() {
    try {
      var root = document.getElementById("trivis-vx-root");
      if (!root) return;
      if (!locked) {
        if (root.hasAttribute("data-trivis-locked") || root.hasAttribute("data-zokys-locked")) {
          root.removeAttribute("data-trivis-locked");
          root.removeAttribute("data-zokys-locked");
          var oldBadges = root.querySelectorAll(".trivis-lock-badge, .zokys-lock-badge");
          for (var b = 0; b < oldBadges.length; b++) oldBadges[b].remove();
        }
        return;
      }
      root.setAttribute("data-trivis-locked", "1");
      root.setAttribute("data-zokys-locked", "1");

      // Overlay badges on section panels / icon buttons
      var icons = root.querySelectorAll("[data-action], .vx-icon, button, [role='button']");
      for (var i = 0; i < icons.length; i++) {
        var el = icons[i];
        if (el.getAttribute("data-trivis-lock-badge") === "1" || el.getAttribute("data-zokys-lock-badge") === "1") {
          if (!locked) {
            el.removeAttribute("data-trivis-lock-badge");
            el.removeAttribute("data-zokys-lock-badge");
            var b = el.querySelector(".trivis-lock-badge, .zokys-lock-badge");
            if (b) b.remove();
          }
          continue;
        }
        if (!locked) continue;
        el.setAttribute("data-trivis-lock-badge", "1");
        el.setAttribute("data-zokys-lock-badge", "1");
        if (!el.querySelector(".trivis-lock-badge, .zokys-lock-badge")) {
          var badge = document.createElement("span");
          badge.className = "trivis-lock-badge zokys-lock-badge";
          badge.textContent = "🔒";
          badge.style.cssText =
            "position:absolute;top:2px;right:2px;font-size:10px;pointer-events:none;filter:drop-shadow(0 0 4px rgba(0,0,0,.6));z-index:5;";
          if (getComputedStyle(el).position === "static") el.style.position = "relative";
          el.appendChild(badge);
        }
      }
    } catch (_) {}
  }

  function shake(el) {
    if (!el) return;
    el.classList.remove("trivis-shake", "zokys-shake");
    void el.offsetWidth;
    el.classList.add("trivis-shake", "zokys-shake");
    setTimeout(function () {
      el.classList.remove("trivis-shake", "zokys-shake");
    }, 500);
  }

  function ensureCss() {
    if (document.getElementById("trivis-lock-css") || document.getElementById("zokys-lock-css")) return;
    var st = document.createElement("style");
    st.id = "trivis-lock-css";
    st.textContent =
      "@keyframes trivisShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px) rotate(-1deg)}40%{transform:translateX(6px) rotate(1deg)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}" +
      ".trivis-shake, .zokys-shake{animation:trivisShake .45s cubic-bezier(.36,.07,.19,.97) both!important}" +
      "#trivis-vx-root[data-trivis-locked='1'], #trivis-vx-root[data-zokys-locked='1']{opacity:.95}" +
      "#trivis-lock-notice, #zokys-lock-notice{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;" +
      "padding:24px;background:rgba(4,2,12,.72);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);" +
      "font-family:Inter,system-ui,sans-serif}" +
      "#trivis-lock-notice .zk-n-card, #zokys-lock-notice .zk-n-card{position:relative;width:min(400px,100%);border-radius:24px;padding:28px 22px;" +
      "background:linear-gradient(160deg,rgba(25,4,8,.96),rgba(12,2,4,.98));" +
      "border:1px solid rgba(255,35,65,.45);box-shadow:0 28px 80px rgba(0,0,0,.8),0 0 60px rgba(255,30,56,.3);" +
      "text-align:center;overflow:hidden;animation:zkLockIn .5s cubic-bezier(.22,1,.36,1) both}" +
      "@keyframes zkLockIn{from{opacity:0;transform:scale(.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}" +
      "#trivis-lock-notice .zk-n-orb, #zokys-lock-notice .zk-n-orb{position:absolute;width:160px;height:160px;border-radius:50%;filter:blur(40px);opacity:.5;pointer-events:none}" +
      "#trivis-lock-notice .zk-n-orb.a, #zokys-lock-notice .zk-n-orb.a{top:-50px;right:-40px;background:rgba(255,30,56,.45)}" +
      "#trivis-lock-notice .zk-n-orb.b, #zokys-lock-notice .zk-n-orb.b{bottom:-50px;left:-40px;background:rgba(180,10,30,.35)}" +
      "#trivis-lock-notice .zk-n-icon, #zokys-lock-notice .zk-n-icon{position:relative;font-size:42px;margin-bottom:10px;filter:drop-shadow(0 0 16px rgba(255,30,56,.7));animation:zkPulse 1.6s ease-in-out infinite}" +
      "@keyframes zkPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}" +
      "#trivis-lock-notice .zk-n-title, #zokys-lock-notice .zk-n-title{position:relative;font-size:20px;font-weight:900;letter-spacing:.06em;" +
      "background:linear-gradient(100deg,#fff,#ffa4b0,#ff1e38);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}" +
      "#trivis-lock-notice .zk-n-msg, #zokys-lock-notice .zk-n-msg{position:relative;font-size:14px;line-height:1.55;color:rgba(254,226,226,.9);margin:0 0 16px;font-weight:600}" +
      "#trivis-lock-notice .zk-n-sub, #zokys-lock-notice .zk-n-sub{position:relative;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#df806c;margin-bottom:18px}" +
      "#trivis-lock-notice .zk-n-btn, #zokys-lock-notice .zk-n-btn{position:relative;border:none;cursor:pointer;padding:12px 22px;border-radius:14px;font-weight:800;font-size:13px;" +
      "color:#fff;background:linear-gradient(135deg,#e60026,#ff1e38);box-shadow:0 10px 28px rgba(255,30,56,.45)}" +
      "#trivis-lock-banner, #zokys-lock-banner{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:2147483645;" +
      "padding:10px 18px;border-radius:999px;font-family:Inter,system-ui,sans-serif;font-size:12px;font-weight:800;" +
      "letter-spacing:.04em;color:#fff;background:linear-gradient(90deg,#990014,#e60026);border:1px solid rgba(255,35,65,.5);" +
      "box-shadow:0 12px 32px rgba(0,0,0,.6),0 0 20px rgba(255,30,56,.3);pointer-events:none}";
    (document.head || document.documentElement).appendChild(st);
  }

  function showCrazyNotice(msg) {
    ensureCss();
    var old = document.getElementById("trivis-lock-notice") || document.getElementById("zokys-lock-notice");
    if (old) old.remove();
    var ov = document.createElement("div");
    ov.id = "trivis-lock-notice";
    ov.innerHTML =
      '<div class="zk-n-card">' +
      '<div class="zk-n-orb a"></div><div class="zk-n-orb b"></div>' +
      '<div class="zk-n-icon">🔒</div>' +
      '<div class="zk-n-title">EXTENSION LOCKED</div>' +
      '<div class="zk-n-sub">Trivis V3 · Global Lock</div>' +
      '<div class="zk-n-msg"></div>' +
      '<button type="button" class="zk-n-btn" id="trivis-lock-ok">Got it</button>' +
      "</div>";
    ov.querySelector(".zk-n-msg").textContent = msg || lockMessage || "Extension is locked";
    document.documentElement.appendChild(ov);
    var okBtn = ov.querySelector("#trivis-lock-ok");
    if (okBtn) {
      okBtn.onclick = function () {
        ov.remove();
      };
    }
    ov.onclick = function (e) {
      if (e.target === ov) ov.remove();
    };
  }

  function showBanner() {
    ensureCss();
    var b = document.getElementById("trivis-lock-banner") || document.getElementById("zokys-lock-banner");
    if (!locked) {
      if (b) b.remove();
      return;
    }
    if (!b) {
      b = document.createElement("div");
      b.id = "trivis-lock-banner";
      document.documentElement.appendChild(b);
    }
    b.textContent = "🔒 " + (lockMessage || "Extension is locked");
  }

  // Block extension UI clicks when locked
  document.addEventListener(
    "click",
    function (e) {
      if (!locked) return;
      var t = e.target;
      if (!t || !t.closest) return;
      var root = t.closest("#trivis-vx-root");
      if (!root) return;
      // allow nothing except maybe viewing
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var hit = t.closest("button, [data-action], .vx-icon, a, [role='button']") || root;
      shake(hit);
      showCrazyNotice(lockMessage);
    },
    true
  );

  // Block chat send when locked
  document.addEventListener(
    "click",
    function (e) {
      if (!locked) return;
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("#trivis-vx-root") || t.closest("#trivis-lock-notice") || t.closest("#zokys-lock-notice")) return;
      var btn = t.closest("button");
      if (!btn) return;
      var al = ((btn.getAttribute("aria-label") || "") + " " + (btn.textContent || "")).toLowerCase();
      var looksSend =
        /send/i.test(al) ||
        (btn.querySelector("svg") && btn.getBoundingClientRect().bottom > window.innerHeight * 0.45);
      if (!looksSend) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showCrazyNotice(lockMessage || "Extension is locked");
    },
    true
  );

  document.addEventListener(
    "keydown",
    function (e) {
      if (!locked) return;
      if (e.key !== "Enter" || e.shiftKey) return;
      var ae = document.activeElement;
      if (!ae) return;
      if (ae.tagName !== "TEXTAREA" && ae.getAttribute("contenteditable") !== "true") return;
      if (ae.closest && ae.closest("#trivis-vx-root")) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showCrazyNotice(lockMessage || "Extension is locked");
    },
    true
  );

  try {
    chrome.runtime.onMessage.addListener(function (msg) {
      if (!msg || (msg.type !== "TRIVIS_LOCK_STATE" && msg.type !== "ZOKYS_LOCK_STATE")) return;
      locked = !!msg.locked;
      if (msg.message) lockMessage = msg.message;
      ensureCss();
      showBanner();
      paintLocks();
      if (locked) {
        // soft pulse notice once per lock
        if (!sessionStorage.getItem("trivis_lock_seen") && !sessionStorage.getItem("zokys_lock_seen")) {
          sessionStorage.setItem("trivis_lock_seen", "1");
          sessionStorage.setItem("zokys_lock_seen", "1");
          showCrazyNotice(lockMessage);
        }
      } else {
        sessionStorage.removeItem("trivis_lock_seen");
        sessionStorage.removeItem("zokys_lock_seen");
        var n = document.getElementById("trivis-lock-notice") || document.getElementById("zokys-lock-notice");
        if (n) n.remove();
        showBanner();
      }
    });
  } catch (_) {}

  try {
    chrome.storage.onChanged.addListener(function (ch, area) {
      if (area !== "local") return;
      if (
        ch.trivis_extension_locked ||
        ch.zokys_extension_locked ||
        ch.trivis_lock_message ||
        ch.zokys_lock_message
      ) {
        load();
        ensureCss();
        showBanner();
      }
    });
  } catch (_) {}

  ensureCss();
  load();
  showBanner();
  setInterval(paintLocks, 2000);
  // Refresh lock from server occasionally
  try {
    chrome.runtime.sendMessage({ type: "TRIVIS_LOCK_STATUS" }, function () {
      void chrome.runtime.lastError;
      load();
      showBanner();
    });
  } catch (_) {}
})();
