const joi = require("joi");
const { name } = require("./userSchema");

const price = joi.number().integer().precision(3).positive();

const addProductSchema = joi.object().keys({
  name: name.max(100).required().trim().invalid('""'),
  description: name.required().max(500).trim().invalid(""),
  price: price.required(),
});

const updateProductSchema = joi.object().keys({
  name,
  description: name,
  price,
});

module.exports = {
  addProductSchema,
  updateProductSchema,
};
