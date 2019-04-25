const Joi = require('joi');
const debug = require('debug')('api:AuthController');
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const validator = require('validator');

module.exports.test1 = async (req, res) => {
	message = [
		{id: 1, firstName:'Swapnil', lastName:'Shinde'},
		{id: 2, firstName:'Rahul', lastName:'Sawant-Desai'},
		{id: 3, firstName:'Omkar', lastName:'Prabhu'},
		{id: 4, firstName:'Shwetz', lastName:'Sies'},
	]
	res.status(200).send(message);
}

/**
 * Sign up a new user with given form details
 * @route /auth/register
 * @body name, email, username, password
 * @method POST
 */
exports.register = async (req, res) => {
	const { username, email, password, password2} = req.body;
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
	if (error){
		res.status(400).send({'error':error.details[0].message});  	
	} else if (password != password2) {
		res.status(400).send({'error':'Password doesn\'t match'});    	
	} else if (validator.contains(username, ' ')) {
		res.status(400).send({'error':'"username" should not contain blank space'});   	 
	} else {
		// If validation Passed
		User.findOne({ email: email})
			.then(user => {
				if(user) {
    			res.status(400).send({'error':'Email id already registered'});   
				} else {
					const newUser = new User({
						username,
						email,
						password
					});
					
					// Hash Password
					bcrypt.genSalt(10, (err, salt) => 
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err) {
    						res.status(400).send({'error':'Bcrypt Error'});
							} else {
								// Set password to hashed
								newUser.password = hash;
								// Save user
								newUser.save()
									.then(user => {
										console.log(user);
										res.status(400).send('You are now registered');
									})
									.catch(err => console.log(err));
							}
					}))
				}
			});
	}
}

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
			res.status(400).send({'error':error.details[0].message});	 
	  }
	  else {
		User.findOne({ email: req.body.email}, (err, user) => {
			if (err) {
			  debug(err);
				res.status(400).send({'error':'Some error from mongodb. Try again'});  
			} else if (user) {
			  bcrypt.compare(req.body.password, user.password, (err, match) => {
				if (err) {
				  debug(err);
					res.status(400).send({'error':'Some error from bcrypt. Try again'});  
				} else if (match) {
					req.session.loggedIn = true;
					req.session.user = user;
					console.log(user);
					res.status(200).send('Logged in.');
				} else {
					res.status(400).send({'error':'Incorrect Password'});  
				}
			  });
			} else {
				res.status(400).send({'error':'Incorrect email address'});
			  console.log('Incorrect email address');			   
			}
		  });
	  }
}

/**
 * Logs out the currently logged in user
 * @route /auth/logout
 * @param none
 * @method GET
 */
module.exports.logout = (req, res, next) => {
  if (req.session.user != null) {
    req.session.user = null;
    req.session.loggedIn = false;
		res.status(200).send('Logged out');
	} else {
		res.status(400).send({'error':'Some error in logout try again'});
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
		// res.redirect('/auth/login');
  }
};
