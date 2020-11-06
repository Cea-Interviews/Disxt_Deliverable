const server = require('./index');

describe('index.js', () => {
    it('should listen on port', async () => {
        const res = await server.listen(3000)
        expect(res.listening).toEqual(true)
    })
})