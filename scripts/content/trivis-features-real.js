/**
 * Feature runners — prefer Trivis txt chat pipeline when available.
 */
(function () {
  "use strict";
  if (window.__trivisFeaturesRealV3__ || window.__zokysFeaturesRealV3__) return;
  window.__trivisFeaturesRealV3__ = true;
  window.__zokysFeaturesRealV3__ = true;

  var autoOn = false;
  try {
    chrome.storage.local.get(["trivis_auto_approve"], function (s) {
      autoOn = !!(s && s.trivis_auto_approve);
    });
    chrome.storage.onChanged.addListener(function (ch) {
      if (ch.trivis_auto_approve) autoOn = !!(ch.trivis_auto_approve.newValue);
    });
  } catch (_) {}

  function clickApproveButtons() {
    if (!autoOn) return;
    var ae = document.activeElement;
    if (ae && (ae.tagName === "TEXTAREA" || ae.tagName === "INPUT" || ae.isContentEditable)) return;
    try {
      var btns = document.querySelectorAll("button, [role='button']");
      for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        if (b.closest && b.closest("#trivis-vx-root")) continue;
        var t = ((b.getAttribute("aria-label") || "") + " " + (b.textContent || "")).trim().toLowerCase();
        if (!t || t.length > 48) continue;
        if (
          /^(approve|allow|accept|confirm|continue|yes|apply|run|execute)$/i.test(t) ||
          /approve|allow changes|accept changes|confirm/i.test(t)
        ) {
          try { b.click(); } catch (_) {}
        }
      }
    } catch (_) {}
  }

  if (/\/projects\//i.test(location.pathname)) {
    setInterval(clickApproveButtons, 1800);
  }

  window.__trivisInjectPrompt = window.__zokysInjectPrompt = function (text) {
    var fn = window.__trivisChatSendTxt || window.__zokysChatSendTxt;
    if (typeof fn === "function") {
      return fn(text, { mode: "build", autoSend: true, showLoader: true });
    }
    return false;
  };
})();
