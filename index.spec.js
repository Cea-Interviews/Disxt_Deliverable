const request = require('supertest');
const server = require('./index');

describe('index.js', () => {
    it('should listen on port', async function(){
        const res = await server.listen(5000)
        expect(res.listening).toEqual(true)
    })
   
})