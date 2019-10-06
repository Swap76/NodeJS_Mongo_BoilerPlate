const debug = require('debug')('api:routes');
const authRoutes = require('./auth');
const blogRoutes = require('./blog');


const initRoutes = (app) => {
  debug('Initializing routes...');

  app.use('/auth', authRoutes);

  app.use('/blog', blogRoutes);

  debug('Finished initializing routes...');
};

module.exports = initRoutes;
