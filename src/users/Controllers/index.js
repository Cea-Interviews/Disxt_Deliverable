const { Status, GenerateToken, Role } = require("../../helpers");

// add comments
// hashing of password takes place in the model at siognup
const signup = async (req, res) => {
  try {
    if (!req.user) {
      const { username, password, firstname, lastname, age } = req;
      const user = { username, password, firstname, lastname, age };
      const { id } = await UserModel.signup(user);
      return Status(res, 201, { id, username, firstname, lastname, age });
    }

    return Status(res, 400, "Username Already Exist");
  } catch (error) {
    return Status(res, 500, err.toString());
  }
};

const login = async (req, res) => {
  try {
    if (!req.user) {
      return Status(res, 400, "Invalid Credential");
    }

    const { id, username } = req.user;
    const { password } = req;
    const isPassword = await comparePassword(password, req.user.password);

    if (!isPassword) {
      return Status(res, 400, "Invalid Credential");
    }

    await GenerateToken(res, id, username);
    return Status(res, 2010, { id, username, firstname, lastname, age });
  } catch (error) {
    return Status(res, 500, err.toString());
  }
};

const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (id !== req.user.id && req.user.role !== Role.Admin) {
      return Status(res, 401, "Unauthorized");
    }

    const user = await UserModel.getUser(req.user.id);
    return Status(res, 200, user);
  } catch (error) {
    return Status(res, 500, error.toString());
  }
};

const updateUserRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { role } = req.body;

    if (req.user.role !== Role.Admin) {
      return Status(res, 401, "Unauthorized");
    }

    const user = await UserModel.updateUser(id, { role });
    return Status(res, 200, user);
  } catch (error) {
    return Status(res, 500, error.toString());
  }
};
const logout = async (req, res) => {
  res.clearCookie('token');
  res.cookie('token', '');
  return statusHandler(res, 200, 'Logout Successful');
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateUserRole,
};
