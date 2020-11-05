const auth = require("./auth")
const status = require("./status")
const role = require("./role")
module.exports = {
  generateToken: Auth,
  status,
  role,
}