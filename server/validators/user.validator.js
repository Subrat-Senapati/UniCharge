const { body, validationResult } = require("express-validator");

// Validation rules
const registerValidation = [
  body("fullName")
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),
  body("email")
    .isEmail().withMessage("Valid email is required"),
  body("phoneNumber")
    .isMobilePhone().withMessage("Valid phone number is required"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];

// Middleware to check errors
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { registerValidation, loginValidation, validate };
