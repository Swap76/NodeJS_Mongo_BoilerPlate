const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/AuthController');

const blogController = require('../controllers/blogs/BlogController');

router.get('/0', authController.checkUser, blogController.blogview);

module.exports = router;
