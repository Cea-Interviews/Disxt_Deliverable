const status = require("../helpers/status");
const userModel = require("../users/models");

checkUser = async (req, res, next) => {
  try {
    const result = await userModel.findOne({username: req.body.username || req.user.username});
    req.user = result
    next();
  } catch (error) {
    return status(res, 500, error.toString());
  }
};
module.exports = checkUser;
