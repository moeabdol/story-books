const express     = require('express');
const router      = express.Router();
const stories     = require('../controllers/stories');
const authHelpers = require('../helpers/auth');

router.get('/', stories.index);
router.get('/add', authHelpers.ensureAuthenticated, stories.add);
router.post('/', authHelpers.ensureAuthenticated, stories.create);
router.get('/:id', stories.show);
router.get('/edit/:id', authHelpers.ensureAuthenticated, stories.edit);
router.put('/:id', authHelpers.ensureAuthenticated, stories.update);
router.delete('/:id', authHelpers.ensureAuthenticated, stories.destroy);
router.post('/:id/comment', stories.createComment);

module.exports = router;
