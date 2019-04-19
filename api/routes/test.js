const test = require('../controllers/test');

const routes = [
  {
    method: 'GET',
    url: '/api/0',
    handler: test.test
  },
  {
    method: 'GET',
    url: '/api/1',
    handler: test.test1
  }
]

module.exports = routes