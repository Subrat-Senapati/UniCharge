const Feedback = require("../models/FeedbackSchema");

exports.createFeedback = async (data) => {
  const feedback = new Feedback(data);
  return await feedback.save();
};

exports.getAllFeedbacks = async () => {
  return await Feedback.find().sort({ createdAt: -1 });
};

exports.getFeedbackById = async (id) => {
  return await Feedback.findById(id);
};

exports.updateFeedbackStatus = async (id, status) => {
  return await Feedback.findByIdAndUpdate(
    id,
    { status, updatedAt: Date.now() },
    { new: true }
  );
};