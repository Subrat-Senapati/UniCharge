const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "provider"], default: "user" },
    createdAt: { type: Date, default: Date.now },
    walletBalance: { type: Number, default: 0 }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);


// const UserSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phoneNumber: { type: String, unique: true, required: true },
//   passwordHash: { type: String, required: true },

//   authProvider: { type: String, enum: ['local', 'google', 'facebook', 'apple'], default: 'local' },
//   providerUid: { type: String },

//   role: { type: String, enum: ['user', 'admin', 'provider'], default: 'user' },

//   vehicle: {
//     make: String,
//     model: String,
//     batteryCapacityKwh: Number,
//     preferredConnector: { type: String, enum: ['CCS2', 'CHAdeMO', 'Type2', 'GB/T'] }
//   },

//   wallet: {
//     balance: { type: Number, default: 0.0 },
//     loyaltyPoints: { type: Number, default: 0 },
//     defaultPaymentMethod: { type: String, enum: ['upi', 'card', 'wallet'] }
//   },

//   preferences: {
//     preferredLanguage: { type: String, default: 'en' },
//     notificationsEnabled: { type: Boolean, default: true },
//     renewablePriority: { type: Boolean, default: false }
//   },

//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', UserSchema);