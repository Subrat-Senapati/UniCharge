const { validationResult } = require("express-validator");
const notificationService = require("../services/notification.service");

exports.addNotification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { userId } = req.params;
    const updatedUser = await notificationService.addNotification(userId, req.body);

    return res.status(201).json({
      success: true,
      notifications: updatedUser.notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await notificationService.getNotifications(userId);

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { userId, notificationId } = req.params;
    await notificationService.markAsRead(userId, notificationId);

    return res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { userId, notificationId } = req.params;
    await notificationService.deleteNotification(userId, notificationId);

    return res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};