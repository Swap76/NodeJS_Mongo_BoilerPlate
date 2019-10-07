import express from 'express';
const router = express.Router(),
import authController from '../controllers/auth/AuthController';
import blogController from '../controllers/blogs/BlogController';
import BlogValidator from '../middleware/validators/blog.validator';
import IdValidator from '../middleware/validators/id.validator';

router.get('/', blogController.all);

router.get('/dashboard', authController.checkUser, blogController.dashboard);

router.post('/create', BlogValidator.blog, authController.checkUser, blogController.create);

router.get('/:id', IdValidator.isValidId, blogController.show);

router.post('/:id/edit', IdValidator.isValidId, BlogValidator.blog, authController.checkUser, blogController.checkBlogOwner, blogController.edit);

router.get('/:id/delete', IdValidator.isValidId, authController.checkUser, blogController.checkBlogOwner, blogController.delete);

module.exports = router;
