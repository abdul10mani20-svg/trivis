/**
 * Trivis license gate — High-Performance TRIVIS DEV Cyber-Terminal
 * Zero lag: removed all heavy background animations/rotations.
 * Features Iconsax vector icons & silky-smooth shiny button animation.
 */
(function () {
  if (window.__TRIVIS_V8_GATE__) return;
  window.__TRIVIS_V8_GATE__ = true;

  function status(cb) {
    try {
      chrome.runtime.sendMessage({ type: "TRIVIS_STATUS" }, function (r) {
        if (chrome.runtime.lastError) {
          chrome.storage.local.get(["trivis_lic_ok", "trivis_license_key", "trivis_lic_expires"], function (s) {
            var ok = !!(s && (s.trivis_lic_ok === true || s.trivis_lic_ok === "1") && s.trivis_license_key);
            if (ok && s.trivis_lic_expires) {
              var t = Date.parse(s.trivis_lic_expires);
              if (t && Date.now() > t) ok = false;
            }
            cb(ok);
          });
          return;
        }
        cb(!!(r && r.ok));
      });
    } catch (_) {
      cb(false);
    }
  }

  function removeGate() {
    var g = document.getElementById("trivis-pro-gate");
    if (!g) return;
    g.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    g.style.opacity = "0";
    g.style.transform = "scale(0.98)";
    setTimeout(function () {
      if (g && g.parentNode) g.remove();
    }, 260);
  }

  function showGate() {
    if (document.getElementById("trivis-pro-gate")) return;
    var root = document.createElement("div");
    root.id = "trivis-pro-gate";
    root.innerHTML =
      "<style>" +
      "@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');" +
      "#trivis-pro-gate{position:fixed!important;inset:0!important;z-index:2147483647!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;-webkit-tap-highlight-color:transparent!important;font-family:'JetBrains Mono',ui-monospace,monospace!important;background:#050204!important;color:#f3e8ea!important;}" +
      "#trivis-pro-gate *{box-sizing:border-box!important;outline:none!important;margin:0;padding:0;}" +
      /* Clean, lightweight static background with zero repaint lag */
      "#trivis-pro-gate:before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 30%,rgba(230,25,50,.14) 0%,rgba(10,2,5,.95) 70%,#030103 100%),linear-gradient(rgba(255,30,60,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,30,60,.025) 1px,transparent 1px);background-size:100% 100%,48px 48px,48px 48px;z-index:0;}" +
      /* Clean card with lightweight styling */
      "#trivis-pro-gate .wrap{position:relative!important;z-index:10!important;width:min(480px,92vw)!important;padding:36px 32px 30px!important;border-radius:24px!important;background:#0d0307!important;border:1px solid rgba(255,40,70,.28)!important;box-shadow:0 0 50px rgba(220,15,45,.18),0 24px 60px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.1)!important;text-align:center!important;}" +
      /* Corner brackets */
      "#trivis-pro-gate .corner{position:absolute;width:12px;height:12px;border-color:rgba(255,50,80,.6);border-style:solid;pointer-events:none;}" +
      "#trivis-pro-gate .corner.tl{top:7px;left:7px;border-width:2px 0 0 2px;border-top-left-radius:5px;}" +
      "#trivis-pro-gate .corner.tr{top:7px;right:7px;border-width:2px 2px 0 0;border-top-right-radius:5px;}" +
      "#trivis-pro-gate .corner.bl{bottom:7px;left:7px;border-width:0 0 2px 2px;border-bottom-left-radius:5px;}" +
      "#trivis-pro-gate .corner.br{bottom:7px;right:7px;border-width:0 2px 2px 0;border-bottom-right-radius:5px;}" +
      /* High-performance Avatar Badge (Clean, sharp, no lagging rotation) */
      "#trivis-pro-gate .avatar-container{position:relative!important;width:96px!important;height:96px!important;margin:0 auto 18px!important;display:flex!important;align-items:center!important;justify-content:center!important;}" +
      "#trivis-pro-gate .avatar-badge{position:relative!important;width:92px!important;height:92px!important;border-radius:50%!important;overflow:hidden!important;border:2px solid #ff1e38!important;box-shadow:0 0 22px rgba(255,30,56,.45),0 8px 18px rgba(0,0,0,.6)!important;background:#140508!important;}" +
      "#trivis-pro-gate .avatar-badge img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;}" +
      /* Status Chip */
      "#trivis-pro-gate .status-pill{display:inline-flex!important;align-items:center!important;gap:7px!important;padding:4px 12px!important;border-radius:999px!important;background:rgba(255,30,60,.1)!important;border:1px solid rgba(255,40,70,.3)!important;font-size:10px!important;font-weight:700!important;letter-spacing:.14em!important;color:#ff8595!important;text-transform:uppercase!important;margin-bottom:10px!important;}" +
      "#trivis-pro-gate .status-dot{width:6px!important;height:6px!important;border-radius:50%!important;background:#ff1e38!important;box-shadow:0 0 8px #ff1e38!important;}" +
      /* Header & Subtitle */
      "#trivis-pro-gate .gate-title{font-family:'Orbitron',sans-serif!important;font-size:32px!important;font-weight:900!important;letter-spacing:.14em!important;text-transform:uppercase!important;line-height:1.1!important;margin-bottom:6px!important;background:linear-gradient(135deg,#ffffff 20%,#ffa4b0 60%,#ff1e38 100%)!important;-webkit-background-clip:text!important;-webkit-text-fill-color:transparent!important;filter:drop-shadow(0 0 16px rgba(255,30,60,.4))!important;}" +
      "#trivis-pro-gate .gate-sub{font-size:10px!important;font-weight:600!important;letter-spacing:.28em!important;color:#df806c!important;text-transform:uppercase!important;margin-bottom:24px!important;}" +
      /* Console Input Bracket */
      "#trivis-pro-gate .field{position:relative!important;display:flex!important;align-items:center!important;width:100%!important;height:54px!important;padding:0 8px 0 14px!important;border-radius:14px!important;background:rgba(8,2,4,.92)!important;border:1px solid rgba(255,40,70,.3)!important;box-shadow:inset 0 2px 4px rgba(0,0,0,.5),0 0 16px rgba(255,30,60,.08)!important;transition:border-color .18s ease,box-shadow .18s ease!important;}" +
      "#trivis-pro-gate .field:focus-within{border-color:#ff2442!important;box-shadow:0 0 20px rgba(255,36,66,.35)!important;}" +
      "#trivis-pro-gate .in-icon{display:flex!important;align-items:center!important;color:#ff334f!important;margin-right:10px!important;flex-shrink:0!important;}" +
      "#trivis-pro-gate input{flex:1!important;background:transparent!important;border:none!important;color:#ffffff!important;font-family:'JetBrains Mono',monospace!important;font-size:13.5px!important;font-weight:600!important;letter-spacing:.08em!important;height:100%!important;min-width:0!important;}" +
      "#trivis-pro-gate input::placeholder{color:rgba(255,180,195,.3)!important;}" +
      "#trivis-pro-gate .paste-btn{all:unset!important;display:grid!important;place-items:center!important;width:38px!important;height:38px!important;border-radius:10px!important;background:rgba(255,30,60,.12)!important;border:1px solid rgba(255,40,70,.28)!important;color:#ff8595!important;cursor:pointer!important;transition:background .15s ease,transform .15s ease!important;flex-shrink:0!important;}" +
      "#trivis-pro-gate .paste-btn:hover{background:rgba(255,30,60,.28)!important;color:#ffffff!important;transform:scale(1.04)!important;}" +
      "#trivis-pro-gate .paste-btn:active{transform:scale(.95)!important;}" +
      /* ── THE SHINY SMOOTH ANIMATE BUTTON (GPU Accelerated, Ultra Smooth 60fps) ── */
      "#trivis-pro-gate .action-btn{position:relative!important;width:100%!important;height:52px!important;margin-top:18px!important;border-radius:14px!important;border:none!important;cursor:pointer!important;overflow:hidden!important;background:linear-gradient(135deg,#e60026 0%,#ff1e38 50%,#b3001f 100%)!important;color:#ffffff!important;font-family:'Orbitron',sans-serif!important;font-size:12px!important;font-weight:800!important;letter-spacing:.15em!important;text-transform:uppercase!important;box-shadow:0 0 24px rgba(255,30,56,.4),0 8px 18px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.25)!important;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;will-change:transform;}" +
      "#trivis-pro-gate .action-btn:hover{transform:translateY(-1.5px)!important;filter:brightness(1.1)!important;box-shadow:0 0 32px rgba(255,30,56,.6),0 12px 24px rgba(0,0,0,.6)!important;}" +
      "#trivis-pro-gate .action-btn:active{transform:translateY(1px) scale(.99)!important;}" +
      "#trivis-pro-gate .action-btn:disabled{opacity:.7!important;cursor:wait!important;transform:none!important;}" +
      /* Silky Smooth Shiny Gloss Sweep (Only this animation) */
      "#trivis-pro-gate .action-btn:after{content:'';position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.05) 20%,rgba(255,255,255,.55) 50%,rgba(255,255,255,.05) 80%,transparent 100%);transform:rotate(25deg);animation:shinySweep 3.4s cubic-bezier(.4,0,.2,1) infinite;pointer-events:none;will-change:transform;}" +
      "@keyframes shinySweep{0%{transform:translateX(-150%) rotate(25deg);}35%,100%{transform:translateX(550%) rotate(25deg);}}" +
      "#trivis-pro-gate .btn-icon{display:flex!important;align-items:center!important;transition:transform .18s ease!important;}" +
      "#trivis-pro-gate .action-btn:hover .btn-icon{transform:translateX(4px)!important;}" +
      "#trivis-pro-gate .spin-loader{display:none;width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#ffffff;border-radius:50%;animation:quickSpin .6s linear infinite;}" +
      "@keyframes quickSpin{to{transform:rotate(360deg)}}" +
      "#trivis-pro-gate .action-btn.loading .spin-loader{display:block;}" +
      "#trivis-pro-gate .action-btn.loading .btn-icon{display:none;}" +
      /* Telemetry / Message Notification */
      "#trivis-pro-gate .msg{min-height:16px!important;margin-top:12px!important;font-size:10.5px!important;font-weight:700!important;letter-spacing:.12em!important;text-transform:uppercase!important;color:rgba(255,180,195,.4)!important;}" +
      "#trivis-pro-gate .msg.err{color:#ff334f!important;text-shadow:0 0 10px rgba(255,50,80,.6)!important;}" +
      "#trivis-pro-gate .msg.ok{color:#4ef08d!important;text-shadow:0 0 10px rgba(78,240,141,.6)!important;}" +
      /* Security Diagnostics Footer with Iconsax Shield */
      "#trivis-pro-gate .footer-hud{margin-top:24px!important;padding-top:16px!important;border-top:1px solid rgba(255,40,70,.12)!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;font-size:9.5px!important;font-weight:600!important;letter-spacing:.18em!important;color:rgba(255,160,175,.45)!important;text-transform:uppercase!important;}" +
      "#trivis-pro-gate .footer-icon{display:flex!important;align-items:center!important;color:#ff334f!important;}" +
      "@media(max-width:480px){" +
      "#trivis-pro-gate .wrap{padding:26px 18px 22px!important;width:92vw!important;border-radius:20px!important;}" +
      "#trivis-pro-gate .gate-title{font-size:26px!important;}" +
      "#trivis-pro-gate .avatar-badge{width:80px!important;height:80px!important;}" +
      "#trivis-pro-gate .avatar-container{width:84px!important;height:84px!important;margin-bottom:14px!important;}" +
      "}" +
      "</style>" +
      '<div class="wrap">' +
      '<div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>' +
      '<div class="avatar-container">' +
      '<div class="avatar-badge"><img alt="TRIVIS DEV" src="' +
      (function () {
        try { return chrome.runtime.getURL("assets/icon128.png"); } catch (_) { return ""; }
      })() +
      '" onerror="this.style.display=\'none\'"/></div>' +
      '</div>' +
      '<div class="status-pill"><span class="status-dot"></span> NEURAL GATEWAY v3.1</div>' +
      '<h1 class="gate-title">TRIVIS DEV</h1>' +
      '<p class="gate-sub">QUANTUM LOVABLE ACCELERATOR</p>' +
      '<div class="field">' +
      /* Iconsax Key Icon */
      '<span class="in-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.25 10.75C14.25 8.68 12.57 7 10.5 7C8.43 7 6.75 8.68 6.75 10.75C6.75 12.82 8.43 14.5 10.5 14.5C12.57 14.5 14.25 12.82 14.25 10.75Z"/><path d="M13.25 13.5L20.5 20.75M17.5 17.75L19 19.25M15.5 15.75L17 17.25"/></svg></span>' +
      '<input id="trivis-gate-key" placeholder="LXC-XXXXX-XXXXX-XXXXX-XXXXX" autocomplete="off" spellcheck="false"/>' +
      /* Iconsax Copy/Paste Icon */
      '<button type="button" class="paste-btn" id="trivis-gate-paste" title="Paste key from clipboard">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"/><path d="M17.1 2H12.9C9.5 2 8.1 3.3 8 6.5H11.1C15.3 6.5 17.5 8.7 17.5 12.9V16C20.7 15.9 22 14.5 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z"/></svg>' +
      '</button>' +
      '</div>' +
      '<button type="button" class="action-btn" id="trivis-gate-go">' +
      '<span class="spin-loader"></span>' +
      '<span class="btn-text">INITIALIZE ACCESS</span>' +
      /* Iconsax Arrow Right Icon */
      '<span class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.43 5.93L20.5 12L14.43 18.07"/><path d="M3.5 12H20.33"/></svg></span>' +
      '</button>' +
      '<div class="msg" id="trivis-gate-msg"></div>' +
      '<div class="footer-hud">' +
      /* Iconsax Security Shield Icon */
      '<span class="footer-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></span>' +
      '<span>AES-256 GCM ENCRYPTION • SECURED NEURAL LINK</span>' +
      '</div>' +
      '</div>';

    document.documentElement.appendChild(root);

    var input = root.querySelector("#trivis-gate-key");
    var btn = root.querySelector("#trivis-gate-go");
    var msg = root.querySelector("#trivis-gate-msg");
    var paste = root.querySelector("#trivis-gate-paste");

    paste.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(function (t) {
          if (t) {
            input.value = t.trim();
            msg.className = "msg";
            msg.textContent = "KEY PASTED FROM CLIPBOARD";
          }
        }).catch(function () {});
      }
    });

    function setLoading(on) {
      btn.disabled = !!on;
      btn.classList.toggle("loading", !!on);
      btn.querySelector(".btn-text").textContent = on ? "AUTHENTICATING..." : "INITIALIZE ACCESS";
    }

    function activate() {
      var key = (input.value || "").trim();
      if (!key) {
        msg.className = "msg err";
        msg.textContent = "LICENSE KEY REQUIRED";
        return;
      }
      setLoading(true);
      msg.className = "msg";
      msg.textContent = "VERIFYING CREDENTIALS…";
      try {
        chrome.runtime.sendMessage({ type: "TRIVIS_VALIDATE", key: key }, function (r) {
          setLoading(false);
          if (chrome.runtime.lastError) {
            msg.className = "msg err";
            msg.textContent = chrome.runtime.lastError.message || "NETWORK CONNECTION TIMEOUT";
            return;
          }
          if (r && r.ok) {
            msg.className = "msg ok";
            msg.textContent = "ACCESS GRANTED • INITIALIZING";
            setTimeout(removeGate, 350);
          } else {
            msg.className = "msg err";
            msg.textContent = (r && (r.error || r.message)) || "INVALID CREDENTIAL KEY";
          }
        });
      } catch (e) {
        setLoading(false);
        msg.className = "msg err";
        msg.textContent = "INTERNAL PROTOCOL ERROR";
      }
    }

    btn.addEventListener("click", activate);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") activate();
    });
  }

  function boot() {
    status(function (ok) {
      if (ok) removeGate();
      else showGate();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  try {
    chrome.storage.onChanged.addListener(function (changes, area) {
      if (area !== "local") return;
      if (changes.trivis_lic_ok || changes.trivis_license_key || changes.trivis_lic_expires) {
        status(function (ok) {
          if (ok) removeGate();
          else showGate();
        });
      }
    });
  } catch (_) {}
})();
