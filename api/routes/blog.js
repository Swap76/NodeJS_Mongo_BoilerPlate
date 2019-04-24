const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/AuthController');

const blogController = require('../controllers/blogs/BlogController');

router.get('/', blogController.all);

router.get('/dashboard', authController.checkUser, blogController.dashboard);

router.get('/create', authController.checkUser, blogController.createView);

router.get('/:id/edit', authController.checkUser, blogController.checkBlogOwner, blogController.editView);

// CRUD 

router.post('/create', authController.checkUser, blogController.create);

router.get('/:id', blogController.show);

router.post('/:id/edit', authController.checkUser, blogController.checkBlogOwner, blogController.edit);

router.get('/:id/delete', authController.checkUser, blogController.checkBlogOwner, blogController.delete);

module.exports = router;
