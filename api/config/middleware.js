const helmet = require('helmet');
const compression = require('compression')
const debug = require('debug')('api:middleware')
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')

const initMiddleware = (app) => {

    debug('Initializing middlewares...');

    app.use(helmet());

    app.use(logger('dev'));

    app.disable('x-powered-by');

    app.use(compression());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser())
  
    debug('Finished initializing middlewares...');
};
  
module.exports = initMiddleware;