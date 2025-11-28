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
        station: row["Station_Name"] || "Unknown Station",
        brand: row["Brand"] || "Unknown",
        latitude: parseFloat(row["Latitude"]),
        longitude: parseFloat(row["Longitude"]),
        powerKW: row["Max_kW"] || "N/A",
        pricePerKWh: parseFloat(row["Price_per_kWh_Rs"]) || 0,
        portNum: parseInt(row["ports"]) || 1,
        address: row["Address"] || "",
        operator: row["Operator"] || "Unknown",
        status: 'active', // Default status
        connectors: generateConnectors(row)
      }));

    console.log(`✅ Loaded ${stationsCache.length} stations`);
  } catch (error) {
    console.error("❌ Error loading stations:", error.message);
  }
};

// Generate connector data based on CSV row
const generateConnectors = (row) => {
  const portNum = parseInt(row["Num_Ports"]) || 1;
  const powerKW = row["Max_kW"] || "50";
  const pricePerKWh = parseFloat(row["Price_per_kWh_Rs"]) || 10;
  
  const connectors = [];
  const connectorTypes = ['Type2', 'CCS', 'CHAdeMO']; // Common connector types
  
  for (let i = 0; i < portNum; i++) {
    connectors.push({
      id: `connector_${i + 1}`,
      type: connectorTypes[i % connectorTypes.length],
      power: parseFloat(powerKW) || 50,
      status: 'available',
      pricePerKwh: pricePerKWh,
      output: i % 2 === 0 ? 'AC' : 'DC' // Alternate between AC and DC
    });
  }
  
  return connectors;
};

// Get station by ID
const getStationById = (stationId) => {
  return stationsCache.find(station => station.id === parseInt(stationId));
};

// Get connector by station ID and connector ID
const getConnectorById = (stationId, connectorId) => {
  const station = getStationById(stationId);
  if (!station) return null;
  
  return station.connectors.find(connector => connector.id === connectorId);
};

// Check if station and connector are available
const isStationAvailable = (stationId, connectorId) => {
  const station = getStationById(stationId);
  if (!station || station.status !== 'active') return false;
  
  const connector = getConnectorById(stationId, connectorId);
  return connector && connector.status === 'available';
};

// Update connector status
const updateConnectorStatus = (stationId, connectorId, status) => {
  const station = getStationById(stationId);
  if (!station) return false;
  
  const connector = getConnectorById(stationId, connectorId);
  if (!connector) return false;
  
  connector.status = status;
  return true;
};

// Get all available stations
const getAvailableStations = () => {
  return stationsCache.filter(station => 
    station.status === 'active' && 
    station.connectors.some(connector => connector.status === 'available')
  );
};

// Initialize cache at startup
loadStationsFromCSV();

module.exports = {
  getAllStations: () => stationsCache,
  getStationById,
  getConnectorById,
  isStationAvailable,
  updateConnectorStatus,
  getAvailableStations,
  loadStationsFromCSV
};