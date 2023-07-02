const request = require('supertest');
// const { server } = require('./../../src/server');

const userToDelete = {
  id: 'cdc82f7f-be13-413b-92d5-0446c228973d',
  username: 'Karl',
  age: 50,
  hobbies: ['stock market speculation'],
};

describe('PUT /api/users/user', function () {
  it('responds with code 204 after valid DELETE request', function (done) {
    request('http://localhost:5000')
      .delete(`/api/users/${userToDelete.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(204)
      .end(function (err: any, res: any) {
        if (err) return done(err);
        return done();
      });
  });
});
