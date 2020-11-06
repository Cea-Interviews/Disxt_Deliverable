const express = require("express");
const user = require("./controllers");
const middlewares = require("../middlewares");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

router.post(
  "/auth/signup",
  middlewares.validations.validateRegister,
  middlewares.checkUser,
  user.signup
);
router.post(
  "/auth/login",
  middlewares.validations.validateLogin,
  middlewares.checkUser,
  user.login
);
router.get("/auth/logout", middlewares.authenticate, user.logout);
router.get(
  "/users/:id",
  middlewares.validations.validateId,
  middlewares.authenticate,
  middlewares.checkUser,
  user.getUser
);
router.patch(
  "/users/:id",
  middlewares.validations.validateId,
  middlewares.validations.validateRole,
  middlewares.authenticate,
  middlewares.checkUser,
  user.updateUserRole
);

module.exports = router;
