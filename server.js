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


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
