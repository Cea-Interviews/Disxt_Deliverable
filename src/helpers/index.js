const Auth = require("./auth")
const Status = require("./status")
const Role = require("./role")
module.exports = {
  GenerateCookie: Auth.GenerateCookie,
  GenerateToken: Auth.GenerateToken,
  Status,
  Role,
}