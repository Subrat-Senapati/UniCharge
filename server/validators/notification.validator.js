const { body, param } = require("express-validator");

exports.addNotificationValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("message").notEmpty().withMessage("Message is required"),
  body("type")
    .optional()
    .isIn(["info", "alert", "promo", "transaction"])
    .withMessage("Invalid notification type"),
  body("expiresAt")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Expiry must be a valid date"),
];

exports.markReadValidation = [
  param("notificationId").notEmpty().withMessage("NotificationId is required"),
];