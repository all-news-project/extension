TITLE_CUT_INDEX=25;
document.addEventListener("DOMContentLoaded", function () {
  let current_url;
  const domains = ["bbc", "time", "nbc"];

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    getCurrentTabUrl();
    //alert(current_url);
    //alert("FUCK");
    //setErrorMsg("NOT WORKING");
    checkURL();
    //messageElement.textContent = "Extension icon clicked!";
  });

  // Main function for checking the current url and call API if needed
  async function checkURL() {
    console.log("entering checkURL function");
    makeRefreshRotate();
    keepCheckingURL();
    chrome.runtime.sendMessage({ action: "showNotification" });
  }

  async function keepCheckingURL() {
    var counter = 0;
    var i = setInterval(function () {
      console.log("trying to get url");
      getCurrentTabUrl(handleUrl);
      console.log("got url -",current_url);
      counter++;
      if (current_url != undefined) {
        clearInterval(i);
        getDataAndProcess();
        getData()
          .then((data) => {
            // handle the data in the UI
            handleDataWithUI(data);
            makeRefreshNotRotate();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 200);
  }

  function handleDataWithUI(data) {
    if (data["succeeded"]) {
      displayActive();
      delErrorMsg();
      setTitle(data["title"]);
      setSuggestions(data["articles_data"]);
    } else {
      console.warn(data["error_msg"]);
      setErrorMsg("Didn't find similar articles");
    }
  }

  // Wait for the data from the getData function (API) and return
  async function getDataAndProcess() {
    try {
      const data = await getData();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // Getting the current tab url
  async function getCurrentTabUrl(callback) {
    //callback(location.href);
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
        "https://all-news-api.onrender.com/get_similar_articles?url=" +
          current_url
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
});
