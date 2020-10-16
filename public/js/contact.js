var offlineNotification = document.getElementById('offline');
let messagesList = [];

// Show an offline notification if the user if offline
function showIndicator() {
  offlineNotification.innerHTML = 'You are currently offline.';
  offlineNotification.className = 'showOfflineNotification';
}

// Hide the offline notification when the user comes back online
function hideIndicator() {
  offlineNotification.className = 'hideOfflineNotification';
}

// Notify the user that the message is either queued or sent
function displayMessageNotification(notificationText){
  var messageNotification = document.getElementById('message');
  messageNotification.innerHTML = notificationText;
  messageNotification.className = 'showMessageNotification';

  setTimeout(() => {
    messageNotification.innerHTML = '';
    messageNotification.className = '';
  },2000)
}

// Get all message
function getPosts(){
  console.log('get message');

  // Send the POST request to the server
  return fetch('/posts', {
    method: 'get',
    headers: new Headers({
      'content-type': 'application/json'
    })
  }).then(response => response.json()).then(data => {
    console.log(data)
    messagesList = messagesList.concat(data)
    console.log(messagesList)
    renderListData(data)
    
  });
}

// Send the actual message
function sendPost(){
  console.log('sendPost');

  var payload = {
    title: document.getElementById('name').value,
    description: document.getElementById('messagetext').value,
  };
  messagesList.push(payload)
  renderListData(messagesList)
  return fetch('/sendPost', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify(payload)
  }).then(() => getPosts());
}

function renderListData(data) {
  const messageListContainer = document.querySelector('.message-list');
  let renderList = `<ul>`
  data.forEach(item => {
    if(!item.title) return
    renderList += `<li><h3>${item.title}</h3><p>${item.description}</p></li>`
  })
  renderList += '</ul>'
  if(messageListContainer) messageListContainer.innerHTML = renderList
}

// Queue the message till the sync takes place
function queueMessage(){
  console.log('Message queued');

  var payload = {
    title: document.getElementById('name').value,
    description: document.getElementById('messagetext').value,
  };
  console.log('messagesList',messagesList)
  // Save to indexdb
  idbKeyval.set('sendPost', messagesList);
}

// Update the online status icon based on connectivity
window.addEventListener('online',  hideIndicator);
window.addEventListener('offline', showIndicator);

getPosts()
