const express = require("express");
const router = express.Router();
const { register, login, profile, logout } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth");
const { registerValidation, loginValidation, validate } = require("../validators/user.validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Public
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

// Google login start
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ user: req.user, token });
  }
);

// Protected
router.get("/profile", authMiddleware, profile);

router.post("/logout", logout);

module.exports = router;