function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}

async function showLocalStorage(tabs) {
  let tab = tabs.pop();

  const answer = await browser.tabs.sendMessage(tab.id, {
    method: "localStorage",
  });

  let documentLocalStorage = document.getElementById("local-storage-amount");
  let text = document.createTextNode(
    "Amount in local storage: " + answer.data.length
  );
  documentLocalStorage.appendChild(text);
}

getActiveTab().then(showLocalStorage);
