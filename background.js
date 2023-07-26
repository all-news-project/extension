// Listener to handle notifications
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "showNotification") {
//     // Create notification
//     chrome.notifications.create({
//       type: "basic",
//       iconUrl: "icon.png",
//       title: "Notification Title",
//       message: "Notification message",
//     });
//   }
// });

// Define a function to be called when the tab is changed or a new tab is opened
function handleTabChange(tabId, changeInfo, tab) {
  keepCheckingURL();
}

chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.tabs.onCreated.addListener(handleTabChange);
