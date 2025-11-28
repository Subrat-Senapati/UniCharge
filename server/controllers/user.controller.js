const { registerUser, loginUser , userProfile} = require("../services/user.service");

async function register(req, res) {
  try {
    const { user, token } = await registerUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { user, token } = await loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    });

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const profile = async (req, res) => {
  try {
    const user = await userProfile(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
}

module.exports = { register, login, profile, logout };