const express = require('express');
const moment = require('moment');
const debug = require('debug')('api:app');
const initRoutes = require('./api/routes/index')
const initDatabase = require('./api/config/database');
const initMiddleware = require('./api/config/middleware')

const app = express();

app.locals.moment = moment;

initMiddleware(app);

initDatabase(app);

initRoutes(app);

app.use((req, res, next) => {
  const err = new Error('The requested url was not found on this server');
  err.status = 404;
  next(err);
});

app.listen(5000)
