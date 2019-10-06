const 
    express = require('express'),
    router = express.Router(),
    authController = require('../controllers/auth/AuthController'),
    UserValidator = require('../middleware/validators/user.validator');

router.post('/register', authController.register, UserValidator.user);

router.post('/login', authController.login, UserValidator.user);

router.get('/logout', authController.logout);

module.exports = router;
