const Joi = require('joi');
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
	
	res.send("message");
}

exports.login = async (req, res) => {
	
	res.send("message");
}