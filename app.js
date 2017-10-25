require('dotenv').config();

const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('index page');
});

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log('Server listening on port', PORT);
});
