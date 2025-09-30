const { validationResult } = require("express-validator");
const vehicleService = require("../services/vehicle.service");

exports.addVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const userId = req.user.id;
    const vehicles = await vehicleService.addVehicle(userId, req.body);
    res.status(200).json({ message: "Vehicle added successfully", vehicles });
  } catch (err) {
    res.status(500).json({ message: "Error adding vehicle", error: err.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicles = await vehicleService.getVehicles(userId);
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vehicles", error: err.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleId = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const vehicles = await vehicleService.updateVehicle(userId, vehicleId, req.body);
    res.status(200).json({ message: "Vehicle updated successfully", vehicles });
  } catch (err) {
    res.status(500).json({ message: "Error updating vehicle", error: err.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicleId = req.params.id;
    const vehicles = await vehicleService.deleteVehicle(userId, vehicleId);
    res.status(200).json({ message: "Vehicle deleted successfully", vehicles });
  } catch (err) {
    res.status(500).json({ message: "Error deleting vehicle", error: err.message });
  }
};