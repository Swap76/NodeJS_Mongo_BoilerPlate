const debug = require('debug')('api:database');
const mongoose = require('mongoose');

const initDatabase = () => {
	
	debug('Initializing database connection...');

	mongoose.connect('mongodb://127.0.0.1:27017/api', { useNewUrlParser: true});
	const connection = mongoose.connection;

	connection.once('open', () => {
		debug("MongoDB database connected successfully");
	})
};
  
module.exports = initDatabase;
  

