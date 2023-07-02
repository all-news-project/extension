document.addEventListener("DOMContentLoaded", function () {
  let current_url;
  const domains = ["bbc", "time", "nbc"];

  document.getElementById("getDataButton").addEventListener("click", checkURL);

  // Main function for checking the current url and call API if needed
  async function checkURL() {
    keepCheckingURL();
    chrome.runtime.sendMessage({ action: "showNotification" });
  }

  async function keepCheckingURL() {
    var counter = 0;
    var i = setInterval(function () {
      getCurrentTabUrl(handleUrl);

      counter++;
      if (current_url != undefined) {
        clearInterval(i);
        document.getElementById("responseContainer").textContent =
          "URL: " + current_url;
      }
    }, 200);
  }

  // Return true if the current url is valid domain from `domains`
  function isValidDomain() {
    if (url) {
      let domain = url.split(".")[1];
      return domains.includes(domain);
    } else {
      return false;
    }
  }

  // Getting the current tab url
  async function getCurrentTabUrl(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs[0]) {
        var currentTab = tabs[0];
        var url = currentTab.url;
        callback(url);
      } else {
        console.error("Unable to retrieve the URL of the current tab.");
      }
    });
  }

  async function handleUrl(url) {
    if (url) {
      current_url = url;
    } else {
      console.error("Received an undefined URL.");
    }
  }

  // Use the server api to check for similar articles
  async function getData() {
    try {
      const response = await fetch(
        "https://all-news-project.github.io/example-api-data/get_similar_articles01.json"
      );
      const data = await response.json();
      console.log(data);
      document.getElementById("responseContainer").textContent =
        JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }
  }
});
