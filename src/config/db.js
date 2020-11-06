const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { logger } = require("../utils");

dotenv.config();

const url = process.env.MONGO_URL;
const db = () => {
  return mongoose
    .connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => logger.error(err));
};
module.exports = db;
