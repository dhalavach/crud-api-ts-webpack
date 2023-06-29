const request = require('supertest');
const { server } = require('./../../src/index');

describe('POST /users', function () {
  it('responds with json after POST', function (done) {
    request(server)
      .post('/api/users')
      .send({
        username: 'john',
        age: 20,
        hobbies: ['testing POST requests'],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err: any, res: any) {
        if (err) return done(err);
        return done();
      });
  });
});
server.close();
