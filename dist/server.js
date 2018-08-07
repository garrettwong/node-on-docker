'use strict';

// express 4.0

var express = require('express');

var api = require('./server/api');

console.log(api);

// Constants
var PORT = 8080;
var HOST = '0.0.0.0';

// App
var app = express();
app.set('view engine', 'pug');
app.use(express.static('public')); // images,css,etc.


function getRandomId() {
  var randomDouble = Math.random() * 5 + 1; // generate between [1,5] inclusive
  var randomInt = Math.floor(randomDouble);

  return randomInt;
}
function getRandomName() {
  var randomId = getRandomId();
  if (randomId === 1) return 'Mommy';
  if (randomId === 5) return 'SeQi';else return 'Q' + randomId;
}

app.get('/', function (req, res) {
  var name = getRandomName();
  res.render('index', {
    title: 'Hi ' + name
  });
});

app.get('/home', function (req, res) {
  res.send('GET: ' + req.url);
});

app.post('/home', function (req, res) {
  res.send('POST: ' + req.url);
});

app.get('/q', function (req, res) {
  var name = getRandomName();
  res.send('Hello ' + name);
});

app.get('/q/:id', function (req, res) {
  var id = req.params.id;
  res.send('Hello Q' + id);
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
//# sourceMappingURL=server.js.map