const { required } = require("joi");
const joi = require("joi");

const name = joi.string().trim().min(2).max(30).invalid("\"\"");

const age = joi.number().integer().positive().max(300).min(1).required();

const password = joi
  .string()
  .trim()
  .pattern(
    /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/,
    "6-15 characters, combination of numbers and letters"
  )
  .required();

const registerSchema = joi.object().keys({
  username: name.required(),
  firstname: name.required(),
  lastname: name.required(),
  age,
  password,
});
const loginSchema = joi.object().keys({
  username: name.required(),
  password,
});

const updateRoleSchema = joi
  .string()
  .label("role")
  .valid("admin", "client")
  .trim()
  .invalid("");
const id = name.label("id")
module.exports = {
  registerSchema,
  loginSchema,
  updateRoleSchema,
  name,
  id
};
