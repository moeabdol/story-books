const express     = require('express');
const router      = express.Router();
const stories     = require('../controllers/stories');
const authHelpers = require('../helpers/auth');

router.get('/', stories.index);
router.get('/add', authHelpers.ensureAuthenticated, stories.add);

module.exports = router;
