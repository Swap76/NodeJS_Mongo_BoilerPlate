const Joi = require('joi');
const debug = require('debug')('api:BlogController');
const Blog = require('../../models/Blogs');
const validator = require('validator');

exports.blogview = async (req, res) => {
    res.send("Blogs")
}