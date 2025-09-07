const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth");
const { registerValidation, loginValidation, validate } = require("../validators/user.validator");

// Public
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

// Protected
router.get("/me", authMiddleware, profile);

module.exports = router;