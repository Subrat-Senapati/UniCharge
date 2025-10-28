const User = require("../models/UserSchema");
const { hashPassword, comparePassword } = require("../utils/password");
const jwt = require("jsonwebtoken");

async function registerUser({ fullName, email, phoneNumber, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    passwordHash,
    authProvider: "local",
  });

  const token = jwt.sign({ id: user._id, email: user.email.toLowerCase() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email, authProvider: "local" });
  if (!user) throw new Error("User not found");

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ id: user._id, email: user.email.toLowerCase() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
}

const userProfile = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  return user;
};

module.exports = { registerUser, loginUser, userProfile };