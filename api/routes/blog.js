const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogs/BlogController');

router.get('/0', blogController.blogview);

module.exports = router;
