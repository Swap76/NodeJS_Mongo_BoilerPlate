const debug = require('debug')('api:routes');
const authRoutes = require('./auth');

const initRoutes = (app) => {
  debug('Initializing routes...');

  app.use('/auth', authRoutes);

  debug('Finished initializing routes...');
};

module.exports = initRoutes;
