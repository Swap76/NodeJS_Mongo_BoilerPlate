const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const validator = require('validator');

exports.test = async (req, res) => {
	message = [
		{id: 1, firstName:'Swapnil', lastName:'Shinde'},
		{id: 2, firstName:'Rahul', lastName:'Sawant-Desai'},
		{id: 3, firstName:'Omkar', lastName:'Prabhu'},
	]
	res.send(message);
}

exports.test1 = async (req, res) => {
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
    	res.redirect('back');
	} else if (password != password2) {
		req.flash('error', "Password doesn't match");
    	res.redirect('back');
	} else if (validator.contains(username, ' ')) {
		req.flash('error', '"username" should not contain blank space');
		res.redirect('back');
	} else {
		// If validation Passed
		User.findOne({ email: email})
			.then(user => {
				if(user) {
					req.flash('error', "Email id already registered");
    				res.redirect('back');
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
    							res.redirect('back');
							} else {
								// Set password to hashed
								newUser.password = hash;
								// Save user
								newUser.save()
									.then(user => {
										res.redirect('/login');
									})
									.catch(err => console.log(err));
							}
					}))
				}
			});
	}
	res.send("message");
}

exports.login = async (req, res) => {
	
	res.send("message");
}