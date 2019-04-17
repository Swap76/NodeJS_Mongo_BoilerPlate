// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
  
  // Declare a route
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
  
  fastify.get('/api', async (req, res) => {
    message = [
        {id: 1, firstName:'Swapnil', lastName:'Shinde'},
        {id: 2, firstName:'Rahul', lastName:'Sawant-Desai'},
        {id: 3, firstName:'Omkar', lastName:'Prabhu'},
    ]
    return message;
  })

  // Run the server!
  const start = async () => {
    try {
      await fastify.listen(5000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()