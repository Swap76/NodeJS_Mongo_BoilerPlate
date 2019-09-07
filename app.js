const express = require('express');
const moment = require('moment');
const debug = require('debug')('api:app');
const Raven = require('raven');
require('dotenv').config(); // Load .env
const initRoutes = require('./src/routes/index')
const initDatabase = require('./src/config/database');
const initMiddleware = require('./src/config/middleware')

const app = express();

// Sentry Error Monitoring System
Raven.config(process.env.SENTRY_DSN).install();
app.use(Raven.requestHandler());

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
