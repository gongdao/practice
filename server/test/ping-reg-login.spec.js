const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST ping", () => {
  it("it should return 200 and message", (done) => {
    chai
      .request.agent('http://localhost:3001')
      .post(`/auth/logout`)
      .end((err, res) => {
        res.text.should.have
          .eql("You have successfully logged out");
        done();
      });
  });
  it('should create a new user', (done) => {
    chai
      .request('http://localhost:3001')
      .post('/auth/register')
      .send({username: 'Bob', email: 'bob@yahoo.ca', password: 'password'})
      .end((err, res) => {
        chai.expect(res.status).to.equal(201)
        done()
      })
  })
  it('should login successfully', (done) => {
    chai
      .request('http://localhost:3001')
      .post('/auth/login')
      .send({ email: 'bob@yahoo.ca', password: 'password'})
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        done()
      })
  })
});
