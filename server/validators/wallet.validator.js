const { body } = require("express-validator");

exports.validateCreateOrder = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be numeric")
    .custom((v) => v > 0)
    .withMessage("Amount must be greater than 0"),
];

exports.validateVerifyPayment = [
  body("razorpay_order_id").notEmpty().withMessage("Order ID is required"),
  body("razorpay_payment_id").notEmpty().withMessage("Payment ID is required"),
  body("razorpay_signature").notEmpty().withMessage("Signature is required"),
  body("amount").isNumeric().withMessage("Amount must be numeric"),
];

exports.spendValidator = [
  body("amount").isFloat({ gt: 0 }).withMessage("Invalid amount"),
  body("description").optional().isString(),
];