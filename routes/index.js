const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
