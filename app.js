import express from 'express';
import moment from 'moment';
import Sentry from '@sentry/node';
require('dotenv').config(); // Load .env
import initRoutes from './src/routes/index';
import initDatabase from './src/config/database';
import initMiddleware from './src/config/middleware';

const app = express();

// Sentry for Error monitoring 
Sentry.init({
  /*eslint-disable */
  dsn: process.env.SENTRY_DSN,
});

app.locals.moment = moment;

// Middleware
initMiddleware(app);

// Database
initDatabase(app);

// Routes
initRoutes(app);

app.use((req, res, next) => {
  const err = new Error('The requested url was not found on this server');
  err.status = 404;
  next(err);
});

app.listen(5000)
