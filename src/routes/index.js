const debug = require('debug')('api:routes');
const authRoutes = require('./auth');
const blogRoutes = require('./blog');
const staticRoutes = require('./static');

const initRoutes = (app) => {
  debug('Initializing routes...');

  app.use('/', staticRoutes);

  app.use('/auth', authRoutes);

  app.use('/blog', blogRoutes);

  debug('Finished initializing routes...');
};

module.exports = initRoutes;
