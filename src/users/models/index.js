const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, default: "client" },
  password: { type: String, required: true },
}, { versionKey: false});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (
    (await userModel.find()).length === 0 &&
    this.password.startsWith(process.env.ADMIN_LOGIN)
  ) {
    this.role = "admin";
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});
userSchema.statics.comparePassword = async(password,hashpassword) => {
  const user = await bcrypt.compare(password, hashpassword);
  return user ? this : null;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
