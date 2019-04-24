const Joi = require('joi');
const debug = require('debug')('api:BlogController');
const Blog = require('../../models/Blogs');
const validator = require('validator');

module.exports.all = async (req, res) => {
	res.send("All Blogs");
};

module.exports.dashboard = async (req, res) => {
	res.send("Dashboard");
};

// CRUD

module.exports.create = async (req, res) => {
	res.send("Create");
};

module.exports.show = async (req, res) => {
	res.send("Show");
};

module.exports.edit = async (req, res) => {
	res.send("Edit");
};

module.exports.delete = async (req, res) => {
	res.send("Delete");
};