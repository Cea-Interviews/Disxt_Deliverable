const express = require("express");
const products = require("./ontrollers");
const validations = require("../middlewares");
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router();

router.get('/', validations.authenticate, products.getAll())
router.get('/:productId', validations.authenticate, products.getSingle())
router.post('/', validations.authenticate, validations.checkUser, products.addProduct())
router.put('/:productId', validations.authenticate, validations.checkUser, products.updateProduct())
router.delete('/:productId', validations.authenticate, validations.checkUser, products.deleteProduct())

module.exports = router