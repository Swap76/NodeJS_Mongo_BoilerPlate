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
		if (post) {
			res.send(post);
		} else {
			var err = new Error('No blog posts')
			next(err);
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
		if (post) {
			res.send(post);
		} else {
			var err = new Error('No blog posts')
			next(err);
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
		req.flash('warning', error.details[0].message);
		// res.redirect('/blog/create');
	} else {
		req.body.userId = req.session.user._id;
		const newBlog = new Blog(req.body);
		newBlog.save((err, result) => {
			if (err) {
				debug(err);
				req.flash('error', 'Some error. Try again');
				// res.redirect('/blog/create');
			} else if (result) {
				req.flash(null);
				req.flash('success', 'Post added successfully');
				res.send("Post added successfully");
				console.log(result);
				// res.redirect('/blog/create');
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
    var err = new Error('There is no such blog post')
    next(err);
  } else {
		Blog.findById(id).populate('userId').exec((err, post) => {
      if (post) {
        res.send(post);
      } else {
        var err = new Error('There is no such blog post')
        next(err);
      }
    });
	}
};

/**
 * Updates a blog post with new content
 * @route /blog/:id
 * @param id blog post id
 * @method POST
 */
module.exports.edit = async (req, res, next) => {
	const id = req.params.id;
  if (!validator.isMongoId(id)) {
    var err = new Error('There is no such blog post')
    next(err);
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
			req.flash('warning', error.details[0].message);
			res.redirect('back');
		} else if (result.userId.toString() === req.session.user._id.toString()) {
			Blog.findByIdAndUpdate(id, { $set: req.body }, (err, result) => {
				if (err) {
					req.flash('error', 'Some error. Try again');
					// res.redirect('/blog/dashboard');
				} else if (result) {
					req.flash('success', 'Post updated successfully');
					console.log(result);
					res.send("Post updated successfully");
					// res.redirect('/blog/dashboard');
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
    var err = new Error('There is no such blog post')
    next(err);
  } else {
    Blog.findOneAndDelete(id, (err, result) => {
      if (err) {
        next(err);
      } else if (result && result.userId.toString() === req.session.user._id.toString()) {
				req.flash('success', 'Post deleted successfully');
				res.send("Post deleted successfully");
        // res.redirect('/blog/dashboard');
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
    var err = new Error('There is no such blog post')
    next(err);
  } else {
    Blog.findById(id).exec((err, post) => {
      if (post) {
        if (post.userId.toString() === req.session.user._id.toString()) {
          next();
        } else {
          req.flash('error', 'You are not owner of this post');
          res.redirect(`/dashboard`);
        }
      } else if (err) {
        req.flash('error', 'Some error. Try again');
        res.redirect(`/dashboard`);
      } else {
        req.flash('error', 'Some error. Try again');
        res.redirect(`/dashboard`);
      }
    });
  }
};