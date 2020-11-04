const express = require("express");
const user = require("./Controllers");
const validations = require("../middlewares");
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router();

router.get('/signup', validations.CheckUser, user.signup)
router.get('/login', validations.CheckUser, user.login)