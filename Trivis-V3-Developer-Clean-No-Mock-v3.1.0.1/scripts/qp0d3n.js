/**
 * Trivis popup license gate
 * Loads original panel scripts only after valid license.
 */
(function () {
  "use strict";

  var nameEl = document.getElementById("trivis-name");
  var keyEl = document.getElementById("trivis-key");
  var btn = document.getElementById("trivis-activate");
  var msg = document.getElementById("trivis-msg");
  var gateBody = document.getElementById("trivis-license-body");
  var panelBody = document.getElementById("sp-body");
  var footer = document.getElementById("sp-footer");

  function setMsg(text, ok) {
    if (!msg) return;
    msg.textContent = text || "";
    msg.className = "trivis-msg" + (ok ? " ok" : "");
  }

  function loadPanelScripts() {
    var files = [
      "scripts/shared/a2m9kx.js",
      "scripts/shared/p5v0lc.js",
      "scripts/shared/j6y4bn.js",
      "scripts/panel/h3s8dw.js",
      "scripts/panel/m1c7qf.js"
    ];
    var i = 0;
    function next() {
      if (i >= files.length) return;
      var s = document.createElement("script");
      s.src = files[i++];
      s.onload = next;
      s.onerror = next;
      document.body.appendChild(s);
    }
    next();
  }

  function showPanel() {
    if (gateBody) gateBody.style.display = "none";
    if (panelBody) panelBody.style.display = "";
    if (footer) footer.style.display = "";
    loadPanelScripts();
  }

  function activate() {
    var name = (nameEl && nameEl.value) || "";
    var key = String((keyEl && keyEl.value) || "")
      .trim()
      .toUpperCase();
    if (!String(name).trim()) {
      setMsg("Please enter your name");
      return;
    }
    if (!/^TRIVIS-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(key)) {
      setMsg("Key format: TRIVIS-XXXX-XXXX");
      return;
    }
    setMsg("Validating…", true);
    if (btn) btn.disabled = true;
    chrome.runtime.sendMessage(
      { type: "TRIVIS_VALIDATE", key: key, name: String(name).trim() },
      function (res) {
        if (btn) btn.disabled = false;
        if (chrome.runtime.lastError) {
          setMsg("Extension error — reload extension");
          return;
        }
        if (res && res.ok) {
          setMsg("Activated successfully", true);
          setTimeout(showPanel, 400);
        } else {
          setMsg((res && res.error) || "Invalid license key");
        }
      }
    );
  }

  if (btn) btn.addEventListener("click", activate);
  if (keyEl) {
    keyEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") activate();
    });
  }

  // Already licensed?
  chrome.runtime.sendMessage({ type: "TRIVIS_STATUS" }, function (res) {
    if (chrome.runtime.lastError) return;
    if (res && res.ok) showPanel();
  });
})();
