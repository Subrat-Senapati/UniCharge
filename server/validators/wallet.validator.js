const { body } = require("express-validator");

const validateCreateOrder = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be numeric")
    .custom((v) => v > 0)
    .withMessage("Amount must be greater than 0"),
];

const validateVerifyPayment = [
  body("razorpay_order_id").notEmpty().withMessage("Order ID is required"),
  body("razorpay_payment_id").notEmpty().withMessage("Payment ID is required"),
  body("razorpay_signature").notEmpty().withMessage("Signature is required"),
  body("amount").isNumeric().withMessage("Amount must be numeric"),
];

module.exports = { validateCreateOrder, validateVerifyPayment };