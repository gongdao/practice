const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const request = require('supertest');
const should = require('should');

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
  // it('should create a new user', (done) => {
  //   chai
  //     .request('http://localhost:3001')
  //     .post('/auth/register')
  //     .send({username: 'Susan', email: 'susan@yahoo.ca', password: 'password'})
  //     .end((err, res) => {
  //       chai.expect(res.status).to.equal(201)
  //       done()
  //     })
  // })
 
  let cookies;
  it('should login successfully', (done) => {
    chai
      .request('http://localhost:3001')
      .post('/auth/login')
      .send({ email: 'susan@yahoo.ca', password: 'password'})
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        cookies = res.headers['set-cookie'].pop().split(';')[0];
        console.log(cookies)
        done()
    })
  })
  
  it('should get a user data', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/auth/user/')
      .set('Cookie', cookies)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        res.body.success.user.username.should.have
          .eql("Susan");
        console.log(res.body.success.user)
        done()
    })
  })
});
