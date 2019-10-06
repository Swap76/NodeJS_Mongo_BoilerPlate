'use strict';

const Joi = require('joi');
const debug = require('debug')('api:BlogController');
const Blog = require('../../models/Blogs');
const validator = require('validator');

/**
 * Shows all blog posts of all users
 * @route /blog/
 * @method GET
 */

module.exports.all = async (req, res) => {
  try {
    const result = await Blog.find().populate('userId');
    if(result.length > 0) {
      return res.status(200).send(result);
    }
    return res.status(400).send({'error':'There are no blogs'});
  } catch (err) {
    debug(err);
    return res.status(400).send({'error':'Some error. Try again'});
  }

};

/**
 * Shows all blog posts of signed in user
 * @route /blog/dashboard
 * @method GET
 */
module.exports.dashboard = async (req, res) => {
  try {
    const result = await Blog.find({ userId: req.session.user._id });
    if(result > 0) {
      res.status(200).send(result);
    }
    return res.status(400).send({'error':'There are no blogs'}); 
  } catch (err) {
    debug(err);
    res.status(400).send({'error':'Some error. Try again'});
  }

};

/**
 * Creates a new blog post
 * @route /blog/create
 * @body title, body
 * @method POST
 */

module.exports.create = async (req, res) => {
  const { title, content } = req.body;
  const data = {
    title,
    content
  };
  const check = {
    title: Joi.string().required().min(4).max(256),
    content: Joi.string().required().min(8).max(65536)
  };
  const { error } = Joi.validate(data, check);
  if (error) {
    res.status(400).send({'error':error.details[0].message});
  } else {
    req.body.userId = req.session.user._id;
    const newBlog = new Blog(req.body);
		
    try {
      const result = await newBlog.save();
      if (result) {
        return res.status(201).send('Post added successfully');
      }
      return res.status(400).send({'error':'Failed to create new post. Try again'});
    } catch (err) {
      debug(err);
      return res.status(400).send({'error':'Some error. Try again'});
    }
  }

};

/**
 * Shows a single blog post
 * @route /blog/:id
 * @param id blog post id
 * @method GET
 */

module.exports.show = async (req, res, ) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else {
    try {
      const result = await Blog.findById(id).populate('userId');
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(400).send({'error':'There is no such blog post'});
    } catch(err) {
      debug(err);
      res.status(400).send({'error':'Some error. Try again'});
    }
  }

};

/**
 * Updates a blog post with new content
 * @route /blog/:id/edit
 * @param id blog post id
 * @method POST
 */
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else{
    const data = {
      title: req.body.title,
      content: req.body.content
    };
    const check = {
      title: Joi.string().required().min(4).max(256),
      content: Joi.string().required().min(8).max(65536)
    };
    const { error } = Joi.validate(data, check);
    if (error) {
      res.status(400).send({'error':error.details[0].message});
    } else {
      try {
        const result = await Blog.findByIdAndUpdate(id, { $set: req.body });
        if(result) {
          return res.status(202).send('Post updated successfully');
        }
        return res.status(400).send({'error':'There is no such blog post'});
      } catch(err) {
        debug(err);
        return res.status(400).send({'error':'Some error. Try again'});
      }
    }
  } 

};

/**
 * Deletes a blog post
 * @route /blog/:id/delete
 * @param id blog post id
 * @method GET
 */
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else {
    try {
      const result = await Blog.findByIdAndDelete(id);
      if(result) {
        return res.status(202).send('Post deleted successfully');
      }
      return res.status(400).send({'error':'There is no such blog post'});
    } catch (err) {
      debug(err);
      res.status(400).send({'error':'Some error. Try again'});
    }
  }

};

/**
 *  Middleware for checking if user is owner of blog
 */
module.exports.checkBlogOwner = async (req, res, next) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else {
    try {
      const post = await Blog.findById(id);
      if(post) {
        if (post.userId.toString() === req.session.user._id.toString()) {
          next();
          return;
        } else {
          return res.status(403).send({'error':'You are not owner of this post'});
        }
      }
      return res.status(400).send({'error':'There is no such blog post'});
    } catch (err) {
      debug(err);
      return res.status(400).send({'error':'Some error. Try again'});
    }

  }
};
