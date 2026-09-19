/**
 * Download Full Source — send txt task asking for zip download link.
 */
(function () {
  "use strict";
  if (window.__trivisDlSourceV3__ || window.__zokysDlSourceV3__) return;
  window.__trivisDlSourceV3__ = true;
  window.__zokysDlSourceV3__ = true;

  var PROMPT =
    "Create a complete downloadable ZIP of this entire project's source code (all files and folders).\n\n" +
    "Requirements:\n" +
    "1) Package the full project source (not a partial list).\n" +
    "2) Provide a direct download link OR generate a downloadable zip artifact I can download immediately.\n" +
    "3) Include frontend, config, public assets paths as they exist in the project.\n" +
    "4) Do not only describe the structure — actually produce the zip / downloadable link.\n" +
    "5) After the link or zip is ready, tell me clearly how to download it in one short line.";

  window.__trivisDownloadFullSource = window.__zokysDownloadFullSource = function () {
    var fn = window.__trivisChatSendTxt || window.__zokysChatSendTxt;
    if (typeof fn === "function") {
      fn(PROMPT, { mode: "build", autoSend: true, showLoader: true });
    }
  };
})();
