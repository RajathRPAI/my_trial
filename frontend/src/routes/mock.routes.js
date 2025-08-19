const router = require('express').Router();
const ctrl = require('../controllers/mock.controller');
const auth = require('../utils/auth.middleware');
router.post('/', auth, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
module.exports = router;
