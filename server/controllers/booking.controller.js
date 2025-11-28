const Booking = require('../models/BookingSchema');
const stationService = require('../services/stations.service');
const walletService = require('../services/wallet.service');

const bookingController = {

  // ===========================
  // Create a new booking
  // ===========================
  createBooking: async (req, res) => {
    try {
      const { stationId, vehicleId, scheduledStart, scheduledEnd, estimatedDuration, estimatedCost } = req.body;
      const userId = req.user.id;

      const conflictingBooking = await Booking.findConflictingBookings(
        stationId,
        new Date(scheduledStart),
        new Date(scheduledEnd)
      );

      if (conflictingBooking.length > 0) {
        return res.status(409).json({ error: 'Time slot not available - conflicting booking exists' });
      }

      const booking = new Booking({
        userId,
        stationId: parseInt(stationId),
        vehicleId,
        scheduledStart: new Date(scheduledStart),
        scheduledEnd: new Date(scheduledEnd),
        estimatedDuration,
        estimatedCost,
        status: 'confirmed'
      });

      await booking.save();

      res.status(201).json({
        message: 'Booking created successfully',
        booking
      });

    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  // ===========================
  // Get user bookings
  // ===========================
  getUserBookings: async (req, res) => {
    try {
      const userId = req.user.id;

      const {
        page = 1,
        limit = 10,
        status,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        fromDate,
        toDate
      } = req.query;

      const filter = { userId };
      if (status) filter.status = status;
      if (fromDate || toDate) {
        filter.createdAt = {};
        if (fromDate) filter.createdAt.$gte = new Date(fromDate);
        if (toDate) filter.createdAt.$lte = new Date(toDate);
      }

      const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

      const bookings = await Booking.find(filter)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit);

      res.json({
        bookings,
        pagination: {
          current: Number(page),
          pages: Math.ceil(await Booking.countDocuments(filter) / limit),
          total: await Booking.countDocuments(filter)
        }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  // ===========================
  // Get booking by ID
  // ===========================
  getBookingById: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const userId = req.user.id;

      const booking = await Booking.findOne({ _id: bookingId, userId });
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      res.json({ booking });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  },

  // ===========================
  // Cancel booking
  // ===========================
  cancelBooking: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const userId = req.user.id;

      const booking = await Booking.findOne({ _id: bookingId, userId });
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      if (!booking.canBeCancelled()) {
        return res.status(400).json({ error: `Cannot cancel booking. Status: ${booking.status}` });
      }

      booking.status = 'cancelled';
      booking.cancelledAt = new Date();
      await booking.save();

      res.json({ message: 'Booking cancelled', booking });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to cancel booking' });
    }
  },

  // ===========================
  // Start charging
  // ===========================
  startChargingSession: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { initialBatteryLevel } = req.body;
      const userId = req.user.id;

      const booking = await Booking.findOne({ _id: bookingId, userId });
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      if (booking.status !== 'confirmed') {
        return res.status(400).json({ error: `Cannot start session. Status: ${booking.status}` });
      }

      booking.status = 'active';
      booking.actualStart = new Date();
      booking.initialBatteryLevel = initialBatteryLevel;

      await booking.save();

      res.json({ message: 'Charging started', booking });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to start charging' });
    }
  },

  // ===========================
  // Complete charging + deduct wallet
  // ===========================
  completeChargingSession: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { finalBatteryLevel, energyConsumed, totalCost } = req.body;
      const userId = req.user.id;

      const booking = await Booking.findOne({ _id: bookingId, userId });
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      if (booking.status !== 'active') {
        return res.status(400).json({ error: `Cannot complete. Status: ${booking.status}` });
      }

      // Deduct money
      await walletService.spendFromWallet(userId, totalCost, "Charging session payment");

      booking.status = 'completed';
      booking.actualEnd = new Date();
      booking.finalBatteryLevel = finalBatteryLevel;
      booking.energyConsumed = energyConsumed;
      booking.totalCost = totalCost;
      booking.amountDeducted = totalCost;
      booking.paymentStatus = 'paid';

      await booking.save();

      res.json({
        message: 'Charging completed & money deducted successfully',
        booking
      });

    } catch (err) {
      console.error('Complete charging error:', err);
      res.status(500).json({ error: 'Failed to complete charging session' });
    }
  },

  // ===========================
  // Booking stats
  // ===========================
  getBookingStats: async (req, res) => {
    try {
      const { period, startDate, endDate } = req.query;

      let dateFilter = {};

      if (period && period !== "custom") {
        const now = new Date();
        let from;

        switch (period) {
          case "day":
            from = new Date(now.setHours(0, 0, 0, 0));
            break;
          case "week":
            from = new Date(now.setDate(now.getDate() - 7));
            break;
          case "month":
            from = new Date(now.setMonth(now.getMonth() - 1));
            break;
          case "year":
            from = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        }

        dateFilter = { createdAt: { $gte: from } };
      }

      if (startDate && endDate) {
        dateFilter = {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        };
      }

      const stats = await Booking.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            totalRevenue: { $sum: "$totalCost" },
            totalEnergyConsumed: { $sum: "$energyConsumed" }
          }
        }
      ]);

      res.json({
        success: true,
        stats: stats[0] || {
          totalBookings: 0,
          totalRevenue: 0,
          totalEnergyConsumed: 0
        }
      });

    } catch (err) {
      console.error("Stats error:", err);
      res.status(500).json({ error: "Failed to fetch booking stats" });
    }
  }

};

module.exports = bookingController;