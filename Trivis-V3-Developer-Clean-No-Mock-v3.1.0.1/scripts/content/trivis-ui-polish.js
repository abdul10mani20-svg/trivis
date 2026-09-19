/**
 * Trivis Dev — AMOLED Chatbox Neon Engine & Top-Right Tag
 * High Performance Edition: Zero-lag caching, no input-event layout thrashing, debounced RAF positioning.
 */
(function () {
  "use strict";
  if (window.__trivisUiPolishV3__) return;
  window.__trivisUiPolishV3__ = true;

  if (!/(?:lovable\.dev|lovable\.app)/i.test(location.hostname || "")) return;

  var STYLE_ID = "trivis-amoled-chat-style";
  var OVERLAY_ID = "trivis-chat-amoled-root";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = `
      @keyframes trivisAmoledGlow {
        0% {
          border-color: rgba(255, 30, 56, 0.85);
          box-shadow:
            0 0 0 1.5px rgba(255, 30, 56, 0.85),
            0 0 18px rgba(255, 30, 56, 0.65),
            0 0 38px rgba(225, 29, 72, 0.4),
            0 0 65px rgba(255, 30, 56, 0.2),
            inset 0 0 14px rgba(255, 30, 56, 0.1);
        }
        50% {
          border-color: rgba(255, 80, 105, 1);
          box-shadow:
            0 0 0 2px rgba(255, 80, 105, 0.95),
            0 0 26px rgba(255, 30, 56, 0.85),
            0 0 52px rgba(225, 29, 72, 0.55),
            0 0 85px rgba(255, 30, 56, 0.32),
            inset 0 0 18px rgba(255, 30, 56, 0.16);
        }
        100% {
          border-color: rgba(255, 30, 56, 0.85);
          box-shadow:
            0 0 0 1.5px rgba(255, 30, 56, 0.85),
            0 0 18px rgba(255, 30, 56, 0.65),
            0 0 38px rgba(225, 29, 72, 0.4),
            0 0 65px rgba(255, 30, 56, 0.2),
            inset 0 0 14px rgba(255, 30, 56, 0.1);
        }
      }

      @keyframes trivisRadarPing {
        0% { transform: scale(0.85); opacity: 1; }
        75%, 100% { transform: scale(2.4); opacity: 0; }
      }

      #trivis-chat-amoled-root {
        position: fixed !important;
        pointer-events: none !important;
        z-index: 999999 !important;
        box-sizing: border-box !important;
        transition: opacity 0.25s ease !important;
        display: none;
      }

      #trivis-chat-amoled-border {
        position: absolute !important;
        inset: -1.5px !important;
        border-radius: inherit !important;
        border: 1.5px solid #ff1e38 !important;
        pointer-events: none !important;
        animation: trivisAmoledGlow 3.5s ease-in-out infinite !important;
        box-sizing: border-box !important;
      }

      #trivis-chat-amoled-tag {
        position: absolute !important;
        top: -12px !important;
        right: 22px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 3px 11px 3px 9px !important;
        border-radius: 999px !important;
        background: linear-gradient(135deg, #070204 0%, #1a040b 100%) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border: 1px solid rgba(255, 35, 65, 0.85) !important;
        box-shadow:
          0 0 16px rgba(255, 30, 56, 0.6),
          0 4px 14px rgba(0, 0, 0, 0.95) !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-size: 10.5px !important;
        font-weight: 800 !important;
        letter-spacing: 0.1em !important;
        text-transform: uppercase !important;
        pointer-events: none !important;
        user-select: none !important;
        white-space: nowrap !important;
        line-height: 1.4 !important;
      }

      .trivis-tag-radar {
        position: relative !important;
        width: 7px !important;
        height: 7px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      .trivis-tag-radar-core {
        width: 6px !important;
        height: 6px !important;
        border-radius: 50% !important;
        background: #ff1e38 !important;
        box-shadow: 0 0 8px #ff1e38 !important;
        display: block !important;
      }

      .trivis-tag-radar-wave {
        position: absolute !important;
        inset: -2px !important;
        border-radius: 50% !important;
        border: 1px solid #ff1e38 !important;
        animation: trivisRadarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite !important;
        display: block !important;
      }

      .trivis-tag-text {
        background: linear-gradient(120deg, #ffffff 0%, #ff8595 50%, #df806c 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        font-weight: 800 !important;
        display: inline-block !important;
      }

      [data-trivis-composer-wrap="1"] {
        border-color: rgba(255, 35, 65, 0.75) !important;
        transition: border-color 0.2s ease !important;
      }
    `;
    (document.head || document.documentElement).appendChild(st);
  }

  function getOrCreateOverlay() {
    var el = document.getElementById(OVERLAY_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = OVERLAY_ID;
      el.innerHTML = `
        <div id="trivis-chat-amoled-border"></div>
        <div id="trivis-chat-amoled-tag">
          <span class="trivis-tag-radar">
            <span class="trivis-tag-radar-core"></span>
            <span class="trivis-tag-radar-wave"></span>
          </span>
          <span class="trivis-tag-text">Trivis Dev</span>
        </div>
      `;
      (document.body || document.documentElement).appendChild(el);
    }
    return el;
  }

  var cachedInput = null;
  var cachedContainer = null;
  var activeTargetContainer = null;
  var resizeObs = null;

  function findLovableInput() {
    if (cachedInput && cachedInput.isConnected) return cachedInput;

    // Priority 1: Textarea elements
    var textareas = document.querySelectorAll("textarea");
    var candidate = null;
    var maxScore = -1;
    for (var i = 0; i < textareas.length; i++) {
      var ta = textareas[i];
      if (ta.closest && ta.closest("#trivis-vx-root")) continue;
      var r = ta.getBoundingClientRect();
      if (r.width < 80 || r.height < 16) continue;
      if (r.bottom <= 0 || r.top >= window.innerHeight) continue;
      var ph = (ta.placeholder || "") + " " + (ta.getAttribute("aria-label") || "");
      var score = r.width * 2 + (/ask|build|lovable|landing|message|prompt/i.test(ph) ? 1000 : 0);
      if (score > maxScore) {
        maxScore = score;
        candidate = ta;
      }
    }
    if (candidate) {
      cachedInput = candidate;
      return candidate;
    }

    // Priority 2: Contenteditable / role="textbox"
    var editables = document.querySelectorAll('[contenteditable="true"], [role="textbox"]');
    for (var j = 0; j < editables.length; j++) {
      var ed = editables[j];
      if (ed.closest && ed.closest("#trivis-vx-root")) continue;
      var er = ed.getBoundingClientRect();
      if (er.width > 80 && er.height > 16 && er.bottom > 0 && er.top < window.innerHeight) {
        cachedInput = ed;
        return ed;
      }
    }

    // Priority 3: Text inputs
    var inputs = document.querySelectorAll("input[type='text'], input:not([type])");
    for (var k = 0; k < inputs.length; k++) {
      var inp = inputs[k];
      if (inp.closest && inp.closest("#trivis-vx-root")) continue;
      var iph = (inp.placeholder || "") + " " + (inp.getAttribute("aria-label") || "");
      if (/ask|build|lovable|landing|message|prompt|create/i.test(iph)) {
        var ir = inp.getBoundingClientRect();
        if (ir.width > 120 && ir.height > 16 && ir.bottom > 0 && ir.top < window.innerHeight) {
          cachedInput = inp;
          return inp;
        }
      }
    }

    return null;
  }

  function findLovableContainer(inputEl) {
    if (!inputEl) return null;
    if (cachedContainer && cachedContainer.isConnected && inputEl === cachedInput) {
      return cachedContainer;
    }

    var form = inputEl.closest("form");
    if (form) {
      var fr = form.getBoundingClientRect();
      if (fr.width >= 180 && fr.height >= 38) {
        cachedContainer = form;
        return form;
      }
    }

    var curr = inputEl.parentElement;
    var best = curr;
    for (var i = 0; i < 6 && curr && curr !== document.body && curr !== document.documentElement; i++) {
      var r = curr.getBoundingClientRect();
      if (r.width > window.innerWidth * 0.96 && window.innerWidth > 600) {
        break;
      }
      if (r.height >= 40 && r.width >= 180) {
        var hasButtons = curr.querySelector("button, [role='button'], svg");
        if (hasButtons) {
          best = curr;
          var p = curr.parentElement;
          if (p && p !== document.body && p !== document.documentElement) {
            var pr = p.getBoundingClientRect();
            if (Math.abs(pr.width - r.width) <= 10 && Math.abs(pr.height - r.height) <= 10) {
              best = p;
            }
          }
          break;
        }
        best = curr;
      }
      curr = curr.parentElement;
    }
    cachedContainer = best || inputEl.parentElement;
    return cachedContainer;
  }

  function syncPosition() {
    var overlay = getOrCreateOverlay();
    var input = findLovableInput();
    if (!input) {
      overlay.style.display = "none";
      return;
    }

    var container = findLovableContainer(input);
    if (!container) {
      overlay.style.display = "none";
      return;
    }

    var r = container.getBoundingClientRect();
    if (r.width < 80 || r.height < 25 || r.bottom <= 0 || r.top >= window.innerHeight) {
      overlay.style.display = "none";
      return;
    }

    if (!container.hasAttribute("data-trivis-composer-wrap")) {
      container.setAttribute("data-trivis-composer-wrap", "1");
    }

    if (activeTargetContainer !== container) {
      if (resizeObs && activeTargetContainer) {
        try { resizeObs.unobserve(activeTargetContainer); } catch (_) {}
      }
      activeTargetContainer = container;
      if (window.ResizeObserver) {
        if (!resizeObs) {
          resizeObs = new ResizeObserver(function () {
            requestSync();
          });
        }
        try { resizeObs.observe(container); } catch (_) {}
      }
    }

    var cs = window.getComputedStyle(container);
    var br = cs.borderRadius || "24px";
    if (br === "0px" || br === "none") {
      br = "24px";
    }

    overlay.style.display = "block";
    overlay.style.top = r.top + "px";
    overlay.style.left = r.left + "px";
    overlay.style.width = r.width + "px";
    overlay.style.height = r.height + "px";
    overlay.style.borderRadius = br;
  }

  var syncDebounce = null;
  function requestSync() {
    if (syncDebounce) return;
    syncDebounce = setTimeout(function () {
      syncDebounce = null;
      requestAnimationFrame(syncPosition);
    }, 120);
  }

  injectStyles();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", requestSync);
  } else {
    requestSync();
  }

  // Throttled listeners (NO input listener, zero typing lag)
  window.addEventListener("scroll", requestSync, { passive: true, capture: true });
  window.addEventListener("resize", requestSync, { passive: true });

  // Update on focus into composer
  document.addEventListener("focusin", function (e) {
    if (e.target && (e.target.tagName === "TEXTAREA" || e.target.isContentEditable)) {
      requestSync();
    }
  }, { passive: true });

  // Passive health-check interval to re-hook on route transition
  setInterval(function () {
    if (!cachedContainer || !cachedContainer.isConnected) {
      cachedInput = null;
      cachedContainer = null;
      requestSync();
    }
  }, 3500);
})();
