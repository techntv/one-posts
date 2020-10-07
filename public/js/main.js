var offlineNotification = document.getElementById('offline');

function retrieveData(url) {
  fetch(url, {
    method: 'get',
    headers: new Headers({
      'content-type': 'application/json'
    })
  }).then(response => response.json()).then(data => {
    buildWebPage(data)
  });
}

// Get a value from the querystring
function findGetParameter(parameterName) {
  var result = null,
  tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

// Load the latest news data and populate content
function loadLatestNews(){
  var dataUrl = '/posts';
  retrieveData(dataUrl);
}

function buildWebPage(result) {
  console.log(result)
  var latestNews = '';

  for (var i = 0; i < result.length; i++) {
    
    var title = '<h2><a href="./articles?id=' + result[i].id + '">' + result[i].title + '</a></h2>';
    var description = '<p>' + result[i].description + '</p>'
    if(!result[i].title) {
      title = '';
      description = '';
    }
    latestNews += title + description;
  }

  document.getElementById('latest').innerHTML = latestNews;
}

// Show an offline notification if the user if offline
function showIndicator() {
  offlineNotification.innerHTML = 'You are currently offline.';
  offlineNotification.className = 'showOfflineNotification';
}

// Hide the offline notification when the user comes back online
function hideIndicator() {
  offlineNotification.className = 'hideOfflineNotification';
}

// Update the online status icon based on connectivity
window.addEventListener('online',  hideIndicator);
window.addEventListener('offline', showIndicator);

loadLatestNews();
