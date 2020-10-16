const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Express setup
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let posts = [
  {
    "id": 1,
    "title": "Nose picking ban for Manila police",
    "description": "A new directive tells police in Manila not to pick their noses whilst on duty"
  },
  {
    "id": 2,
    "title": "Australian police find gun in biker's bottom",
    "description": "Police in Australia find a loaded hangun wedged in the behind of a gang linked motorcyclist"
  },
  {
    "id": 3,
    "title": "Town's giant dog dropping goes missing",
    "description": "Local police on the trail of a missing inflatable dog mess"
  },
  {
    "id": 4,
    "title": "Austrian man wins right to be called Zebra",
    "description": "An Austrian man has won a court case enabling him to change his family name back to 'Zebra'"
  }
]


// Home page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Article page
app.get('/articles', function (req, res) {
  res.sendFile(path.join(__dirname + '/article.html'));
});

app.get('/article/:id', function (req, res) {
  console.log('req.params.id',req.params.id)
  res.json(posts.find(post => +post.id === +req.params.id));
});

// Article page
app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname + '/contact.html'));
});

// Offline page
app.get('/offline', function (req, res) {
  res.sendFile(path.join(__dirname + '/offline-page.html'));
});

// Send a post
app.post('/sendPost', function (req, res) {
  console.log(req.body)
  posts = req.body
  res.json(`Post has title ${req.body.title}`);
});

// Get all post
app.get('/posts', function (req, res) {
  res.json(posts);
});

// The server
app.listen(process.env.PORT || 3111, function () {
  console.log('Web app is listening')
});
