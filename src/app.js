const express = require('express');
const moment = require('moment');
const Sentry = require('@sentry/node');
require('dotenv').config(); // Load .env
const initMiddleware = require('./config/middleware');
const initRoutes = require('./routes/index');
const initDatabase = require('./config/database');

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
initDatabase();

// Routes
initRoutes(app);

app.use((req, res, next) => {
  const err = new Error('The requested url was not found on this server');
  err.status = 404;
  next(err);
});

app.listen(5000)

module.exports = app;