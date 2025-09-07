const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth");

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/me", authMiddleware, profile);

module.exports = router;