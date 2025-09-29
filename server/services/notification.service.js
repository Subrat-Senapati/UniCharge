const User = require("../models/UserSchema");

const addNotification = async (userId, data) => {
  return User.findByIdAndUpdate(
    userId,
    {
      $push: {
        notifications: {
          title: data.title,
          message: data.message,
          type: data.type || "info",
          expiresAt: data.expiresAt,
        },
      },
    },
    { new: true }
  );
};

const getNotifications = async (userId) => {
  const user = await User.findById(userId).select("notifications");
  if (!user) return [];
  // filter out expired
  return user.notifications.filter(
    (n) => !n.expiresAt || n.expiresAt > new Date()
  );
};

const markAsRead = async (userId, notificationId) => {
  return User.updateOne(
    { _id: userId, "notifications._id": notificationId },
    { $set: { "notifications.$.isRead": true } }
  );
};

const deleteNotification = async (userId, notificationId) => {
  return User.findByIdAndUpdate(userId, {
    $pull: { notifications: { _id: notificationId } },
  });
};

module.exports = {
  addNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};