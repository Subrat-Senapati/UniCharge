const express = require("express");
const { validationResult } = require("express-validator");
const walletController = require("../controllers/wallet.controller");
const {
  validateCreateOrder,
  validateVerifyPayment,
  spendValidator,
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
router.get("/", authMiddleware, walletController.handleGetWallet);

router.post(
  "/create-order",
  authMiddleware,
  validateCreateOrder,
  validateRequest,
  walletController.handleCreateRazorpayOrder
);

router.post(
  "/verify-payment",
  authMiddleware,
  validateVerifyPayment,
  validateRequest,
  walletController.handleVerifyRazorpayPayment
);

router.post("/spend", authMiddleware, spendValidator, validateRequest, walletController.spend);

// GET all transactions
router.get("/history", authMiddleware, walletController.getPaymentHistory);

module.exports = router;