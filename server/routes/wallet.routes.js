const express = require("express");
const { validationResult } = require("express-validator");
const {
  handleGetWallet,
  handleCreateRazorpayOrder,
  handleVerifyRazorpayPayment,
} = require("../controllers/wallet.controller");
const {
  validateCreateOrder,
  validateVerifyPayment,
} = require("../validators/wallet.validator");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// ✅ Routes
router.get("/", authMiddleware, handleGetWallet);

router.post(
  "/create-order",
  authMiddleware,
  validateCreateOrder,
  validateRequest,
  handleCreateRazorpayOrder
);

router.post(
  "/verify-payment",
  authMiddleware,
  validateVerifyPayment,
  validateRequest,
  handleVerifyRazorpayPayment
);

module.exports = router;