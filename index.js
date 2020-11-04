require('dotenv').config();
const server = require('./src/api/server');
const { logger } = require('./src/utils');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => logger.info(`Server started at port ${PORT}...`));

