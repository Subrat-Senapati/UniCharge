import { useState, useEffect } from "react";
import styles from "../css/evchargehub.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBolt,
    faChargingStation,
    faCalendarCheck,
    faCheckCircle,
    faDollarSign,
    faFlag,
    faMapMarkerAlt,
    faPlug,
    faSearch,
    faSpinner,
    faStar,
    faTachometerAlt,
    faClock,
    faMapPin,
    faExclamationTriangle,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import L from "leaflet";

// Marker icons
const stationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [30, 30],
});

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
});

// Helper component to re-center map dynamically on route
const RecenterMap = ({ center, routePath }) => {
    const map = useMap();
    useEffect(() => {
        if (routePath && routePath.length > 0) {
            // Create bounds that include both user position and route path
            const bounds = L.latLngBounds(routePath);
            if (center) {
                bounds.extend(center);
            }
            map.fitBounds(bounds, { padding: [20, 20] });
        } else if (center) {
            map.setView(center, 12, { animate: true });
        }
    }, [center, routePath, map]);
    return null;
};

const EVChargeHub = () => {
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [destination, setDestination] = useState("");
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [stationsFetched, setStationsFetched] = useState(false);
    const [showBrands, setShowBrands] = useState(false);
    const [searchRadius, setSearchRadius] = useState("");

    const [routePath, setRoutePath] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

    // Fetch stations from backend
    const fetchStations = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/stations`);
            const data = await res.json();

            // Filter invalid lat/lng entries
            const validData = data.filter(
                (s) =>
                    s.latitude &&
                    s.longitude &&
                    !isNaN(parseFloat(s.latitude)) &&
                    !isNaN(parseFloat(s.longitude))
            );

            setStations(validData);
            setStationsFetched(true);
            setLoading(false);
            return validData;
        } catch (err) {
            console.error("Error fetching stations:", err);
            setStationsFetched(true);
            setLoading(false);
            return [];
        }
    };

    // Get user location on mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    setUserPosition([lat, lng]);
                    const placeName = await getPlaceNameFromCoords(lat, lng);
                    setLocation(placeName);
                    setLoadingLocation(false);
                },
                async (err) => {
                    setUserPosition(defaultCenter); // Bhubaneswar fallback
                    const placeName = await getPlaceNameFromCoords(defaultCenter[0], defaultCenter[1]);
                    setLocation(placeName);
                    setLoadingLocation(false);
                    console.error("Location error:", err);
                    alert("Unable to get your location, showing Bhubaneswar as default.");
                }
            );
        } else {
            alert("Geolocation not supported by your browser.");
        }
    }, []);

    const defaultCenter = [20.2961, 85.8245]; // Bhubaneswar fallback

    // Booking logic
    const handleBookClick = (station) => {
        setSelectedStation(station);
        setModalOpen(true);
    };

    const confirmBooking = () => {
        alert(`Booking confirmed at ${selectedStation.station}! Confirmation sent to your email.`);
        setModalOpen(false);
        setSelectedStation(null);
    };

    const cancelBooking = () => {
        setModalOpen(false);
        setSelectedStation(null);
    };

    // Main search handler that decides which function to call
    const handleSearch = async () => {
        if (destination.trim()) {
            await searchStationsOnRoute();
        } else {
            await searchStationsNearby();
        }
    };

    // SEARCH FUNCTION 1: When destination is NOT provided
    const searchStationsNearby = async () => {
        if (!userPosition) {
            alert("Live location is required. Please allow GPS access.");
            return;
        }

        if (!location.trim()) {
            alert("Fetching your location... Please wait or click 'Use My Location'.");
            return;
        }

        setLoading(true);
        setShowBrands(false);

        // Fetch stations
        const allStations = await fetchStations() || stations;

        // First, filter stations within 5km radius
        const stations5km = allStations.filter(station => {
            const stationLat = parseFloat(station.latitude);
            const stationLng = parseFloat(station.longitude);

            if (isNaN(stationLat) || isNaN(stationLng)) return false;

            const distance = calculateDistance(
                userPosition[0], userPosition[1],
                stationLat, stationLng
            );

            return distance <= 5; // 5km radius
        });

        if (stations5km.length > 0) {
            console.log(`Found ${stations5km.length} stations within 5km`);
            setFilteredStations(stations5km);
            setSearchRadius("5km");
            setShowBrands(true);
            alert(`Found ${stations5km.length} charging stations within 5km of your location`);
            return;
        }

        // If no stations in 5km, check within 10km
        const stations10km = allStations.filter(station => {
            const stationLat = parseFloat(station.latitude);
            const stationLng = parseFloat(station.longitude);

            if (isNaN(stationLat) || isNaN(stationLng)) return false;

            const distance = calculateDistance(
                userPosition[0], userPosition[1],
                stationLat, stationLng
            );

            return distance <= 10; // 10km radius
        });

        if (stations10km.length > 0) {
            console.log(`Found ${stations10km.length} stations within 10km (no stations in 5km)`);
            setFilteredStations(stations10km);
            setSearchRadius("10km");
            setShowBrands(true);
            alert(`No stations found within 5km. Found ${stations10km.length} charging stations within 10km of your location`);
            return;
        }

        // If no stations in 10km either
        console.log(`No stations found within 10km`);
        setFilteredStations([]);
        setSearchRadius("");
        setShowBrands(true);
        setLoading(false);
        // alert("No charging stations found within 10km of your location. Please try a different location or expand your search.");
    };

    // SEARCH FUNCTION 2: When destination IS provided
    const searchStationsOnRoute = async () => {
        if (!userPosition) {
            alert("Live location is required. Please allow GPS access.");
            return;
        }

        if (!location.trim()) {
            alert("Fetching your location... Please wait or click 'Use My Location'.");
            return;
        }

        if (!destination.trim()) {
            alert("Please enter a destination for route-based search.");
            return;
        }

        setLoading(true);
        setShowBrands(false);

        try {
            // Fetch stations
            const allStations = await fetchStations() || stations;

            // Get route from current location to destination
            const route = await getRoute(userPosition, destination);

            if (!route || !route.coordinates) {
                // Fallback: show all stations if route cannot be calculated
                setFilteredStations(allStations);
                setSearchRadius("route");
                setShowBrands(true);
                alert(`Could not calculate route. Showing all ${allStations.length} stations in the area.`);
                return;
            }

            // Filter stations that are near the route (within 1km buffer)
            const stationsAlongRoute = allStations.filter(station => {
                const stationLat = parseFloat(station.latitude);
                const stationLng = parseFloat(station.longitude);

                if (isNaN(stationLat) || isNaN(stationLng)) return false;

                // Check if station is within 2km of any point on the route
                return isStationNearRoute([stationLat, stationLng], route.coordinates, 1);
            });

            console.log(` Found ${stationsAlongRoute.length} stations along the route to ${destination}`);
            setFilteredStations(stationsAlongRoute);
            setSearchRadius("route");
            setShowBrands(true);

            // Store route for map display
            setRoutePath(route.coordinates);
            setLoading(false);

            // alert(`Found ${stationsAlongRoute.length} charging stations along your route to ${destination}`);

        } catch (error) {
            console.error("Route search error:", error);
            // Fallback to showing all stations
            const allStations = await fetchStations();
            setFilteredStations(allStations);
            setSearchRadius("route");
            setShowBrands(true);
            alert(`Error calculating route. Showing all ${allStations.length} stations in the area.`);
        }
    };

    // Get route from current location to destination using OSRM
    const getRoute = async (start, destinationName) => {
        try {
            // First, geocode destination to get coordinates
            const destCoords = await geocodeAddress(destinationName);
            if (!destCoords) {
                throw new Error("Could not find destination coordinates");
            }

            // Use OSRM API to get route
            const [startLng, startLat] = [start[1], start[0]];
            const [destLng, destLat] = [destCoords[1], destCoords[0]];

            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`
            );

            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                return {
                    coordinates: route.geometry.coordinates.map(coord => [coord[1], coord[0]]), // Convert to [lat, lng]
                    distance: route.distance / 1000, // Convert to km
                    duration: route.duration / 60 // Convert to minutes
                };
            }
            return null;
        } catch (error) {
            console.error("Route calculation error:", error);
            return null;
        }
    };

    // Geocode address to coordinates
    const geocodeAddress = async (address) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(address)}&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
            return null;
        } catch (error) {
            console.error("Geocoding error:", error);
            return null;
        }
    };

    // Check if station is near the route (within buffer distance in km)
    const isStationNearRoute = (stationCoords, routeCoords, bufferKm) => {
        for (const routePoint of routeCoords) {
            const distance = calculateDistance(
                stationCoords[0], stationCoords[1],
                routePoint[0], routePoint[1]
            );
            if (distance <= bufferKm) {
                return true;
            }
        }
        return false;
    };

    // Helper function to calculate distance between two coordinates
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    // Convert lat/lng -> human-readable location
    const getPlaceNameFromCoords = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&countrycodes=in`
            );
            const data = await res.json();
            return data.display_name || "Unknown Location";
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            return "Unknown Location";
        }
    };

    // Auto-suggest using OpenStreetMap for current location
    const fetchLocationSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${query}&addressdetails=1&limit=5`
            );
            const data = await res.json();

            setSuggestions(
                data.map((item) => ({
                    name: item.display_name,
                    lat: item.lat,
                    lon: item.lon,
                }))
            );
        } catch (err) {
            console.error("Auto-suggest error:", err);
        }
    };

    // Auto-suggest using OpenStreetMap for destination
    const fetchDestinationSuggestions = async (query) => {
        if (!query.trim()) {
            setDestinationSuggestions([]);
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${query}&addressdetails=1&limit=5`
            );
            const data = await res.json();

            setDestinationSuggestions(
                data.map((item) => ({
                    name: item.display_name,
                    lat: item.lat,
                    lon: item.lon,
                }))
            );
        } catch (err) {
            console.error("Destination auto-suggest error:", err);
        }
    };

    // Helper function to assign icons based on brand names
    const getBrandIcon = (brandName) => {
        const iconMap = {
            'Tata Power': faBolt,
            'Ather': faChargingStation,
            'Jio BP': faBolt,
            'Bolt': faBolt,
            'Statique': faChargingStation
        };
        return iconMap[brandName] || faChargingStation;
    };

    // Calculate distance from user to each station
    const getStationDistance = (station) => {
        if (!userPosition) return "N/A";
        const stationLat = parseFloat(station.latitude);
        const stationLng = parseFloat(station.longitude);
        const distance = calculateDistance(userPosition[0], userPosition[1], stationLat, stationLng);
        return `${distance.toFixed(1)} km`;
    };

    // Simulate availability for each station
    const getStationAvailability = (station) => {
        const totalPorts = parseInt(station.PortNum) || 1;
        // Simulate random availability between 0 and total ports
        const availablePorts = Math.floor(Math.random() * (totalPorts + 1));
        const availability = totalPorts > 0 ? Math.round((availablePorts / totalPorts) * 100) : 0;
        
        return {
            availablePorts,
            totalPorts,
            availability
        };
    };

    return (
        <div className={styles.page}>
            {/* Map Section */}
            <section className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={userPosition || defaultCenter}
                        zoom={searchRadius === "5km" ? 13 : 9}
                        scrollWheelZoom={true}
                        zoomControl={false}
                        style={{
                            height: "400px",
                            width: "100%",
                            borderRadius: "12px",
                            zIndex: 1,
                        }}
                        className={styles.leafletMap}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution=""
                            detectRetina={true}
                        />

                        {/* Auto center when userPosition updates */}
                        <RecenterMap center={userPosition || defaultCenter} routePath={routePath} />

                        {/* Route Path */}
                        {destination && routePath && (
                            <Polyline
                                positions={routePath}
                                pathOptions={{
                                    color: 'blue',
                                    weight: 6,
                                    opacity: 0.7,
                                    dashArray: '10, 10'
                                }}
                            />
                        )}

                        {/* User Location */}
                        {userPosition && (
                            <>
                                <Marker position={userPosition} icon={userIcon}>
                                    <Popup>You are here</Popup>
                                </Marker>
                                <Circle
                                    center={userPosition}
                                    radius={searchRadius === "5km" ? 5000 : 10000} // 5km or 10km radius
                                    pathOptions={{
                                        color: searchRadius === "5km" ? "green" : "orange",
                                        fillColor: searchRadius === "5km" ? "#28a745" : "#fd7e14",
                                        fillOpacity: 0.1,
                                    }}
                                />
                            </>
                        )}

                        {/* Destination Marker */}
                        {destination && destinationCoords && (
                            <Marker
                                position={destinationCoords}
                                icon={new L.Icon({
                                    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                                    iconSize: [25, 25],
                                })}
                            >
                                <Popup>Destination: {destination}</Popup>
                            </Marker>
                        )}

                        {/* Filtered Stations */}
                        {filteredStations
                            .filter((s) => {
                                const lat = parseFloat(s.latitude);
                                const lng = parseFloat(s.longitude);
                                const isValid = !isNaN(lat) && !isNaN(lng);
                                return isValid;
                            })
                            .map((s, i) => (
                                <Marker
                                    key={i}
                                    position={[parseFloat(s.latitude), parseFloat(s.longitude)]}
                                    icon={stationIcon}
                                >
                                    <Popup>
                                        <b>{s.station}</b> <br />
                                        Brand: {s.brand} <br />
                                        Power: {s.powerKW || "N/A"} kW <br />
                                        Price: ₹{s.pricePerKWh || "N/A"} per kWh <br />
                                        Ports: {s.PortNum || "N/A"}
                                    </Popup>
                                </Marker>
                            ))}
                    </MapContainer>
                </div>
            </section>

            {/* Booking Section */}
            <section className={styles.bookingSection}>
                <div className={styles.bookingPanel}>
                    <div className={styles.panelHeader}>
                        <div className={styles.panelTitle}>Find Your Charging Slot</div>
                    </div>

                    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>

                        {/* Pickup + My Location */}
                        <div className={styles.rowGroup}>
                            <div className={styles.flexGrow}>
                                <label>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Current Location
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className={styles.formControl}
                                        placeholder="Enter your location"
                                        value={location}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setLocation(value);
                                            setShowSuggestions(true);
                                            fetchLocationSuggestions(value);
                                        }}
                                        onFocus={() => location && setShowSuggestions(true)}
                                        onBlur={() => {
                                            setTimeout(() => setShowSuggestions(false), 200);
                                        }}
                                    />
                                    {showSuggestions && suggestions.length > 0 && (
                                        <ul className={styles.suggestionList}>
                                            {suggestions.slice(0, 10).map((s, idx) => (
                                                <li
                                                    key={idx}
                                                    className={styles.suggestionItem}
                                                    onClick={() => {
                                                        setLocation(s.name);
                                                        setUserPosition([parseFloat(s.lat), parseFloat(s.lon)]);
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    {s.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className={styles.liveBtn}
                                onClick={() => {
                                    setLoadingLocation(true);
                                    navigator.geolocation.getCurrentPosition(
                                        async (pos) => {
                                            const lat = pos.coords.latitude;
                                            const lng = pos.coords.longitude;
                                            setUserPosition([lat, lng]);
                                            const placeName = await getPlaceNameFromCoords(lat, lng);
                                            setLocation(placeName);
                                            setLoadingLocation(false);
                                        },
                                        (error) => {
                                            alert("Please allow live location access.");
                                            setLoadingLocation(false);
                                        },
                                        { enableHighAccuracy: true }
                                    );
                                }}
                                disabled={loadingLocation}
                            >
                                {loadingLocation ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin /> Getting Location...
                                    </>
                                ) : (
                                    "Use My Location"
                                )}
                            </button>
                        </div>

                        {/* Destination with Auto-suggestions */}
                        <div className={styles.fullRow}>
                            <label>
                                <FontAwesomeIcon icon={faFlag} /> Destination (Optional)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className={styles.formControl}
                                    placeholder="Enter destination"
                                    value={destination}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setDestination(value);
                                        setShowDestinationSuggestions(true);
                                        fetchDestinationSuggestions(value);
                                    }}
                                    onFocus={() => destination && setShowDestinationSuggestions(true)}
                                    onBlur={() => {
                                        setTimeout(() => setShowDestinationSuggestions(false), 200);
                                    }}
                                />
                                {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                                    <ul className={styles.suggestionList}>
                                        {destinationSuggestions.slice(0, 10).map((s, idx) => (
                                            <li
                                                key={idx}
                                                className={styles.suggestionItem}
                                                onClick={() => {
                                                    setDestination(s.name);
                                                    setDestinationCoords([parseFloat(s.lat), parseFloat(s.lon)]);
                                                    setShowDestinationSuggestions(false);
                                                }}
                                            >
                                                {s.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className={styles.buttonRow}>
                            <button
                                type="button"
                                className={styles.btnPrimary}
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin /> Finding Stations...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSearch} /> Find Stations
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Stations Section - Only show after clicking Find Stations */}
            {showBrands && stationsFetched && (
                <section className={styles.brandsSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionTitle}>
                            <h2>
                                {filteredStations.length > 0 ?
                                    `Available Charging Stations` :
                                    "No Stations Available"
                                }
                            </h2>
                            <p>
                                {filteredStations.length > 0 ?
                                    `Found ${filteredStations.length} charging stations nearby` :
                                    "No charging stations found in your area. Please try a different location."
                                }
                            </p>
                            {filteredStations.length > 0 && searchRadius && (
                                <div className={styles.searchRadiusInfo}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    {searchRadius === "5km" ? (
                                        " Showing stations within 5km radius"
                                    ) : searchRadius === "10km" ? (
                                        " Showing stations within 10km radius (no stations in 5km)"
                                    ) : (
                                        " Showing stations along your route"
                                    )}
                                </div>
                            )}
                        </div>

                        {filteredStations.length > 0 ? (
                            <div className={styles.brandsGrid}>
                                {filteredStations.map((station, i) => {
                                    const availability = getStationAvailability(station);
                                    const distance = getStationDistance(station);
                                    
                                    return (
                                        <div key={i} className={styles.stationCard}>
                                            <div className={styles.stationHeader}>
                                                <div className={styles.stationLogo}>
                                                    <FontAwesomeIcon icon={getBrandIcon(station.brand)} /> {station.brand}
                                                </div>
                                                <div className={styles.stationRating}>
                                                    <FontAwesomeIcon icon={faStar} /> {(4 + Math.random() * 1).toFixed(1)}
                                                </div>
                                            </div>

                                            <div className={styles.stationDetails}>
                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faMapPin} /> Station
                                                    </span>
                                                    <span className={styles.stationName}>{station.station}</span>
                                                </div>

                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faTachometerAlt} /> Power
                                                    </span>
                                                    <span>{station.powerKW || "N/A"} kW</span>
                                                </div>

                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faDollarSign} /> Price
                                                    </span>
                                                    <span className={styles.price}>₹{station.pricePerKWh || "N/A"}/kWh</span>
                                                </div>

                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faPlug} /> Ports
                                                    </span>
                                                    <span>{availability.totalPorts} total</span>
                                                </div>

                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faClock} /> Available Now
                                                    </span>
                                                    <span>{availability.availablePorts} ports</span>
                                                </div>

                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Distance
                                                    </span>
                                                    <span>{distance}</span>
                                                </div>

                                                <div className={styles.detailRow}>
                                                    <span className={styles.detailLabel}>
                                                        <FontAwesomeIcon icon={faCheckCircle} /> Availability
                                                    </span>
                                                    <span className={availability.availability > 50 ? styles.highAvailability : styles.lowAvailability}>
                                                        {availability.availability}%
                                                    </span>
                                                </div>

                                                <button
                                                    className={styles.bookBtn}
                                                    onClick={() => handleBookClick(station)}
                                                    disabled={availability.availablePorts === 0}
                                                >
                                                    {availability.availablePorts === 0 ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faExclamationTriangle} /> No Slots
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FontAwesomeIcon icon={faCalendarCheck} /> Book Slot
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={styles.noStations}>
                                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                                <h3>No Stations Found</h3>
                                <p>We couldn't find any charging stations in your area. Please try:</p>
                                <ul>
                                    <li>Expanding your search radius</li>
                                    <li>Checking a different location</li>
                                    <li>Looking for stations along your route</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Booking Modal */}
            {modalOpen && selectedStation && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalIcon}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <h3>Confirm Your Booking</h3>
                        <p>
                            You are about to book a charging slot at{" "}
                            <strong>{selectedStation.station}</strong> ({selectedStation.brand})
                        </p>
                        <div className={styles.bookingDetails}>
                            <div className={styles.bookingDetail}>
                                <span>Power:</span>
                                <span>{selectedStation.powerKW} kW</span>
                            </div>
                            <div className={styles.bookingDetail}>
                                <span>Price:</span>
                                <span>₹{selectedStation.pricePerKWh}/kWh</span>
                            </div>
                            <div className={styles.bookingDetail}>
                                <span>Location:</span>
                                <span>{selectedStation.station}</span>
                            </div>
                        </div>
                        <div className={styles.modalButtons}>
                            <button
                                className={`${styles.modalBtn} ${styles.confirm}`}
                                onClick={confirmBooking}
                            >
                                Confirm Booking
                            </button>
                            <button
                                className={`${styles.modalBtn} ${styles.cancel}`}
                                onClick={cancelBooking}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EVChargeHub;