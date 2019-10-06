const helmet = require('helmet');
const passport = require('passport');
const compression = require('compression');
const debug = require('debug')('api:middleware');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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