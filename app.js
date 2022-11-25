function getConnectionsAmount() {
  var connections = Array.prototype.map.call(
    document.querySelectorAll(
      "link, img, video, audio, script, iframe, source, embed"
    ),
    (HTMLtag) => {
      return HTMLtag.href || HTMLtag.src;
    }
  );

  return { amount: connections.length };
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.method) {
    case "localStorage":
      sendResponse({
        data: Object.entries(localStorage),
      });
      break;

    case "connections":
      sendResponse({
        data: getConnectionsAmount(),
      });
      break;

    default:
      sendResponse({
        data: null,
      });
  }
});
