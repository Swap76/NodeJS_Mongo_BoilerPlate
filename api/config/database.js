const debug = require('debug')('api:database');
const mongoose = require('mongoose');

const initDatabase = () => {
	
	debug('Initializing database connection...');

	const db = 'mongodb+srv://Swapnil:vijaya26@cluster0-oslju.mongodb.net/test?retryWrites=true';

	mongoose.connect(db, { useNewUrlParser: true})
		.then(() => debug('MongoDB Connected....'))
		.catch(err => debug(err));

	const connection = mongoose.connection;

	connection.once('open', () => {
		debug("MongoDB database connected successfully");
	})
};
  
module.exports = initDatabase;
  

