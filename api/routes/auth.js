const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth/AuthController');

router.get('/0', authController.test);

router.get('/1', authController.test1);


module.exports = router;
