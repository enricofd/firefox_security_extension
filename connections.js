function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}

async function showConnections(tabs) {
  let tab = tabs.pop();

  const answer = await browser.tabs.sendMessage(tab.id, {
    method: "connections",
  });

  let documentConnections = document.getElementById("connections-amount");
  let text = document.createTextNode(
    "Amount of connections to third party domains: " + answer.data.amount
  );
  documentConnections.appendChild(text);
}

getActiveTab().then(showConnections);
