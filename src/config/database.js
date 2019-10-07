'use strict';
import debug from 'debug'('api:database');
import mongoose from 'mongoose';

const initDatabase = () => {
	
  debug('Initializing database connection...');
  /*eslint-disable */
  const db = process.env.MONGODB_URL;

  mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true})
    .catch(err => debug(err));

  const connection = mongoose.connection;

  connection.once('open', () => {
    debug('MongoDB database connected successfully');
  });
};
  
module.exports = initDatabase;
  

