const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  afterAll(async()=>{
    server.close()
  })
  describe('index route', () => {
    it('should return an OK status code from the index route', async () => {
      const response = await request(server).get('/');
      expect(response.status).toEqual(200);
    });
    it('should return error message for non-existing endpiont', async () => {
      const response = await request(server).get('/api');
      expect(response.status).toEqual(404);
    });
  });
 
});