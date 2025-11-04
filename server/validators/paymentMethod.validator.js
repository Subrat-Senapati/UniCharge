const { body } = require("express-validator");

exports.paymentMethodValidation = [
  body("type")
    .isIn(["upi", "card"])
    .withMessage("Payment type must be either 'upi' or 'card'"),

  // Conditional validation for UPI
  body("upiId")
    .if(body("type").equals("upi"))
    .notEmpty()
    .withMessage("UPI ID is required for UPI payment")
    .matches(/^[\w.\-_]{2,}@[a-zA-Z]{2,}$/)
    .withMessage("Invalid UPI ID format (example: name@bank)"),

  // Conditional validation for Card
  body("card.cardNumberMasked")
    .if(body("type").equals("card"))
    .isLength({ min: 4, max: 4 })
    .withMessage("Card number (masked) must be exactly 4 digits")
    .matches(/^[0-9]{4}$/)
    .withMessage("Card number must contain only digits"),

  body("card.cardHolder")
    .if(body("type").equals("card"))
    .notEmpty()
    .withMessage("Card holder name is required"),

  body("card.expiryMonth")
    .if(body("type").equals("card"))
    .isInt({ min: 1, max: 12 })
    .withMessage("Expiry month must be between 1 and 12"),

  body("card.expiryYear")
    .if(body("type").equals("card"))
    .isInt({ min: 24, max: 50 })
    .withMessage("Expiry year must be valid (e.g., 25, 26, 27...)"),

  body("isDefault").optional().isBoolean(),
];