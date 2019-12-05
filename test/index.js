var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

chai.use(chaiHttp);

describe('Server Up & Running', function() {
  it('should not return anything', function() {
        
  });
});

describe('Testing GET route', function() {
  it('should list ALL blogs on blog/ GET', function(done) {
    chai.request(server)
      .get('/blog/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});