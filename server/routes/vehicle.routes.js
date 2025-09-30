const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");
const { vehicleValidation } = require("../validators/vehicle.validator");
const { authMiddleware } = require("../middleware/auth");

// Add new vehicle
router.post(
    "/vehicles",
    authMiddleware,
    vehicleValidation,
    vehicleController.addVehicle
);

// Get all vehicles
router.get("/vehicles", authMiddleware, vehicleController.getVehicles);

// Update vehicle by ID
router.put(
    "/vehicles/:id",
    authMiddleware,
    vehicleValidation,
    vehicleController.updateVehicle
);

// Delete vehicle by ID
router.delete("/vehicles/:id", authMiddleware, vehicleController.deleteVehicle);

module.exports = router;