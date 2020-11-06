require('dotenv').config();
const server = require('./src/api/server');
const { logger } = require('./src/utils');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => logger.warn(`Server started at port ${PORT}...`));

module.exports = server

