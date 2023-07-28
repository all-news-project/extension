document.addEventListener("DOMContentLoaded", function () {
  let current_url;
  const domains = ["bbc", "time", "nbc"];

  document.getElementById("refreshBtn").addEventListener("click", checkURL);

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

        // Check if current website is in valid domain (news website)
        if (isValidDomain(current_url)) {
          // Call the function
          getDataAndProcess();
          getData()
            .then((data) => {
              // handle the data in the UI
              handleDataWithUI(data);
            })
            .catch((error) => {
              console.error(error);
            });

          // The current url is not news website
        } else {
          setErrorMsg("Current website is not valid domain");
        }
      }
    }, 200);
  }

  function handleDataWithUI(data) {
    if (data["succeeded"]) {
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

  // Return true if the current url is valid domain from `domains`
  function isValidDomain(url) {
    if (url) {
      console.log("url: ", url);
      let domain = "";
      if (url.includes("www.")) {
        domain = url.split(".")[1];
      } else {
        domain = url.split("//")[1].split(".")[0];
      }
      console.log("domain: ", domain);
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
        "http://127.0.0.1:5000/get_similar_articles?url=" + current_url
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
});
