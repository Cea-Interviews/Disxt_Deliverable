require('dotenv').config();
const server = require('./api/server');
const { default: logger } = require('./uils/logger');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => logger.info(`Server started at port ${PORT}...`));