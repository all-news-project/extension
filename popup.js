// popup.js
document.addEventListener("DOMContentLoaded", function () {
  let current_url;

  document
    .getElementById("getDataButton")
    .addEventListener("click", checkDomain);

  function checkDomain() {
    getCurrentTabUrl(handleUrl);
    document.getElementById("responseContainer").textContent = "URL: " + current_url;
  }

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

  // Example usage
  function handleUrl(url) {
    if (url) {
      current_url = url;
    } else {
      // todo: don't assign, just console
      current_url = "Received an undefined URL.";
    }
  }
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
