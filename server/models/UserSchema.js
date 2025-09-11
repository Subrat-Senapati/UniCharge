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

    vehicle: {
      make: String,
      model: String,
      batteryCapacityKwh: Number,
      preferredConnector: {
        type: String,
        enum: ["CCS2", "CHAdeMO", "Type2", "GB/T"],
      },
    },

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