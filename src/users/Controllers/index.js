const { status, generateToken, roles } = require("../../helpers");
const userModel = require("../models");

const signup = async (req, res) => {
  try {
    if (!req.user) {
      const { username, password, firstname, lastname, age } = req.body;
      const user = await userModel.create({
        username,
        password,
        firstname,
        lastname,
        age,
      });
      const { id } = user;
      return status(res, 201, { id, username, firstname, lastname, age });
    }
    return status(res, 400, "Username Already Exist");
  } catch (error) {
    return status(res, 500, err.toString());
  }
};

const login = async (req, res) => {
  try {
    if (!req.user) {
      return status(res, 400, "Invalid Credential");
    }

    const { id, username } = req.user;
    const { password } = req.body;
    const user = new userModel();
    const isPassword = await userModel.comparePassword(
      password,
      req.user.password
    );

    if (!isPassword) {
      return status(res, 400, "Invalid Credential");
    }
    await generateToken(res, id, username);
    return status(res, 200, { id, username });
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id !== req.user.id && req.user.role !== roles.Admin) {
      return status(res, 401, "Unauthorized");
    }
    const user = await userModel.findById(id).select("-password");
    if(!user){
      return status(res, 404, "User Not Found");
    }
    return status(res, 200, user);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const updateUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    if (req.user.role !== roles.Admin) {
      return status(res, 401, "Unauthorized");
    }
    const user = await userModel
      .findByIdAndUpdate(id, { $set: { role } }, { new: true })
      .select("-password");
    return status(res, 200, user);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};
const logout = async (req, res) => {
  res.clearCookie("token");
  res.cookie("token", "");
  return status(res, 200, "Logout Successful");
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateUserRole,
};
