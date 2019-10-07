
const 
  express = require('express'),
  router = express.Router(),
  authController = require('../controllers/auth/AuthController'),
  blogController = require('../controllers/blogs/BlogController'),
  BlogValidator = require('../middleware/validators/blog.validator'),
  IdValidator = require('../middleware/validators/id.validator');

router.get('/', blogController.all);

router.get('/dashboard', authController.checkUser, blogController.dashboard);

router.post('/create', BlogValidator.blog, authController.checkUser, blogController.create);

router.get('/:id', IdValidator.isValidId, blogController.show);

router.post('/:id/edit', IdValidator.isValidId, BlogValidator.blog, authController.checkUser, blogController.checkBlogOwner, blogController.edit);

router.get('/:id/delete', IdValidator.isValidId, authController.checkUser, blogController.checkBlogOwner, blogController.delete);

module.exports = router;
