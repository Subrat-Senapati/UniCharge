const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const {
  addMoneyValidation,
  verifyPaymentValidation,
  spendValidation,
} = require("../validators/wallet.validator");
const { validationResult } = require("express-validator");

// Middleware to check validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ success: false, errors: errors.array() });
  next();
};

router.post("/create-order", addMoneyValidation, validate, walletController.createOrder);
router.post("/verify-payment", verifyPaymentValidation, validate, walletController.verifyPayment);
router.post("/spend", spendValidation, validate, walletController.spend);
router.get("/balance", walletController.getBalance);
router.get("/history", walletController.getHistory);

module.exports = router;