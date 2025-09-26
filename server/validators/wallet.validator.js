const { body } = require("express-validator");

// 🔹 Add Money (Create Razorpay Order)
exports.addMoneyValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),
];

// 🔹 Verify Payment (Razorpay response)
exports.verifyPaymentValidation = [
  body("razorpay_order_id").notEmpty().withMessage("Order ID is required"),
  body("razorpay_payment_id").notEmpty().withMessage("Payment ID is required"),
  body("razorpay_signature").notEmpty().withMessage("Signature is required"),
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
];

// 🔹 Spend from Wallet
exports.spendValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];