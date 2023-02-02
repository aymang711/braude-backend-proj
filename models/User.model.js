const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// a method to hash the passwords of the users
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("all fields must be filled");
  const user = await this.findOne({ email });

  if (!user) throw Error("Incorrect email");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password");
};

// a method to hash the passwords of the users
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("all fields must be filled");
  if (!validator.isEmail(email)) throw Error("use a valid email");
  if (!validator.isStrongPassword(password)) throw Error("password not strong");

  const exist = await this.findOne({ email });

  if (exist) throw Error("Email already in use");
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });
  return user;
};

module.exports = mongoose.model("User", userSchema);
