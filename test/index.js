const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);

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