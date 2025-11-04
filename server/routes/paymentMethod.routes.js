const express = require("express");
const router = express.Router();
const paymentMethodController = require("../controllers/paymentMethod.controller");
const { paymentMethodValidation } = require("../validators/paymentMethod.validator");
const { authMiddleware } = require("../middleware/auth");
const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      })),
    });
  }
  next();
};

// Get all payment methods
router.get("/", authMiddleware, paymentMethodController.getPaymentMethods);

// Add new payment method
router.post(
  "/",
  authMiddleware,
  paymentMethodValidation,
  validate,
  paymentMethodController.addPaymentMethod
);

// Update payment method
router.put(
  "/:methodId",
  authMiddleware,
  paymentMethodValidation,
  validate,
  paymentMethodController.updatePaymentMethod
);

// Delete payment method
router.delete("/:methodId", authMiddleware, paymentMethodController.deletePaymentMethod);

// Set default payment method
router.put(
  "/:methodId/default",
  authMiddleware,
  paymentMethodController.setDefaultPaymentMethod
);

module.exports = router;