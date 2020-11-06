const joi = require("joi");
const { status } = require("../helpers");
const { userSchema, productSchema } = require("../helpers");

const validate = async (value, scheme, res, next) => {
  const { error } = await scheme.validate(value, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    const errMsg = [];
    for (let i = 0; i < error.details.length; i++) {
      let message = error.details[i].message.replace(/\"/g, "");
      errMsg.push(message);
    }
    return status(res, 400, errMsg);
  }
  next();
};

const validateId = (req, res, next) => {
  return validate(req.params.id, userSchema.id, res, next);
};

const validateLogin = (req, res, next) => {
  return validate(req.body, userSchema.loginSchema, res, next);
};

const validateRegister = (req, res, next) => {
  return validate(req.body, userSchema.registerSchema, res, next);
};

const validateRole = (req, res, next) => {
  return validate(req.body.role, userSchema.updateRoleSchema, res, next);
};

const validateAddProduct = (req, res, next) => {
  return validate(req.body, productSchema.addProductSchema, res, next);
};

const validateUpdateProduct = (req, res, next) => {
  return validate(req.body, productSchema.updateProductSchema, res, next);
};

module.exports = {
  validateId,
  validateLogin,
  validateRegister,
  validateRole,
  validateAddProduct,
  validateUpdateProduct,
};
