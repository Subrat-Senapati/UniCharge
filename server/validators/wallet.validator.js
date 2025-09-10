const { body, param } = require("express-validator");

exports.addMoneyValidation = [
  body("amount").isInt({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("userId").notEmpty().withMessage("UserId is required"),
];

exports.spendValidation = [
  body("amount").isInt({ gt: 0 }).withMessage("Amount must be greater than 0"),
  body("userId").notEmpty().withMessage("UserId is required"),
];

exports.balanceValidation = [
  param("userId").notEmpty().withMessage("UserId is required"),
];