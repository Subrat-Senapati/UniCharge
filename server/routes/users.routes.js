const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/user.controller");
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
    // Generate JWT for logged-in user
    const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user: req.user, token });
  }
);

// Protected
router.get("/me", authMiddleware, profile);

module.exports = router;