/* TRIVIS LOCAL DEVELOPER BUILD marker. Test-only; no production entitlement claim. */
(() => {
  if (window.__TRIVIS_DEV_MODE_MARKER__) return;
  window.__TRIVIS_DEV_MODE_MARKER__ = true;
  const mark = () => {
    if (document.getElementById("trivis-dev-mode-badge")) return;
    const el = document.createElement("div");
    el.id = "trivis-dev-mode-badge";
    el.textContent = "TRIVIS DEV MODE";
    Object.assign(el.style, {
      position: "fixed", top: "8px", right: "8px", zIndex: "2147483647",
      padding: "5px 9px", border: "1px solid #d97706", borderRadius: "7px",
      background: "#1f1305", color: "#fbbf24", font: "700 10px monospace",
      letterSpacing: ".08em", pointerEvents: "none", opacity: ".92"
    });
    (document.body || document.documentElement).appendChild(el);
  };
  if (document.body) mark(); else document.addEventListener("DOMContentLoaded", mark, { once: true });
})();
