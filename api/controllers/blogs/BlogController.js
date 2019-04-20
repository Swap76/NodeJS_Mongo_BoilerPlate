const Joi = require('joi');
const Blog = require('../../models/Blogs');
const validator = require('validator');

const blogSchema = new mongoose.Schema({

}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
