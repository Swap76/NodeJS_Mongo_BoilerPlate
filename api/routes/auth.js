const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/AuthController');

router.get('/0', authController.test);

router.get('/1', authController.test1);

router.get('/register', authController.register);

router.get('/login', authController.login);

module.exports = router;
