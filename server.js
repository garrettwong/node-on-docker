'use strict';

// express 4.0
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.set('view engine', 'pug');
app.use(express.static('public')); // images,css,etc.

function getRandomId() {
  let randomDouble = (Math.random() * 3) + 2; // generate between [2,4] inclusive
  return Math.floor(randomDouble);
}

app.get('/', (req, res) => {
  let id = getRandomId();
  res.render('index', {
    title: `Hi Q${id}`
  });
});

app.get('/home', function (req, res) {
  res.send('GET home');
});

app.post('/home', function (req, res) {
  res.send('POST home');
});

app.get('/q', function (req, res) {
  var id = // get random
    getRandomId();
  res.send(`Hello Q${id}`);
});

app.get('/q/:id', function (req, res) {
  var id = req.params.id;
  res.send(`Hello Q${id}`);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);