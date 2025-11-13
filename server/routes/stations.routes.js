const express = require("express");
const router = express.Router();
const { getStations } = require("../controllers/stations.controller");

// GET all stations
router.get("/stations", getStations);

module.exports = router;