const router = require('express').Router();
const ctrl = require('../controllers/question.controller');
const auth = require('../utils/auth.middleware');
router.post('/', auth, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.delete('/:id', auth, ctrl.delete);
module.exports = router;
