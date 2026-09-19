/**
 * Remove V5 freeze "License required" chat lock if license already active in Trivis storage.
 * High Performance Edition: No aggressive mutation observer, no full-DOM queries, zero typing lag.
 */
(function () {
  "use strict";
  if (window.__trivisLicKiller__ || window.__zokysLicKiller__) return;
  window.__trivisLicKiller__ = true;
  window.__zokysLicKiller__ = true;

  var cachedOk = false;

  function checkLicenseState() {
    try {
      chrome.storage.local.get(
        ["trivis_lic_ok", "trivis_license_key", "trivis_lic_expires"],
        function (s) {
          var ok = !!(s && (s.trivis_lic_ok === true || s.trivis_lic_ok === "1") && s.trivis_license_key);
          if (ok && s.trivis_lic_expires) {
            var t = Date.parse(s.trivis_lic_expires);
            if (t && Date.now() > t) ok = false;
          }
          cachedOk = ok;
          if (cachedOk) killOverlay();
        }
      );
    } catch (_) {}
  }

  function killOverlay() {
    if (!cachedOk) return;
    try {
      // Targeted modal lookup instead of scanning thousands of divs across whole page
      var targets = document.querySelectorAll("[role='dialog'], dialog, [class*='modal' i], [class*='overlay' i], [class*='lock' i], [id*='lock' i]");
      var killedAny = false;
      for (var i = 0; i < targets.length; i++) {
        var el = targets[i];
        if (el.closest && el.closest("#trivis-vx-root")) continue;
        if (el.getAttribute("data-trivis-killed-lic") === "1" || el.getAttribute("data-zokys-killed-lic") === "1") continue;
        var t = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (!t || t.length > 300) continue;
        if (
          /License required/i.test(t) &&
          (/Activate your license/i.test(t) || /prompt box/i.test(t) || /Lovable extension/i.test(t))
        ) {
          try {
            el.style.setProperty("display", "none", "important");
            el.style.setProperty("pointer-events", "none", "important");
            el.setAttribute("data-trivis-killed-lic", "1");
            el.setAttribute("data-zokys-killed-lic", "1");
            var p = el.parentElement;
            if (p && (p.textContent || "").length < 400 && /License required/i.test(p.textContent || "")) {
              p.style.setProperty("display", "none", "important");
            }
            killedAny = true;
          } catch (_) {}
        }
      }

      // Unlock composer ONLY if a freeze lock was actually killed
      if (killedAny) {
        var tas = document.querySelectorAll("textarea, [contenteditable='true']");
        for (var j = 0; j < tas.length; j++) {
          var n = tas[j];
          if (n.closest && n.closest("#trivis-vx-root")) continue;
          try {
            n.style.removeProperty("pointer-events");
            n.removeAttribute("disabled");
            n.readOnly = false;
          } catch (_) {}
        }
      }
    } catch (_) {}
  }

  checkLicenseState();
  setInterval(killOverlay, 4500);

  try {
    chrome.storage.onChanged.addListener(function (ch, area) {
      if (area !== "local") return;
      if (ch.trivis_lic_ok || ch.trivis_license_key || ch.trivis_lic_expires) {
        checkLicenseState();
      }
    });
  } catch (_) {}

  // Tell page freeze license is OK (best-effort)
  try {
    chrome.storage.local.get(["trivis_lic_ok", "trivis_license_key"], function (s) {
      if (s && (s.trivis_lic_ok === true || s.trivis_lic_ok === "1")) {
        try {
          window.postMessage({ type: "TRIVIS_LICENSE_OK", ok: true, key: s.trivis_license_key || "" }, "*");
        } catch (_) {}
      }
    });
  } catch (_) {}
})();
