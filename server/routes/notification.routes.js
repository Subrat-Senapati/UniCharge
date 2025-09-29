const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const { addNotificationValidation, markReadValidation } = require("../validators/notification.validator");

// Add a new notification
router.post(
  "/:userId",
  addNotificationValidation,
  notificationController.addNotification
);

// Get all active (non-expired) notifications
router.get("/:userId", notificationController.getNotifications);

// Mark as read
router.patch(
  "/:userId/:notificationId/read",
  markReadValidation,
  notificationController.markAsRead
);

// Delete notification
router.delete("/:userId/:notificationId", notificationController.deleteNotification);

module.exports = router;