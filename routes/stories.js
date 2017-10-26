const express = require('express');
const router  = express.Router();
const stories = require('../controllers/stories');

router.get('/', stories.index);
router.get('/add', stories.add);

module.exports = router;
