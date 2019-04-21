const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/AuthController');

const blogController = require('../controllers/blogs/BlogController');

router.get('/0', authController.checkUser, blogController.blogview);

router.get('/', blogController.all);

router.get('/:id', blogController.show);

router.get('/dashboared', authController.checkUser, blogController.dashboard);

router.get('/create', authController.checkUser, blogController.create);

router.get('/:id/edit', authController.checkUser, blogController.edit);

router.get('/:id/delete', authController.checkUser, blogController.delete);

module.exports = router;
