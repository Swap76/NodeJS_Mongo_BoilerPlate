const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const compression = require('compression')
const debug = require('debug')('api:middleware')
const bodyParser = require('body-parser')
const logger = require('morgan');
const cookieParser = require('cookie-parser')

const initMiddleware = (app) => {

    debug('Initializing middlewares...');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser())

    app.use(helmet());

    app.use(logger('dev'));

    app.disable('x-powered-by');

    app.use(compression());

    app.use(
        session({
          secret: 'swapnil',
          resave: true,
          saveUninitialized: true
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });
    
    debug('Finished initializing middlewares...');
};
  
module.exports = initMiddleware;