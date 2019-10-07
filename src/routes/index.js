'use strict';
import debug from ('debug','api:routes');
import authRoutes from './auth';
import blogRoutes from './blog';


const initRoutes = (app) => {
  debug('Initializing routes...');

  app.use('/auth', authRoutes);

  app.use('/blog', blogRoutes);

  debug('Finished initializing routes...');
};

module.exports = initRoutes;
