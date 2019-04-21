const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const compression = require('compression')
const debug = require('debug')('api:middleware')
const bodyParser = require('body-parser')
const logger = require('morgan');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser')
const csrf = require('csurf');

const initMiddleware = (app) => {

	debug('Initializing middlewares...');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser())

	app.use(helmet());

	app.use(logger('dev'));

	app.disable('x-powered-by');

	app.use(compression());
	
	// Initialize Passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Connect flash
	app.use(flash());
	
// Express Sessions
	const store = new MongoDBStore({
			uri: process.env.MONGODB_URL,
			collection: 'sessions',
		}, ((err) => {
			if (err) {
				debug('Unable to connect to Session Store');
			}
		}
	));

// Configuring Session Options 
	app.use(session({
		secret: '2BB80D537B1DA3E38BD30361AA855686BDE0EACD7162FEF6A25FE97BF527A25B',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 86400000 },
		store,
	}));

	// Global Vars
	app.use(function(req, res, next) {
		res.locals.session = req.session;
		res.locals.success_msg = req.flash('success_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		next();
	});

	// // CSRF Protection
	// app.use(csrf({ cookie: true }));
	// app.use((err, req, res, next) => {
	// 	if (err.code === 'EBADCSRFTOKEN') {
	// 	const nErr = new Error('Something went wrong. Try again');
	// 	next(nErr);
	// 	}
	// });

	// app.use((req, res, next) => {
	// 	res.locals.token = req.csrfToken();
	// 	next();
	// });

	
	debug('Finished initializing middlewares...');
};
  
module.exports = initMiddleware;