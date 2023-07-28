const TITLE_CUT_INDEX = 25;

function setErrorMsg(error_msg) {
  document.getElementById("errorMsg").innerHTML = error_msg;
}

function delErrorMsg() {
  document.getElementById("errorMsg").innerHTML = "";
}

function displayActive() {
  var nonDisplayElements = document.getElementsByClassName("display_none_util_active");
  for (var i = 0; i < nonDisplayElements.length; i++) {
    nonDisplayElements.item(i).style.display = "block";
 }
}

function setTitle(title) {
  var cut_title = title.substring(0, TITLE_CUT_INDEX);
  var final_title = 'Read more about <b>"' + cut_title + '..."</b>';
  document.getElementById("title").innerHTML = final_title;
}

function setSuggestions(articles_data) {
  if (!articles_data) {
    setErrorMsg("Error showing news articles, Please try again...");
    return;
  }
  let articles_data_output = '<div>';
  articles_data_output += '<h2 class="sub_title">Suggestions:</h2>';
  for (const article_data of articles_data) {
    articles_data_output += '<span class="article_row">';
    articles_data_output += '<a class="box" href="' + article_data['url'] + '" target="_blank">';
    articles_data_output += article_data['title'].substring(0, TITLE_CUT_INDEX) + '...';
    articles_data_output += '</a>';
    articles_data_output += '<img class="icon" src="icons/' + article_data['domain'] + '.png">';
    articles_data_output += '</span>';
  }
  articles_data_output += '</div>';
  document.getElementById("articles").innerHTML = articles_data_output;
  console.warn("articles_data: ", articles_data);
}

function openUrl(url) {
  chrome.tabs.create({ url: newURL });
}

function makeRefereshRotate() {
  console.log("rotating");
  document.getElementById("refreshBtn").classList.add("rotating");
}

function makeRefereshNotRotate() {
  console.log("not rotating");
  document.getElementById("refreshBtn").classList.remove("rotating");
}