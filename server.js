const mongoose = require('mongoose');
const app = require('fastify')({ logger: true })
const routes = require('./api/routes/test')


mongoose.connect('mongodb://127.0.0.1:27017/api', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connected successfully");
})

routes.forEach((route, index) => {
  app.route(route)
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000)
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()