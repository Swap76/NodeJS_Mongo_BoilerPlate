const Joi = require('joi');
const debug = require('debug')('api:BlogController');
const Blog = require('../../models/Blogs');
const validator = require('validator');

/**
 * Shows all blog posts of all users
 * @route /blog/
 * @method GET
 */
module.exports.all = async (req, res, next) => {
	Blog.find().populate('userId').exec((err, post) => {
		if (err) {
			debug(err);
			res.status(400).send({'error':'Some error. Try again'});
		} else if (post) {
			res.status(200).send(post);
		} else {
			res.status(400).send({'error':'There are no blogs'});
		}
	});
};

/**
 * Shows all blog posts of signed in user
 * @route /blog/dashboard
 * @method GET
 */
module.exports.dashboard = async (req, res, next) => {
	Blog.find({ userId: req.session.user._id }).exec((err, post) => {
		if (err) {
			debug(err);
			res.status(400).send({'error':'Some error. Try again'});
		} else if (post) {
			res.status(200).send(post);
		} else {
			res.status(400).send({'error':'There are no blogs'});
		}
	});
};

/**
 * Creates a new blog post
 * @route /blog/create
 * @body title, body
 * @method POST
 */
module.exports.create = async (req, res, next) => {
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
		newBlog.save((err, result) => {
			if (err) {
				debug(err);
				res.status(400).send({'error':'Some error. Try again'});
			} else if (result) {
				res.status(201).send("Post added successfully");
				console.log(result);
			}
		});
	}
};

/**
 * Shows a single blog post
 * @route /blog/:id
 * @param id blog post id
 * @method GET
 */
module.exports.show = async (req, res, next) => {
	const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else {
		Blog.findById(id).populate('userId').exec((err, post) => {
      if (err) {
				debug(err);
				res.status(400).send({'error':'Some error. Try again'});
			} else if (post) {
        res.status(200).send(post);
      } else {
        res.status(400).send({'error':'There is no such blog post'});
      }
    });
	}
};

/**
 * Updates a blog post with new content
 * @route /blog/:id/edit
 * @param id blog post id
 * @method POST
 */
module.exports.edit = async (req, res, next) => {
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
			Blog.findByIdAndUpdate(id, { $set: req.body }, (err, result) => {
				if (err) {
					debug(err);
					res.status(400).send({'error':'Some error. Try again'});
				} else if (result) {
					console.log(result);
					res.status(202).send("Post updated successfully");
				} else {
					res.status(400).send({'error':'There is no such blog post'});
				}
			});
		}
	} 
};

/**
 * Deletes a blog post
 * @route /blog/:id/delete
 * @param id blog post id
 * @method GET
 */
module.exports.delete = async (req, res, next) => {
	const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else {
    Blog.findByIdAndDelete(id, (err, result) => {
			console.log(id);
      if (err) {
				debug(err);
        res.status(400).send({'error':'Some error. Try again'});
      } else if (result) {
				res.status(202).send("Post deleted successfully");
      } else {
				res.status(400).send({'error':'There is no such blog post'});
			}
    });
  }
};

/**
 *  Middleware for checking if user is owner of blog
 */
module.exports.checkBlogOwner = (req, res, next) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).send({'error':'There is no such blog post'});
  } else {
    Blog.findById(id).exec((err, post) => {
      if (post) {
        if (post.userId.toString() === req.session.user._id.toString()) {
          next();
        } else {
					res.status(403).send({'error':'You are not owner of this post'});
        }
      } else if (err) {
				debug(err);
				res.status(400).send({'error':'Some error. Try again'});
      } else {
				res.status(400).send({'error':'There is no such blog post'});
			}
    });
  }
};