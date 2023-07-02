const request = require('supertest');
// const { server } = require('./../../src/server');

describe('GET Endpoint', () => {
  it('should get all users', async () => {
    const res = await request('http://localhost:5000').get('/api/users');
    expect(res.statusCode).toEqual(200);
  });
});
