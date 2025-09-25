const { validationResult } = require("express-validator");
const feedbackService = require("../services/feedback.service");

exports.submitFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const feedback = await feedbackService.createFeedback(req.body);
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await feedbackService.getFeedbackById(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await feedbackService.updateFeedbackStatus(req.params.id, status);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback updated successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};