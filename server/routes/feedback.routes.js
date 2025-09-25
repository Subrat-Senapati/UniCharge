const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const { validateFeedback } = require("../validators/feedback.validator");

// POST - submit feedback
router.post("/", validateFeedback, feedbackController.submitFeedback);

// GET - all feedbacks
router.get("/", feedbackController.getFeedbacks);

// GET - single feedback by ID
router.get("/:id", feedbackController.getFeedback);

// PATCH - update feedback status (e.g., "resolved")
router.patch("/:id", feedbackController.updateFeedback);

module.exports = router;