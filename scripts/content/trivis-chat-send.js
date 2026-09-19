/**
 * Trivis chat send — attach txt, wait until ready, single auto-send click.
 * No full-screen animation.
 */
(function () {
  "use strict";
  if (window.__trivisChatSendV31__ || window.__zokysChatSendV31__) return;
  window.__trivisChatSendV31__ = true;
  window.__zokysChatSendV31__ = true;
  if (!/lovable\.dev/i.test(location.hostname || "")) return;

  var SHORT = "Read txt file and complete task";
  var extraFiles = [];

  function findComposer() {
    var sels = [
      'textarea[placeholder*="Ask" i]',
      'textarea[placeholder*="Build" i]',
      'textarea[placeholder*="Message" i]',
      'textarea[placeholder*="Lovable" i]',
      "form textarea",
      '[contenteditable="true"]'
    ];
    for (var i = 0; i < sels.length; i++) {
      var nodes = document.querySelectorAll(sels[i]);
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (n.closest && n.closest("#trivis-vx-root")) continue;
        var r = n.getBoundingClientRect();
        if (r.width > 80 && r.height > 16) return n;
      }
    }
    return null;
  }

  function setComposerText(el, text) {
    if (!el) return;
    try { el.focus(); } catch (_) {}
    if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
      try {
        var desc =
          Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value") ||
          Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value");
        if (desc && desc.set) desc.set.call(el, text);
        else el.value = text;
      } catch (_) {
        el.value = text;
      }
      try {
        if (el._valueTracker) el._valueTracker.setValue("");
      } catch (_) {}
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      try {
        document.execCommand("selectAll", false, null);
        document.execCommand("insertText", false, text);
      } catch (_) {
        el.textContent = text;
        el.dispatchEvent(new InputEvent("input", { bubbles: true, data: text, inputType: "insertText" }));
      }
    }
  }

  function findFileInput() {
    var inputs = document.querySelectorAll('input[type="file"]');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].closest && inputs[i].closest("#trivis-vx-root")) continue;
      return inputs[i];
    }
    return null;
  }

  function isSendEnabled(btn) {
    if (!btn) return false;
    if (btn.disabled) return false;
    if (btn.getAttribute("aria-disabled") === "true") return false;
    var r = btn.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function findSendButton(composer) {
    var root = (composer && composer.closest("form")) || (composer && composer.parentElement) || document;
    var btns = root.querySelectorAll("button");
    var i, b, t, al;
    for (i = 0; i < btns.length; i++) {
      b = btns[i];
      if (b.closest && b.closest("#trivis-vx-root")) continue;
      al = (b.getAttribute("aria-label") || "").toLowerCase();
      t = (b.textContent || "").trim().toLowerCase();
      if (al.indexOf("send") !== -1 || t === "send") return b;
    }
    // circular send near composer (arrow up)
    btns = document.querySelectorAll("button");
    for (i = 0; i < btns.length; i++) {
      b = btns[i];
      if (b.closest && b.closest("#trivis-vx-root")) continue;
      al = (b.getAttribute("aria-label") || "").toLowerCase();
      if (al.indexOf("send") !== -1) return b;
      var r = b.getBoundingClientRect();
      if (!composer) continue;
      var cr = composer.getBoundingClientRect();
      if (r.width >= 28 && r.width <= 48 && r.height >= 28 && r.height <= 48) {
        if (Math.abs(r.bottom - cr.bottom) < 80 && r.left > cr.left) return b;
      }
    }
    return null;
  }

  function attachFiles(files) {
    try {
      var input = findFileInput();
      var dt = new DataTransfer();
      for (var i = 0; i < files.length; i++) dt.items.add(files[i]);
      if (input) {
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
        input.dispatchEvent(new Event("input", { bubbles: true }));
        return true;
      }
      var composer = findComposer();
      var target = (composer && (composer.closest("form") || composer.parentElement)) || document.body;
      ["dragenter", "dragover", "drop"].forEach(function (type) {
        try {
          target.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));
        } catch (_) {}
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  function fileChipVisible() {
    var nodes = document.querySelectorAll("button, div, span, a");
    for (var i = 0; i < Math.min(nodes.length, 300); i++) {
      var el = nodes[i];
      if (el.closest && el.closest("#trivis-vx-root")) continue;
      var t = (el.textContent || "").trim();
      if (/trivis-task\.txt/i.test(t) || (/\.txt/i.test(t) && t.length < 40)) {
        var r = el.getBoundingClientRect();
        if (r.width > 0 && r.bottom > window.innerHeight * 0.4) return true;
      }
    }
    return false;
  }

  function sleep(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }

  async function waitForSendReady(composer, timeoutMs) {
    var start = Date.now();
    var clicked = false;
    while (Date.now() - start < timeoutMs) {
      var btn = findSendButton(composer);
      if (btn && isSendEnabled(btn)) {
        // prefer waiting a beat after file chip if possible
        if (fileChipVisible() || Date.now() - start > 900) {
          if (!clicked) {
            try {
              btn.click();
              clicked = true;
              return true;
            } catch (_) {}
          }
        }
      }
      await sleep(200);
    }
    // last attempt once
    if (!clicked) {
      var b2 = findSendButton(composer);
      if (b2) {
        try {
          b2.click();
          return true;
        } catch (_) {}
      }
    }
    return clicked;
  }

  window.__trivisAttachExtraFiles = window.__zokysAttachExtraFiles = function (fileList) {
    extraFiles = [];
    if (!fileList) return;
    for (var i = 0; i < fileList.length; i++) extraFiles.push(fileList[i]);
  };

  window.__trivisClickStop = window.__zokysClickStop = function () {
    var btns = document.querySelectorAll("button");
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      if (b.closest && b.closest("#trivis-vx-root")) continue;
      var t = ((b.getAttribute("aria-label") || "") + " " + (b.textContent || "")).toLowerCase();
      if (/stop|cancel|abort/i.test(t) && t.length < 40) {
        try {
          b.click();
          return true;
        } catch (_) {}
      }
    }
    return false;
  };

  window.__trivisSetLovableMode = window.__zokysSetLovableMode = function (mode) {
    var want = mode === "plan" ? /^plan$/i : /^build$/i;
    var nodes = document.querySelectorAll("button, [role='menuitem'], [role='option']");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && el.closest("#trivis-vx-root")) continue;
      var t = (el.textContent || "").trim();
      if (want.test(t)) {
        try {
          el.click();
          return true;
        } catch (_) {}
      }
    }
    return false;
  };

  window.__trivisChatSendTxt = window.__zokysChatSendTxt = async function (userText, opts) {
    opts = opts || {};
    if (!userText || !String(userText).trim()) return false;
    if (!/\/projects\//i.test(location.pathname || "")) return false;

    var mode = opts.mode || "build";
    var body = String(userText);
    if (mode === "plan") {
      body = "[PLAN MODE — discuss and plan only, do not implement code yet]\n\n" + body;
    } else {
      body = "[BUILD MODE — implement changes in the project]\n\n" + body;
    }

    var taskFile = new File([body], "trivis-task.txt", { type: "text/plain" });
    var files = [taskFile].concat(extraFiles || []);
    extraFiles = [];

    attachFiles(files);
    await sleep(600);

    var composer = findComposer();
    if (!composer) return false;

    setComposerText(composer, SHORT);
    await sleep(400);

    if (opts.autoSend === false) return true;

    // Wait until Lovable send is actually available, then one click
    var ok = await waitForSendReady(composer, 12000);
    return !!ok;
  };
})();
