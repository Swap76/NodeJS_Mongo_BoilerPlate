'use strict';
const 
  express = require('express'),
  router = express.Router(),
  authController = require('../controllers/auth/AuthController'),
  UserValidator = require('../middleware/validators/user.validator');

router.post('/register', UserValidator.user, authController.register);

router.post('/login', UserValidator.user, authController.login);

router.get('/logout', authController.logout);

module.exports = router;
