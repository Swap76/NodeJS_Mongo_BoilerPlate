const debug = require('debug')('api:database');
const mongoose = require('mongoose');

const initDatabase = () => {
	
	debug('Initializing database connection...');

	const db = process.env.MONGODB_URL;

	mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true})
		.catch(err => debug(err));

	const connection = mongoose.connection;

	connection.once('open', () => {
		debug("MongoDB database connected successfully");
	})
};
  
module.exports = initDatabase;
  

