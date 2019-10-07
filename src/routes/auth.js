'use strict';
 
import express from 'express';
const router = express.Router();
import authController from '../controllers/auth/AuthController';
import UserValidator from '../middleware/validators/user.validator';

router.post('/register', UserValidator.user, authController.register);

router.post('/login', UserValidator.user, authController.login);

router.get('/logout', authController.logout);

module.exports = router;
