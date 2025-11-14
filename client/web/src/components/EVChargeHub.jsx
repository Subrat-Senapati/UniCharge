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
} from "@fortawesome/free-solid-svg-icons";

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";

// ✅ Marker icons
const stationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [30, 30],
});

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
});

// ✅ Helper component to re-center map dynamically
const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 13, { animate: true });
        }
    }, [center, map]);
    return null;
};

const EVChargeHub = () => {
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [userPosition, setUserPosition] = useState(null);
    const [stations, setStations] = useState([]);

    // ✅ Fetch stations from backend
    const fetchStations = async () => {
        try {
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
        } catch (err) {
            console.error("❌ Error fetching stations:", err);
        }
    };

    // ✅ Get user location & fetch stations on mount
    useEffect(() => {
        fetchStations();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                (err) => {
                    setUserPosition(defaultCenter); // Bhubaneswar fallback
                    console.error("❌ Location error:", err);
                    alert("Unable to get your location, showing Bhubaneswar as default.");
                }
            );
        } else {
            alert("Geolocation not supported by your browser.");
        }
    }, []);

    const defaultCenter = [20.2961, 85.8245]; // Bhubaneswar fallback

    // ✅ Booking logic
    const handleBookClick = (brand, price) => {
        setSelectedBrand(brand);
        setSelectedPrice(price);
        setModalOpen(true);
    };

    const confirmBooking = () => {
        alert(`Booking confirmed with ${selectedBrand}! Confirmation sent to your email.`);
        setModalOpen(false);
    };

    const cancelBooking = () => setModalOpen(false);

    const findStations = () => {
        if (!location.trim()) {
            alert("Please enter your location to find charging stations.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Found charging stations near ${location}`);
        }, 1500);
    };

    // ✅ Static brand cards
    const brands = [
        { name: "Bolt", icon: faBolt, rating: 4.8, power: "50 kW", price: "$0.20", slots: 12 },
        { name: "Statique", icon: faChargingStation, rating: 4.6, power: "100 kW", price: "$0.25", slots: 10 },
        { name: "JioBP", icon: faBolt, rating: 4.9, power: "150 kW", price: "$0.30", slots: 6 },
        { name: "Electra", icon: faChargingStation, rating: 4.7, power: "200 kW", price: "$0.35", slots: 4 },
        { name: "Voltech", icon: faBolt, rating: 4.5, power: "250 kW", price: "$0.40", slots: 2 },
        { name: "PowerFlow", icon: faChargingStation, rating: 4.4, power: "350 kW", price: "$0.45", slots: 1 },
    ];

    return (
        <div className={styles.page}>
            {/* 🌍 Map Section */}
            <section className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={userPosition || defaultCenter}
                        zoom={10}
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

                        {/* ✅ Auto center when userPosition updates */}
                        <RecenterMap center={userPosition || defaultCenter} />

                        {/* ✅ User Location */}
                        {userPosition && (
                            <>
                                <Marker position={userPosition} icon={userIcon}>
                                    <Popup>You are here</Popup>
                                </Marker>
                                <Circle
                                    center={userPosition}
                                    radius={1500}
                                    pathOptions={{
                                        color: "green",
                                        fillColor: "#28a745",
                                        fillOpacity: 0.3,
                                    }}
                                />
                            </>
                        )}

                        {/* ✅ Stations from backend */}
                        {stations
                            .filter((s) => {
                                const lat = parseFloat(s.latitude);
                                const lng = parseFloat(s.longitude);
                                const isValid = !isNaN(lat) && !isNaN(lng);
                                if (!isValid) {
                                    console.warn("⚠️ Invalid station coordinates:", s);
                                }
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
                                        Price: {s.pricePerKWh || "N/A"} per kWh
                                    </Popup>
                                </Marker>
                            ))}
                    </MapContainer>
                </div>
            </section>

            {/* 🔍 Booking Section */}
            <section className={styles.bookingSection}>
                <div className={styles.bookingPanel}>
                    <div className={styles.panelHeader}>
                        <div className={styles.panelTitle}>Find Your Charging Slot</div>
                    </div>

                    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formGroup}>
                            <label htmlFor="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> Pickup Location
                            </label>
                            <input
                                id="location"
                                className={styles.formControl}
                                placeholder="Enter your location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="destination">
                                <FontAwesomeIcon icon={faFlag} /> Destination (Optional)
                            </label>
                            <input
                                id="destination"
                                className={styles.formControl}
                                placeholder="Enter destination"
                            />
                        </div>

                        <div className={styles.formGroup} style={{ justifyContent: "flex-end" }}>
                            <button
                                type="button"
                                className={styles.btnPrimary}
                                onClick={findStations}
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

            {/* ⚡ Brands Section */}
            <section className={styles.brandsSection}>
                <div className={styles.container}>
                    <div className={styles.sectionTitle}>
                        <h2>Available Charging Brands</h2>
                    </div>

                    <div className={styles.brandsGrid}>
                        {brands.map((b, i) => (
                            <div key={i} className={styles.brandCard}>
                                <div className={styles.brandHeader}>
                                    <div className={styles.brandLogo}>
                                        <FontAwesomeIcon icon={b.icon} /> {b.name}
                                    </div>
                                    <div className={styles.brandRating}>
                                        <FontAwesomeIcon icon={faStar} /> {b.rating}
                                    </div>
                                </div>

                                <div className={styles.brandDetails}>
                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            <FontAwesomeIcon icon={faTachometerAlt} /> DC Charging
                                        </span>
                                        <span>{b.power}</span>
                                    </div>

                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            <FontAwesomeIcon icon={faDollarSign} /> Price per kW
                                        </span>
                                        <span className={styles.price}>{b.price}</span>
                                    </div>

                                    <div className={styles.detailRow}>
                                        <span className={styles.detailLabel}>
                                            <FontAwesomeIcon icon={faPlug} /> Availability
                                        </span>
                                        <span>{b.slots} slots</span>
                                    </div>

                                    <button
                                        className={styles.bookBtn}
                                        onClick={() => handleBookClick(b.name, b.price)}
                                    >
                                        <FontAwesomeIcon icon={faCalendarCheck} /> Book Slot
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🟢 Booking Modal */}
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalIcon}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <h3>Confirm Your Booking</h3>
                        <p>
                            You are about to book a charging slot with{" "}
                            <strong>{selectedBrand}</strong> at{" "}
                            <strong>{selectedPrice}</strong>/kW
                        </p>
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