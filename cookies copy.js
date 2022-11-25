function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}

function showCookies(tabs) {
  //get the first tab object in the array
  let tab = tabs.pop();
  let firstParty = 0;
  let thirdParty = 0;
  let session = 0;
  let navigation = 0;

  let gettingAllCookies = browser.cookies.getAll({ url: tab.url });
  gettingAllCookies.then((cookies) => {
    let activeTabUrl = document.getElementById("header-title");
    let text = document.createTextNode("Cookies at: " + tab.title);
    activeTabUrl.appendChild(text);

    let cookieList = document.getElementById("cookie-list");

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(
          cookie.name + ": " + cookie.value
        );

        if (tab.url.includes(cookie.domain)) {
          firstParty++;
        } else {
          thirdParty++;
        }

        if (cookie.session != undefined) {
          session++;
        } else {
          navigation++;
        }

        li.appendChild(content);
        cookieList.appendChild(li);
      }

      let cookiesAmount = document.getElementById("cookies-amount");
      let cookiesText = document.createTextNode(
        "Amount of cookies: " + cookies.length
      );
      cookiesAmount.appendChild(cookiesText);

      let cookiesFParty = document.getElementById("cookies-f-party");
      let cookiesTextFParty = document.createTextNode(
        "Amount of first party cookies: " + firstParty
      );
      cookiesFParty.appendChild(cookiesTextFParty);

      let cookiesTParty = document.getElementById("cookies-t-party");
      let cookiesTextTParty = document.createTextNode(
        "Amount of third party cookies: " + thirdParty
      );
      cookiesTParty.appendChild(cookiesTextTParty);

      let cookiesSession = document.getElementById("cookies-session");
      let cookiesTextSession = document.createTextNode(
        "Amount of session cookies: " + session
      );
      cookiesSession.appendChild(cookiesTextSession);

      let cookiesNavigation = document.getElementById("cookies-navigation");
      let cookiesTextNavigation = document.createTextNode(
        "Amount of navigation cookies: " + navigation
      );
      cookiesNavigation.appendChild(cookiesTextNavigation);
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies available");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
}

getActiveTab().then(showCookies);
