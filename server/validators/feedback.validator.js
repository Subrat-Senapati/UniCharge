const { body } = require("express-validator");

exports.validateFeedback = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("subject")
    .notEmpty().withMessage("Subject is required")
    .isLength({ max: 150 }).withMessage("Subject must be under 150 characters"),
  body("review")
    .notEmpty().withMessage("Review is required")
    .isLength({ min: 5, max: 2000 }).withMessage("Review must be 5–2000 characters"),
];