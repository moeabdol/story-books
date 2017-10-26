const express     = require('express');
const router      = express.Router();
const authHelpers = require('../helpers/auth');

router.get('/', authHelpers.ensureGuest, (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', authHelpers.ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
