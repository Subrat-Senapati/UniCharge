const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stationId: {
    type: Number, // Changed from ObjectId to Number to match CSV station IDs
    required: true
  },
  vehicleId: {
    type: String,
    required: false
  },
  scheduledStart: {
    type: Date,
    required: true
  },
  scheduledEnd: {
    type: Date,
    required: true
  },
  actualStart: {
    type: Date
  },
  actualEnd: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'expired'],
    default: 'pending'
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: true
  },
  initialBatteryLevel: {
    type: Number, // percentage
    min: 0,
    max: 100
  },
  finalBatteryLevel: {
    type: Number, // percentage
    min: 0,
    max: 100
  },
  energyConsumed: {
    type: Number, // in kWh
    min: 0
  },
  totalCost: {
    type: Number, // in rupees
    min: 0
  },
  estimatedCost: {
    type: Number, // in rupees
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String
  }
}, {
  timestamps: true
},
  {
    versionKey: false,
  }
);

// Index for efficient queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ stationId: 1, status: 1 });
bookingSchema.index({ scheduledStart: 1, scheduledEnd: 1 });

// Virtual for duration
bookingSchema.virtual('duration').get(function () {
  if (this.actualStart && this.actualEnd) {
    return (this.actualEnd - this.actualStart) / (1000 * 60); // in minutes
  }
  return null;
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function () {
  const now = new Date();
  const timeUntilStart = this.scheduledStart - now;
  const hoursUntilStart = timeUntilStart / (1000 * 60 * 60);

  return ['pending', 'confirmed'].includes(this.status) && hoursUntilStart > 1;
};

// Static method to find conflicting bookings
bookingSchema.statics.findConflictingBookings = function (stationId, startTime, endTime, excludeBookingId = null) {
  const query = {
    stationId,
    status: { $in: ['pending', 'confirmed', 'active'] },
    $or: [
      {
        scheduledStart: { $lt: endTime },
        scheduledEnd: { $gt: startTime }
      }
    ]
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  return this.find(query);
};

module.exports = mongoose.model('Booking', bookingSchema);