const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { logger } = require("../utils");

dotenv.config();

const url = process.env.NODE_ENV==='test'? process.env.TEST_URL : process.env.MONGO_URL
const db = () => {
  return mongoose
    .connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => logger.error(err));
};

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;
    }
  }
}
module.exports = {db, removeAllCollections, dropAllCollections};
