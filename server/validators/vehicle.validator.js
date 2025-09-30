const { body } = require("express-validator");

exports.vehicleValidation = [
  body("make").notEmpty().withMessage("Make is required"),
  body("model").notEmpty().withMessage("Model is required"),
  body("batteryCapacityKwh")
    .isNumeric()
    .withMessage("Battery capacity must be a number"),
  body("preferredConnector")
    .isIn(["CCS2", "CHAdeMO", "Type2", "GB/T"])
    .withMessage("Invalid connector type"),
];