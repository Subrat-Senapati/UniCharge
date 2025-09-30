const User = require("../models/UserSchema");

exports.addVehicle = async (userId, vehicleData) => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { vehicles: vehicleData } },
    { new: true }
  ).select("vehicles");
};

exports.getVehicles = async (userId) => {
  const user = await User.findById(userId).select("vehicles");
  return user ? user.vehicles : [];
};

exports.updateVehicle = async (userId, vehicleId, vehicleData) => {
  return await User.findOneAndUpdate(
    { _id: userId, "vehicles._id": vehicleId },
    { $set: { "vehicles.$": { _id: vehicleId, ...vehicleData } } },
    { new: true }
  ).select("vehicles");
};

exports.deleteVehicle = async (userId, vehicleId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { vehicles: { _id: vehicleId } } },
    { new: true }
  ).select("vehicles");
};