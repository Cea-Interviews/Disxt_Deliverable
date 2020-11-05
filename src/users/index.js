const express = require("express");
const user = require("./controllers");
const validations = require("../middlewares");
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router();

router.post('/auth/signup', validations.checkUser, user.signup)
router.post('/auth/login', validations.checkUser, user.login)
router.get('/auth/logout', validations.authenticate, user.logout)
router.get('/:id', validations.authenticate, validations.checkUser, user.getUser)
router.patch('/:id', validations.authenticate, validations.checkUser, user.updateUserRole)

module.exports = router