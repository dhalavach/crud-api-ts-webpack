const request = require('supertest');
// const { server } = require('./../../src/server');

const userToUpdate = {
  id: 'b692d879-0f49-4d4a-ad82-e3262729c852',
  username: 'jane doe',
  age: 35,
  hobbies: ['swimming'],
};

describe('PUT /api/users/user', function () {
  it('responds with code 200 after valid PUT request', function (done) {
    request('http://localhost:5000')
      .put(`/api/users/${userToUpdate.id}`)
      .send({
        username: 'john',
        age: 20,
        hobbies: ['testing PUT requests'],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err: any, res: any) {
        if (err) return done(err);
        return done();
      });
  });
});
