const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.home);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;
