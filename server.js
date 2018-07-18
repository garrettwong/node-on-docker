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
  let randomDouble = (Math.random() * 5) + 1; // generate between [1,5] inclusive
  let randomInt = Math.floor(randomDouble);
  
  return randomInt;
}
function getRandomName() {
  let randomId = getRandomId();
  if (randomId === 1) return 'Mommy';
  if (randomId === 5) return 'SeQi';
  else return `Q${randomId}`;
}

app.get('/', (req, res) => {
  let name = getRandomName();
  res.render('index', {
    title: `Hi ${name}`
  });
});

app.get('/home', function (req, res) {
  res.send('GET home');
});

app.post('/home', function (req, res) {
  res.send('POST home');
});

app.get('/q', function (req, res) {
  var name = getRandomName();
  res.send(`Hello ${name}`);
});

app.get('/q/:id', function (req, res) {
  let id = req.params.id;
  res.send(`Hello Q${id}`);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);