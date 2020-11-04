const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('../users/index');


const server = express();
server.use(express.json());
server.use(
  cors({
    origin: [
      `${process.env.FRONT_URL}`
],
    credentials: true
  })
);
server.use(cookieParser());
server.use(helmet());
server.use(express.urlencoded({ extended: true }));

server.use(compression());
server.use(logger('dev'));

server.get('/', (req, res) =>
  res.status(200).json({
    status: 200,
    message: 'Dixst Deliverable is up ...'
  })
);

server.use('/api', userRouter);
server.use('/api', productsRouter);

server.use('*', (req, res) =>
  res.status(404).json({
    status: 404,
    message: 'No endpoint matches that URL.'
  })
);

module.exports = server;