const express     = require('express');
const router      = express.Router();
const Story       = require('../models/story');
const authHelpers = require('../helpers/auth');

router.get('/', authHelpers.ensureGuest, (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', authHelpers.ensureAuthenticated, (req, res) => {
  Story.find({ user: req.user.id })
    .then(stories => res.render('dashboard', { stories }))
    .catch(err => console.log(err));
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
