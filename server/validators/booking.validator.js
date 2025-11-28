const { body, param, query, validationResult } = require('express-validator');
const stationService = require('../services/stations.service');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// Create booking validation
const validateCreateBooking = [
  body('stationId')
    .isInt({ min: 1 })
    .withMessage('Valid station ID is required')
    .custom((value) => {
      const station = stationService.getStationById(value);
      if (!station) {
        throw new Error('Station not found');
      }
      return true;
    }),
  body('scheduledStart')
    .isISO8601()
    .withMessage('Scheduled start must be a valid date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Scheduled start must be in the future');
      }
      return true;
    }),
  
  body('scheduledEnd')
    .isISO8601()
    .withMessage('Scheduled end must be a valid date')
    .custom((value, { req }) => {
      if (req.body.scheduledStart && new Date(value) <= new Date(req.body.scheduledStart)) {
        throw new Error('Scheduled end must be after scheduled start');
      }
      return true;
    }),
  
  body('estimatedDuration')
    .isInt({ min: 15, max: 1440 }) // 15 minutes to 24 hours
    .withMessage('Estimated duration must be between 15 and 1440 minutes'),
  
  handleValidationErrors
];

// Booking ID validation
const validateBookingId = [
  param('bookingId')
    .isMongoId()
    .withMessage('Valid booking ID is required'),
  
  handleValidationErrors
];

// Pagination and filtering validation
const validateGetBookings = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
    .toInt(),
  
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'active', 'completed', 'cancelled', 'expired'])
    .withMessage('Invalid status filter'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'scheduledStart', 'scheduledEnd', 'updatedAt'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('fromDate')
    .optional()
    .isISO8601()
    .withMessage('From date must be a valid date'),
  
  query('toDate')
    .optional()
    .isISO8601()
    .withMessage('To date must be a valid date')
    .custom((value, { req }) => {
      if (req.query.fromDate && new Date(value) < new Date(req.query.fromDate)) {
        throw new Error('To date must be after from date');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Start charging session validation
const validateStartCharging = [
  param('bookingId')
    .isMongoId()
    .withMessage('Valid booking ID is required'),
  
  body('initialBatteryLevel')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Initial battery level must be between 0 and 100'),
  
  body('connectorId')
    .optional()
    .isMongoId()
    .withMessage('Valid connector ID is required'),
  
  handleValidationErrors
];

// Complete charging session validation
const validateCompleteCharging = [
  param('bookingId')
    .isMongoId()
    .withMessage('Valid booking ID is required'),
  
  body('finalBatteryLevel')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Final battery level must be between 0 and 100'),
  
  body('energyConsumed')
    .isFloat({ min: 0 })
    .withMessage('Energy consumed must be a positive number'),
  
  body('totalCost')
    .isFloat({ min: 0 })
    .withMessage('Total cost must be a positive number'),
  
  handleValidationErrors
];

// Stats validation
const validateStats = [
  query('period')
    .optional()
    .isIn(['day', 'week', 'month', 'year', 'custom'])
    .withMessage('Period must be day, week, month, year, or custom'),
  
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.query.startDate && new Date(value) < new Date(req.query.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  handleValidationErrors
];

module.exports = {
  validateCreateBooking,
  validateBookingId,
  validateGetBookings,
  validateStartCharging,
  validateCompleteCharging,
  validateStats,
  handleValidationErrors
};