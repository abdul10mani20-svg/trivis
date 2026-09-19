/**
 * Native chat lock disabled (user request) — removes any leftover overlay.
 */
(function () {
  "use strict";
  if (window.__trivisNativeLockOff__ || window.__zokysNativeLockOff__) return;
  window.__trivisNativeLockOff__ = true;
  window.__zokysNativeLockOff__ = true;
  function clear() {
    try {
      var el1 = document.getElementById("trivis-native-lock");
      if (el1) el1.remove();
      var el2 = document.getElementById("zokys-native-lock");
      if (el2) el2.remove();
    } catch (_) {}
  }
  clear();
  setInterval(clear, 8000);
})();
