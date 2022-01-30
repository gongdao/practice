const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require('supertest');
const should = require('should');

chai.use(chaiHttp);

describe("/Profile CRUD", () => {
  
 
  let cookies;
  it('should login successfully', (done) => {
    chai
      .request('http://localhost:3001')
      .post('/auth/login')
      .send({ email: 'bob@yahoo.ca', password: 'password'})
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        cookies = res.headers['set-cookie'].pop().split(';')[0];
        console.log(cookies)
        done()
      })
  })
  
    // it('should create a profile successfully', (done) => {
    //   const u = {
    //     user: "61f58f2574d7fe4e5fd7ea70",
    //     firstname: "bob",
    //     lastname: "joe",
    //     description: "no",
    //     availability: "now",
    //     telephone: "1-416-222-1234",
    //     address: "123 Kennedy Road",
    //     imgurl:"http://img.com/hatchways/001"
    //   }
    //   chai
    //     .request('http://localhost:3001')
    //     .post('/profile/create')
    //     .send(u)
    //     .set('Cookie', cookies)
    //     .end((err, res) => {
    //       chai.expect(res.status).to.equal(201)
    //       done()
    //   })
    // })
  
  it('should get user session for current user', (done) => {
    var req = request('http://localhost:3001').get('/auth/login');
    // Set cookie to get saved user session
    req.cookies = cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  })

  it('should get a profile by id successfully', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/profile/mid/' + '61f5eee13039f2dc09fe04af')
      .set('Cookie', cookies)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        console.log(res.body)
        done()
    })
  })

  it('should modify a profile by id successfully', (done) => {
    const u = {
      user: "61f58f2574d7fe4e5fd7ea70",
      firstname: "bob",
      lastname: "joe",
      description: "no",
      availability: "now",
      telephone: "1-416-222-1234",
      address: "123 Kennedy Road",
      imgurl:"http://img.com/hatchways/002"
    }
    chai
      .request('http://localhost:3001')
      .put('/profile/mid/' + '61f5eee13039f2dc09fe04af')
      .send(u)
      .set('Cookie', cookies)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        console.log(res.body)
        done()
    })
  })

  // it('should delete a profile by id successfully', (done) => {
  //   const u = {
  //     user: "61f58f2574d7fe4e5fd7ea70",
  //     firstname: "bob",
  //     lastname: "joe",
  //     description: "no",
  //     availability: "now",
  //     telephone: "1-416-222-1234",
  //     address: "123 Kennedy Road",
  //     imgurl:"http://img.com/hatchways/002"
  //   }
  //   chai
  //     .request('http://localhost:3001')
  //     .delete('/profile/mid/' + '61f5eee13039f2dc09fe04af')
  //     .send(u)
  //     .set('Cookie', cookies)
  //     .end((err, res) => {
  //       chai.expect(res.status).to.equal(204)
  //       console.log(res.body)
  //       done()
  //   })
  //})

  it('should list profile successfully', (done) => {
    chai
      .request('http://localhost:3001')
      .get('/profile/list')
      .set('Cookie', cookies)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200)
        console.log(res.body[0])
        done()
    })
  })
});
