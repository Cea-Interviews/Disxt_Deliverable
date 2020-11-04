const Status = require("../helpers/status");
const UserModel = require("../../users/Models");

checkUser = async (req, res, next) => {
  try {
    const result = await UserModel.getUserUsername(req.username);
    req.user = result
    next();
  } catch (error) {
    return Status(res, 500, error.toString());
  }
};
module.exports = checkUser;
