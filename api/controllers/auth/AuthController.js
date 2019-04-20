const Joi = require('joi');
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
	} else if (user.password == user.password2) {
		req.flash('error', "Password doesn't match");
    	res.redirect('back');
	} else {

	}
	res.send("message");
}

exports.login = async (req, res) => {
	
	res.send("message");
}