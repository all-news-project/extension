// popup.js
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('getDataButton').addEventListener('click', getData);
  document.getElementById('postDataButton').addEventListener('click', postData);

  async function getData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      console.log(data);
      document.getElementById('responseContainer').textContent = JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function postData() {
    const requestData = {
      key: 'value'
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const data = await response.json();
      console.log(data);
      document.getElementById('responseContainer').textContent = JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }
  }
});