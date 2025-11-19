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
    faRoute,
    faLocationArrow,
    faWalking,
    faCar,
    faDirections,
    faCompass,
    faCreditCard
} from "@fortawesome/free-solid-svg-icons";

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import EnhancedBookingModal from "./EnhancedBookingModal";
import NavigationModal from './NavigationModal';
import { useAuth } from "../context/AuthContext";

// Marker icons
const stationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [30, 30],
});

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
});

const destinationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 25],
});

// Helper component to re-center map dynamically on route
const RecenterMap = ({ center, routePath }) => {
    const map = useMap();
    useEffect(() => {
        if (routePath && routePath.length > 0) {
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

    // NEW STATES FOR LOCATION VERIFICATION
    const [navigationModalOpen, setNavigationModalOpen] = useState(false);
    const [userAtStation, setUserAtStation] = useState(false);
    const [distanceToStation, setDistanceToStation] = useState(null);
    const [checkingLocation, setCheckingLocation] = useState(false);
    const [navigationRoute, setNavigationRoute] = useState(null);
    const [navigationInstructions, setNavigationInstructions] = useState([]);
    const [locationWatchId, setLocationWatchId] = useState(null);

    // Distance threshold for considering user "at station" (in meters)
    const LOCATION_THRESHOLD = 100; // 100 meters
    const { user } = useAuth()

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

    // NEW: Check if user is at station location
    const checkUserAtStation = (station) => {
        if (!userPosition || !station) return false;

        const stationLat = parseFloat(station.latitude);
        const stationLng = parseFloat(station.longitude);

        const distance = calculateDistance(
            userPosition[0], userPosition[1],
            stationLat, stationLng
        );

        setDistanceToStation(distance * 1000); // Convert to meters
        return distance * 1000 <= LOCATION_THRESHOLD; // Convert to meters and check
    };

    // NEW: Enhanced booking logic with location verification
    const handleBookClick = async (station) => {
        setSelectedStation(station);
        setCheckingLocation(true);

        // Get fresh user location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    setUserPosition([lat, lng]);

                    const isAtStation = checkUserAtStation(station);
                    setUserAtStation(isAtStation);

                    if (isAtStation) {
                        // User is at station - proceed to booking
                        setModalOpen(true);
                    } else {
                        // User is not at station - show navigation
                        await generateNavigationRoute(station);
                        setNavigationModalOpen(true);
                    }
                    setCheckingLocation(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to verify your location. Please enable location services.");
                    setCheckingLocation(false);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        }
    };

    // NEW: Generate navigation route to station
    const generateNavigationRoute = async (station) => {
        if (!userPosition) return;

        try {
            const stationCoords = [parseFloat(station.latitude), parseFloat(station.longitude)];
            const route = await getRoute(userPosition, stationCoords);

            if (route && route.coordinates) {
                setNavigationRoute(route);
                generateNavigationInstructions(route, station);
            }
        } catch (error) {
            console.error("Error generating route:", error);
        }
    };

    // NEW: Generate step-by-step navigation instructions
    const generateNavigationInstructions = (route, station) => {
        const instructions = [
            "Start from your current location",
            `Head towards ${station.station}`,
            `Follow the route for approximately ${Math.ceil(route.distance)} km`,
            `Estimated travel time: ${Math.ceil(route.duration)} minutes`,
            "You'll see the charging station on your arrival"
        ];
        setNavigationInstructions(instructions);
    };

    // NEW: Continuous location monitoring for navigation
    const startLocationMonitoring = () => {
        if (!selectedStation) return;

        // Clear any existing watcher
        if (locationWatchId) {
            navigator.geolocation.clearWatch(locationWatchId);
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                setUserPosition([lat, lng]);

                const isAtStation = checkUserAtStation(selectedStation);
                setUserAtStation(isAtStation);

                if (isAtStation) {
                    // User reached the station - stop monitoring and enable booking
                    navigator.geolocation.clearWatch(watchId);
                    setLocationWatchId(null);
                    setNavigationModalOpen(false);
                    setModalOpen(true);
                }
            },
            (error) => {
                console.error("Error monitoring location:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        setLocationWatchId(watchId);
    };

    // NEW: Stop location monitoring
    const stopLocationMonitoring = () => {
        if (locationWatchId) {
            navigator.geolocation.clearWatch(locationWatchId);
            setLocationWatchId(null);
        }
    };

    const confirmBooking = async (bookingData) => {
        try {
            setBookingLoading(true);

            const bookingPayload = {
                stationId: bookingData.station._id,
                vehicleId: bookingData.vehicle._id,
                scheduledStart: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
                scheduledEnd: new Date(Date.now() + 90 * 60 * 1000),   // 1.5 hours from now
                estimatedKwh: bookingData.vehicle.batteryCapacityKwh * 0.8,
                estimatedCost: bookingData.estimatedCost
            };

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bookingPayload)
            });

            if (response.ok) {
                const booking = await response.json();
                alert(`Booking confirmed! Reference: ${booking._id}`);
                setModalOpen(false);
                setSelectedStation(null);
            } else {
                const error = await response.json();
                alert(`Booking failed: ${error.message}`);
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed. Please try again.');
        } finally {
            setBookingLoading(false);
        }
    };

    const cancelBooking = () => {
        stopLocationMonitoring();
        setModalOpen(false);
        setNavigationModalOpen(false);
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
            return;
        }

        // If no stations in 10km either
        console.log(`No stations found within 10km`);
        setFilteredStations([]);
        setSearchRadius("");
        setShowBrands(true);
        setLoading(false);
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

        } catch (error) {
            console.error("Route search error:", error);
            // Fallback to showing all stations
            const allStations = await fetchStations();
            setFilteredStations(allStations);
            setSearchRadius("route");
            setShowBrands(true);
        }
    };

    // Get route from current location to destination using OSRM
    const getRoute = async (start, destination) => {
        try {
            let destCoords;

            // Check if destination is coordinates or address string
            if (Array.isArray(destination)) {
                destCoords = destination;
            } else {
                // Geocode destination to get coordinates
                destCoords = await geocodeAddress(destination);
                if (!destCoords) {
                    throw new Error("Could not find destination coordinates");
                }
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

    // Updated geocoding functions with working proxies
    const getPlaceNameFromCoords = async (lat, lng) => {
        try {
            // Try multiple proxy options
            const proxyUrls = [
                `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&countrycodes=in`)}`,
                `https://cors.bridged.cc/https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&countrycodes=in`,
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&countrycodes=in` // Direct call (might work in some environments)
            ];

            for (let url of proxyUrls) {
                try {
                    const res = await fetch(url, {
                        headers: {
                            'Accept': 'application/json',
                            'User-Agent': 'EVChargeHub/1.0 (https://github.com/your-repo)'
                        }
                    });

                    if (res.ok) {
                        const data = await res.json();
                        return data.display_name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
                    }
                } catch (error) {
                    console.log(`Proxy failed, trying next...`);
                    continue;
                }
            }

            throw new Error('All proxies failed');

        } catch (error) {
            console.error("Reverse geocoding error:", error);
            // Return coordinates as fallback
            return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
        }
    };

    const geocodeAddress = async (address) => {
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(address)}&limit=1`)}`;

            const response = await fetch(proxyUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EVChargeHub/1.0'
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

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

    const fetchLocationSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`)}`;

            const res = await fetch(proxyUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EVChargeHub/1.0'
                }
            });

            if (!res.ok) throw new Error('Network response was not ok');

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
            setSuggestions([]);
        }
    };

    const fetchDestinationSuggestions = async (query) => {
        if (!query.trim()) {
            setDestinationSuggestions([]);
            return;
        }

        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`)}`;

            const res = await fetch(proxyUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'EVChargeHub/1.0'
                }
            });

            if (!res.ok) throw new Error('Network response was not ok');

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
            setDestinationSuggestions([]);
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

                        {/* Navigation Route */}
                        {navigationRoute && navigationModalOpen && (
                            <Polyline
                                positions={navigationRoute.coordinates}
                                pathOptions={{
                                    color: 'green',
                                    weight: 6,
                                    opacity: 0.8
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
                                icon={destinationIcon}
                            >
                                <Popup>Destination: {destination}</Popup>
                            </Marker>
                        )}

                        {/* Selected Station Marker (for navigation) */}
                        {navigationModalOpen && selectedStation && (
                            <Marker
                                position={[parseFloat(selectedStation.latitude), parseFloat(selectedStation.longitude)]}
                                icon={stationIcon}
                            >
                                <Popup>
                                    <b>{selectedStation.station}</b> <br />
                                    Your destination
                                </Popup>
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
                                                    disabled={availability.availablePorts === 0 || checkingLocation}
                                                >
                                                    {checkingLocation && selectedStation?._id === station._id ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faSpinner} spin /> Checking Location...
                                                        </>
                                                    ) : availability.availablePorts === 0 ? (
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

            {/* Navigation Modal - Show when user is not at station */}
            {navigationModalOpen && selectedStation && (
                <NavigationModal
                    station={selectedStation}
                    userPosition={userPosition}
                    distanceToStation={distanceToStation}
                    userAtStation={userAtStation}
                    navigationRoute={navigationRoute}
                    navigationInstructions={navigationInstructions}
                    onStartMonitoring={startLocationMonitoring}
                    onCancel={cancelBooking}
                />
            )}

            {/* Enhanced Booking Modal - Show when user is at station */}
            {modalOpen && selectedStation && userAtStation && (
                <EnhancedBookingModal
                    station={selectedStation}
                    onClose={cancelBooking}
                    onConfirm={confirmBooking}
                    user={user}
                />
            )}
        </div>
    );
};

export default EVChargeHub;