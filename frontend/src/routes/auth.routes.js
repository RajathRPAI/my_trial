const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const auth = require('../utils/auth.middleware');
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.me);
module.exports = router;
