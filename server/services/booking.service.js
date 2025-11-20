const mongoose = require("mongoose");
const Booking = require("../models/BookingSchema");
const User = require("../models/UserSchema");

const {
  getStationById,
  getConnectorById,
  isStationAvailable,
  updateConnectorStatus
} = require("./stations.service");

/**
 * CREATE BOOKING
 */
const createBooking = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      userId,
      stationId,
      connectorId,
      vehicleId,
      scheduledStart,
      scheduledEnd,
      estimatedCost = 0,
      estimatedKwh = 0
    } = data;

    // Validate user
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");

    // Validate vehicle
    const vehicle = user.vehicles.id(vehicleId);
    if (!vehicle) throw new Error("Vehicle not found for user");

    // Fetch station from CSV cache
    const station = getStationById(stationId);
    if (!station) throw new Error("Charging station not found");

    // Fetch connector
    const connector = getConnectorById(stationId, connectorId);
    if (!connector) throw new Error("Connector not found");

    // Check availability
    if (!isStationAvailable(stationId, connectorId)) {
      throw new Error("Station or connector not available");
    }

    // Check wallet
    if (user.wallet.balance < estimatedCost) {
      throw new Error("Insufficient wallet balance");
    }

    // Deduct estimated cost
    user.wallet.balance -= estimatedCost;

    user.paymentHistory.push({
      type: "debit",
      amount: estimatedCost,
      method: "Wallet",
      description: `Charging booking at ${station.station}`,
      status: "completed",
      createdAt: new Date()
    });

    // Create booking
    const booking = new Booking({
      userId,
      stationId,
      connectorId,
      vehicleId,
      scheduledStart,
      scheduledEnd,
      estimatedCost,
      estimatedKwh,
      status: "confirmed",
      paymentStatus: "paid",

      stationDetails: {
        id: station.id,
        station: station.station,
        brand: station.brand,
        address: station.address,
        coordinates: {
          latitude: station.latitude,
          longitude: station.longitude
        },
        powerKW: station.powerKW
      },

      connectorDetails: connector,

      vehicleDetails: {
        make: vehicle.make,
        model: vehicle.model,
        batteryCapacityKwh: vehicle.batteryCapacityKwh
      }
    });

    await booking.save({ session });

    // Mark connector as "occupied"
    updateConnectorStatus(stationId, connectorId, "occupied");

    user.bookings.push(booking._id);

    await user.save({ session });

    await addNotification(userId, {
      title: "Booking Confirmed",
      message: `Your charging booking at ${station.station} has been confirmed.`,
      type: "info",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // expires in 7 days
    });

    await session.commitTransaction();

    return { success: true, booking };
  } catch (err) {
    await session.abortTransaction();
    return { success: false, error: err.message };
  } finally {
    session.endSession();
  }
};


/**
 * GET USER BOOKINGS
 */
const getUserBookings = async (userId) => {
  try {
    const bookings = await Booking.find({
      userId,
      status: { $ne: "completed" }
    }).sort({ createdAt: -1 }).lean();

    // Backfill station details if missing (from CSV)
    bookings.forEach((b) => {
      if (!b.stationDetails) {
        const station = getStationById(b.stationId);
        if (station) {
          b.stationDetails = {
            id: station.id,
            station: station.station,
            brand: station.brand,
            address: station.address,
            coordinates: {
              latitude: station.latitude,
              longitude: station.longitude
            },
            powerKW: station.powerKW
          };
        }
      }
    });

    return { success: true, bookings };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


/**
 * GET BOOKING BY ID
 */
const getBookingById = async (bookingId, userId) => {
  try {
    const booking = await Booking.findOne({ _id: bookingId, userId }).lean();
    if (!booking) return { success: false, error: "Booking not found" };

    if (!booking.stationDetails) {
      const station = getStationById(booking.stationId);
      if (station) {
        booking.stationDetails = station;
      }
    }

    return { success: true, booking };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


/**
 * START CHARGING SESSION
 */
const startChargingSession = async (bookingId, userId) => {
  try {
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) throw new Error("Booking not found");

    if (booking.status !== "confirmed")
      throw new Error("Cannot start. Booking not confirmed.");

    booking.actualStart = new Date();
    await booking.save();

    await addNotification(userId, {
      title: "Charging Started",
      message: `Your charging session at ${booking.stationDetails?.station || booking.stationId} has started.`,
      type: "info",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // expires in 7 days
    });

    return { success: true, message: "Charging started" };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


/**
 * COMPLETE CHARGING SESSION
 */
const completeChargingSession = async (bookingId, userId, data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findOne({ _id: bookingId, userId }).session(session);
    if (!booking) throw new Error("Booking not found");

    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");

    booking.status = "completed";
    booking.actualEnd = new Date();
    booking.consumedKwh = data.consumedKwh || booking.estimatedKwh;
    booking.finalCost = data.finalCost || booking.estimatedCost;

    const diff = Number((booking.finalCost - booking.estimatedCost).toFixed(2));

    if (diff > 0) {
      // Extra charge
      if (user.wallet.balance < diff) {
        throw new Error("Insufficient balance for final settlement");
      }
      user.wallet.balance -= diff;

      user.paymentHistory.push({
        type: "debit",
        amount: diff,
        method: "Wallet",
        description: "Extra charging cost",
        createdAt: new Date()
      });

    } else if (diff < 0) {
      // Refund
      const refund = Math.abs(diff);
      user.wallet.balance += refund;

      user.paymentHistory.push({
        type: "credit",
        amount: refund,
        method: "Wallet Refund",
        description: "Refund for overestimated cost",
        createdAt: new Date()
      });
    }

    updateConnectorStatus(booking.stationId, booking.connectorId, "available");

    await booking.save({ session });
    await user.save({ session });

    await addNotification(userId, {
      title: "Charging Completed",
      message: `Your charging session at ${booking.stationDetails.station || booking.stationId} has been completed. Final cost: ₹${booking.finalCost.toFixed(2)}.`,
      type: "info",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await session.commitTransaction();

    return { success: true, message: "Charging session completed" };
  } catch (err) {
    await session.abortTransaction();
    return { success: false, error: err.message };
  } finally {
    session.endSession();
  }
};


module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  startChargingSession,
  completeChargingSession
};
