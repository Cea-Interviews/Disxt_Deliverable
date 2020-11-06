const bcrypt = require("bcryptjs");
const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  created_by: { type: ObjectID, required:true, 'ref': "user" }
},{ versionKey: false});

module.exports = mongoose.model("products", productSchema);