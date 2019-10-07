'use strict';
import helmet from 'helmet';
import passport from 'passport';
import compression from 'compression';
import debug from ('debug','api:middleware');
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const initMiddleware = (app) => {

  debug('Initializing middlewares...');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(helmet());

  app.use(cors());

  app.use(logger('dev'));

  app.disable('x-powered-by');

  app.use(compression());
	
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
	
  debug('Finished initializing middlewares...');
};
  
module.exports = initMiddleware;