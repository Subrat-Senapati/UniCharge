const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

let stationsCache = [];

// Watch for changes in the CSV file to reload stations
fs.watch(path.join(__dirname, "../data/Bhubaneswar_EV_Charging_Stations.csv"), (eventType) => {
  if (eventType === "change") {
    console.log("♻️ CSV file updated — reloading stations...");
    loadStationsFromCSV();
  }
});

// Function to load CSV once and cache it
const loadStationsFromCSV = () => {
  try {
    const csvPath = path.join(__dirname, "../data/Bhubaneswar_EV_Charging_Stations.csv");
    const csvFile = fs.readFileSync(csvPath, "utf8");

    const parsed = Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
    });

    stationsCache = parsed.data
      .filter((row) => row["Latitude"] && row["Longitude"])
      .map((row, index) => ({
        id: index + 1,
        city: row["City"] || "",
        station: row["Station"] || "Unknown Station",
        brand: row["Brand"] || "Unknown",
        latitude: parseFloat(row["Latitude"]),
        longitude: parseFloat(row["Longitude"]),
        powerKW: row["Power kW"] || "N/A",
        pricePerKWh: row["Price per kWh"] || "N/A",
      }));

    console.log(`✅ Loaded ${stationsCache.length} stations`);
  } catch (error) {
    console.error("❌ Error loading stations:", error.message);
  }
};

// Initialize cache at startup
loadStationsFromCSV();

// Service function to get all stations
const getAllStations = async () => stationsCache;

module.exports = {
  getAllStations,
  loadStationsFromCSV,
};