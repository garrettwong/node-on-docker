'use strict';

// express 4.0
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/home', function(req, res) {
  res.send('GET home');
});

app.post('/home', function(req, res) {
  res.send('POST home');
});

app.get('/q', function(req, res) {
  res.send('Hello Q');
});

app.get('/q/:id', function(req, res) {
  var id = req.params.id;
  res.send(`Hello Q${id}`);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
