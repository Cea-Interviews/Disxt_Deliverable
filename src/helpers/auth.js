const jwt  = require("jsonwebtoken")


async const generateToken =(res, sub, username) => {
  const secret = process.env.ACCESS_SECRET
  const token = jwt.sign({sub, username},  secret , {expiresIn: "15min" });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
}
module.export = {
 generateToken
}