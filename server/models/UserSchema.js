const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    passwordHash: { type: String },

    role: {
      type: String,
      enum: ["user", "admin", "provider"],
      default: "user",
    },

    authProvider: {
      type: String,
      enum: ["local", "google", "facebook", "apple"],
      default: "local",
    },
    providerUid: { type: String },

    vehicles: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        make: String,
        model: String,
        batteryCapacityKwh: Number,
        preferredConnector: {
          type: String,
          enum: ["CCS2", "CHAdeMO", "Type2", "GB/T"],
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    wallet: {
      balance: { type: Number, default: 0.0 },
      loyaltyPoints: { type: Number, default: 0 },
      defaultPaymentMethod: { type: String }, // will store the _id of a saved method
    },

    paymentMethods: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        type: { type: String, enum: ["upi", "card"], required: true },
        upiId: { type: String }, // for type = 'upi'
        card: {
          cardNumberMasked: String, // last 4 digits only
          cardHolder: String,
          expiryMonth: String,
          expiryYear: String,
        },
        isDefault: { type: Boolean, default: false },
      },
    ],

    paymentHistory: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        type: { type: String, enum: ["credit", "debit"], required: true }, // credit = add money, debit = spend
        amount: { type: Number, required: true },
        method: { type: String }, // e.g., "UPI", "Card", "Wallet Adjustment"
        description: { type: String }, // optional note like "Recharge" / "Charging Session"
        referenceId: { type: String }, // txn id from payment gateway if available
        status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
        vehicleName: { type: String }, // e.g., "Tata Nexon EV"
        stationName: { type: String }, // e.g., "EVGo Charger, MG Road"
        createdAt: { type: Date, default: Date.now },
      },
    ],

    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
      }
    ],

    notifications: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: {
          type: String,
          enum: ["info", "alert", "promo", "transaction", "success"],
          default: "info",
        },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      },
    ],

    location: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      },
      isProvided: { type: Boolean, default: false },
    },

    preferences: {
      preferredLanguage: { type: String, default: "en" },
      notificationsEnabled: { type: Boolean, default: true },
      renewablePriority: { type: Boolean, default: false },
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", UserSchema);