const { registerUser, loginUser } = require("../services/user.service");

async function register(req, res) {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { user, token } = await loginUser(req.body);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function profile(req, res) {
  res.json({ user: req.user }); // user from JWT
}

module.exports = { register, login, profile };