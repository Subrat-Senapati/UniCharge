const { getAllStations } = require("../services/stations.service");

const getStations = async (req, res) => {
  try {
    const stations = await getAllStations();
    res.status(200).json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error.message);
    res.status(500).json({ message: "Failed to fetch stations" });
  }
};

module.exports = { getStations };