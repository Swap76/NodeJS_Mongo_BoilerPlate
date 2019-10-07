'use strict';

import Joi from 'joi';
import debug from ('debug','api:AuthController');
import bcrypt from 'bcryptjs';
import User from '../../models/Users';
import validator from 'validator';

/**
 * Sign up a new user with given form details
 * @route /auth/register
 * @body name, email, username, password
 * @method POST
 */
exports.register = async (req, res) => {
	const { username, email, password, password2 } = req.body;
	const user = {
		username,
		email,
		password,
		password2
	};
	const check = {
		username: Joi.string().min(4).max(32).required().trim(),
		email: Joi.string().email().min(8).max(64).required().trim(),
		password: Joi.string().required().min(8).max(32),
		password2: Joi.string().required().min(8).max(32)
	};
	const { error } = Joi.validate(user, check);
	if (error) {
		res.status(400).send({ 'error': error.details[0].message });
	} else if (password != password2) {
		res.status(400).send({ 'error': 'Password doesn\'t match' });
	} else if (validator.contains(username, ' ')) {
		res.status(400).send({ 'error': '"username" should not contain blank space' });
	} else {
		// If validation Passed
		const user = await User.findOne({ email: email })
		if (user) {
			return res.status(400).send({ 'error': 'Email id already registered' });
		}
		const newUser = new User({
			username,
			email,
			password
		});
		// Hash Password
		bcrypt.genSalt(10, (err, salt) =>
			bcrypt.hash(newUser.password, salt, async (err, hash) => {
				if (err) {
					return res.status(400).send({ 'error': 'Bcrypt Error' });
				}
				// Set password to hashed
				newUser.password = hash;
				// Save user
				try {
					await newUser.save();
					return res.status(400).send('You are now registered');
				}
				catch (err) {
					debug(err);
				}
			}
			));
	}
}
>>>>>> master

/**
 * Logs in the existing user
 * @route /auth/login
 * @body email, password
 * @method POST
 */
module.exports.login = async (req, res) => {
	const data = {
		email: req.body.email,
		password: req.body.password,
	};
	const check = {
		email: Joi.string().email().required().trim(),
		password: Joi.string().required().min(8).max(32)
	};
	const { error } = Joi.validate(data, check);
	if (error) {
		res.status(400).send({ 'error': error.details[0].message });
	}
	else {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				try {
					const match = await bcrypt.compare(req.body.password, user.password);
					if (match) {
						req.session.loggedIn = true;
						req.session.user = user;
						return res.status(200).send('Logged in.');
					}
					return res.status(400).send({ 'error': 'Incorrect Password' });
				} catch (err) {
					debug(err);
					return res.status(400).send({ 'error': 'Some error from mongodb. Try again' });
				}
			}
		} catch (err) {
			res.status(400).send({ 'error': 'Incorrect email address' });
		}
	};
}

/**
 * Logs out the currently logged in user
 * @route /auth/logout
 * @param none
 * @method GET
 */
module.exports.logout = (req, res) => {
  if (req.session.user != null) {
    req.session.user = null;
    req.session.loggedIn = false;
    res.status(200).send('Logged out');
  } else {
    res.status(400).send({ error: 'Some error in logout try again' });
  }
};

/**
 *  Middleware for checking if user is logged in or not
 */
module.exports.checkUser = (req, res, next) => {
  if (req.session.user && req.session.user._id) {
    next();
  } else {
    res.status(400).send('Login first');
  }

};
