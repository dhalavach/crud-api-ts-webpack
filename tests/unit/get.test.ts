const request = require('supertest');
const { server } = require('./../../src/index');

describe('GET Endpoint', () => {
  it('should get all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
  });
});
server.close()