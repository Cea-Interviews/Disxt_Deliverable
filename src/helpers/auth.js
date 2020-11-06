const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const generateToken = async (res, sub, username) => {
  const secret = process.env.ACCESS_SECRET;
 const expiration = 604800000
  const token = jwt.sign({ sub, username }, secret, { expiresIn: "30d" });
  return await res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
};
module.exports = generateToken;
