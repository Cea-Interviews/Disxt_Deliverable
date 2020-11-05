const status = require("../helpers/status");
const userModel = require("../../users/Models");

checkUser = async (req, res, next) => {
  try {
    const result = await userModel.getUserUsername(req.username);
    req.user = result
    next();
  } catch (error) {
    return Status(res, 500, error.toString());
  }
};
module.exports = checkUser;
