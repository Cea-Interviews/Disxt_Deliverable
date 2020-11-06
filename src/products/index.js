const express = require("express");
const products = require("./controllers");
const middlewares = require("../middlewares");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

router.get(
  "/",
  middlewares.authenticate,
  middlewares.checkUser,
  products.getAll
);
router.get(
  "/:productId",
  middlewares.validations.validateId,
  middlewares.authenticate,
  middlewares.checkUser,
  products.getSingle
);
router.post(
  "/",
  middlewares.validations.validateAddProduct,
  middlewares.authenticate,
  middlewares.checkUser,
  products.addProduct
);
router.put(
  "/:productId",
  middlewares.validations.validateId,
  middlewares.validations.validateUpdateProduct,
  middlewares.authenticate,
  middlewares.checkUser,
  products.updateProduct
);
router.delete(
  "/:productId",
  middlewares.validations.validateId,
  middlewares.authenticate,
  middlewares.checkUser,
  products.deleteProduct
);

module.exports = router;
