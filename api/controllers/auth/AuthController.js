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
	res.send(message);
}

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
		req.flash('error', error.details[0].message);
    	// res.redirect('back');
	} else if (password != password2) {
		req.flash('error', "Password doesn't match");
    	// res.redirect('back');
	} else if (validator.contains(username, ' ')) {
		req.flash('error', '"username" should not contain blank space');
		// res.redirect('back');
	} else {
		// If validation Passed
		User.findOne({ email: email})
			.then(user => {
				if(user) {
					req.flash('error', "Email id already registered");
    				// res.redirect('back');
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
								req.flash('error', "Bcrypt Error");
    							// res.redirect('back');
							} else {
								// Set password to hashed
								newUser.password = hash;
								// Save user
								newUser.save()
									.then(user => {
										console.log(user);
										req.flash('success_msg','You are now registered');
										console.log('You are now registered');
										res.redirect('/auth/login');
									})
									.catch(err => console.log(err));
							}
					}))
				}
			});
	}
}

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
		req.flash('error', error.details[0].message);
		// res.redirect('back');
	  }
	  else {
		User.findOne({ email: req.body.email}, (err, user) => {
			if (err) {
			  debug(err);
			  req.flash('error', 'Some error from mongodb. Try again');
			  // res.redirect('back');
			} else if (user) {
			  bcrypt.compare(req.body.password, user.password, (err, match) => {
				if (err) {
				  debug(err);
				  req.flash('error', 'Some error from bcrypt. Try again');
				  //res.redirect('back');
				} else if (match) {
					req.session.loggedIn = true;
					req.session.user = user;
					console.log(user);
					res.redirect('/auth/1');
				} else {
				  req.flash('error', 'Incorrect Password');
				  console.log('Incorrect Password');
				  // res.redirect('back');
				}
			  });
			} else {
			  req.flash('error', 'Incorrect email address');
			  console.log('Incorrect email address');
			  // res.redirect('back');
			}
		  });
	  }
}

module.exports.logout = (req, res, next) => {
  if (req.session.user != null) {
    req.session.user = null;
    req.session.loggedIn = false;
    req.flash('warning', 'Thanks for visiting. See you soon');
  }
  res.redirect('/auth/login');
};

module.exports.checkUser = (req, res, next) => {
  if (req.session.user && req.session.user._id) {
    next();
  } else {
		req.flash('error', 'You must log in to continue');
		res.redirect('/auth/login');
  }
};

module.exports.loginView= (req, res, next) => {
  res.send('Login')
};