const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authMiddleware } = require("../middleware/auth");
const {
  validateCreateBooking,
  validateBookingId,
  validateGetBookings,
  validateStartCharging,
  validateCompleteCharging,
  validateStats
} = require('../validators/booking.validator');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create a new booking
router.post('/', validateCreateBooking, bookingController.createBooking);

// Get user's bookings with pagination
router.get('/', validateGetBookings, bookingController.getUserBookings);

// Get booking statistics
router.get('/stats', validateStats, bookingController.getBookingStats);

// Get specific booking
router.get('/:bookingId', validateBookingId, bookingController.getBookingById);

// Cancel booking
router.put('/:bookingId/cancel', validateBookingId, bookingController.cancelBooking);

// Start charging session
router.put('/:bookingId/start', validateStartCharging, bookingController.startChargingSession);

// Complete charging session
router.put('/:bookingId/complete', validateCompleteCharging, bookingController.completeChargingSession);

module.exports = router;