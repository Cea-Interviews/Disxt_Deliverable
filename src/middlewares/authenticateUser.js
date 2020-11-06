const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {status} = require('../helpers');

dotenv.config();
const authenticate = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return status(res, 401, 'You need to Login');
    }
    const decrypt = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = {
      id: decrypt.sub,
      username: decrypt.username
    };
    next();
  } catch (err) {
    return status(res, 500, err.toString());
  }
};

module.exports = authenticate