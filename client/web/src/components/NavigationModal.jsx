// components/NavigationModal.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styles from '../css/navigationmodal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRoute,
    faLocationArrow,
    faCheckCircle,
    faInfoCircle,
    faTimes,
    faCar,
    faClock,
    faRoad,
    faMap,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

// Map recenter component
const MapRecenter = ({ center, routePath }) => {
    const map = useMap();
    useEffect(() => {
        if (routePath && routePath.length > 0) {
            const bounds = L.latLngBounds(routePath);
            if (center) {
                bounds.extend(center);
            }
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (center) {
            map.setView(center, 13, { animate: true });
        }
    }, [center, routePath, map]);
    return null;
};

// Marker icons
const stationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [35, 35],
});

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [35, 35],
});

const NavigationModal = ({ 
    station, 
    userPosition, 
    distanceToStation, 
    userAtStation, 
    navigationRoute, 
    navigationInstructions, 
    onStartMonitoring, 
    onCancel
}) => {
    const [mapKey, setMapKey] = useState(0);
    const [showExternalMapsOption, setShowExternalMapsOption] = useState(false);

    // Re-render map when route changes
    useEffect(() => {
        setMapKey(prev => prev + 1);
    }, [navigationRoute]);

    const openInExternalMaps = () => {
        if (!station) return;
        
        const stationLat = parseFloat(station.latitude);
        const stationLng = parseFloat(station.longitude);
        
        // For Google Maps
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${stationLat},${stationLng}&travelmode=driving`;
        
        // For Apple Maps
        const appleMapsUrl = `http://maps.apple.com/?daddr=${stationLat},${stationLng}&dirflg=d`;
        
        // Check if user is on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        window.open(isIOS ? appleMapsUrl : googleMapsUrl, '_blank');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {/* Header */}
                    <div className={styles.modalHeader}>
                        <div className={styles.headerLeft}>
                            <FontAwesomeIcon icon={faRoute} className={styles.headerIcon} />
                            <div>
                                <h3>Navigate to Station</h3>
                                <p>You need to be at the station to book a slot</p>
                            </div>
                        </div>
                        <button onClick={onCancel} className={styles.closeBtn}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <div className={styles.modalBody}>
                        {/* Left Panel - Map */}
                        <div className={styles.mapSection}>
                            <div className={styles.mapHeader}>
                                <h4>
                                    <FontAwesomeIcon icon={faMap} />
                                    Live Route Map
                                </h4>
                                <button 
                                    className={styles.externalMapsBtn}
                                    onClick={() => setShowExternalMapsOption(!showExternalMapsOption)}
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    Other Maps
                                </button>
                            </div>
                            
                            {showExternalMapsOption && (
                                <div className={styles.externalMapsOptions}>
                                    <p>Open in external navigation app:</p>
                                    <div className={styles.externalMapButtons}>
                                        <button onClick={openInExternalMaps} className={styles.googleMapsBtn}>
                                            Google Maps
                                        </button>
                                        <button onClick={openInExternalMaps} className={styles.appleMapsBtn}>
                                            Apple Maps
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <div className={styles.mapContainer}>
                                <MapContainer
                                    key={mapKey}
                                    center={userPosition || [20.2961, 85.8245]}
                                    zoom={13}
                                    scrollWheelZoom={true}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution=""
                                    />

                                    <MapRecenter 
                                        center={userPosition} 
                                        routePath={navigationRoute?.coordinates} 
                                    />

                                    {/* Navigation Route */}
                                    {navigationRoute && (
                                        <Polyline
                                            positions={navigationRoute.coordinates}
                                            pathOptions={{
                                                color: '#007bff',
                                                weight: 6,
                                                opacity: 0.8
                                            }}
                                        />
                                    )}

                                    {/* User Location */}
                                    {userPosition && (
                                        <Marker position={userPosition} icon={userIcon}>
                                            <Popup>
                                                <strong>Your Location</strong><br />
                                                You are here
                                            </Popup>
                                        </Marker>
                                    )}

                                    {/* Station Marker */}
                                    {station && (
                                        <Marker 
                                            position={[parseFloat(station.latitude), parseFloat(station.longitude)]} 
                                            icon={stationIcon}
                                        >
                                            <Popup>
                                                <strong>{station.station}</strong><br />
                                                {station.brand}<br />
                                                <em>Your destination</em>
                                            </Popup>
                                        </Marker>
                                    )}
                                </MapContainer>
                            </div>
                        </div>

                        {/* Right Panel - Information */}
                        <div className={styles.infoSection}>
                            {/* Station Info */}
                            <div className={styles.stationCard}>
                                <h4>
                                    <FontAwesomeIcon icon={faRoute} />
                                    Destination
                                </h4>
                                <div className={styles.stationInfo}>
                                    <div className={styles.stationName}>{station.station}</div>
                                    <div className={styles.stationBrand}>{station.brand}</div>
                                    <div className={styles.stationDetails}>
                                        <span>Power: {station.powerKW} kW</span>
                                        <span>Price: ₹{station.pricePerKWh}/kWh</span>
                                    </div>
                                </div>
                            </div>

                            {/* Route Summary */}
                            {navigationRoute && (
                                <div className={styles.routeCard}>
                                    <h4>
                                        <FontAwesomeIcon icon={faRoad} />
                                        Route Summary
                                    </h4>
                                    <div className={styles.routeDetails}>
                                        <div className={styles.routeItem}>
                                            <FontAwesomeIcon icon={faRoad} />
                                            <div>
                                                <span>Distance</span>
                                                <strong>{navigationRoute.distance.toFixed(1)} km</strong>
                                            </div>
                                        </div>
                                        <div className={styles.routeItem}>
                                            <FontAwesomeIcon icon={faClock} />
                                            <div>
                                                <span>Estimated Time</span>
                                                <strong>{Math.ceil(navigationRoute.duration)} min</strong>
                                            </div>
                                        </div>
                                        <div className={styles.routeItem}>
                                            <FontAwesomeIcon icon={faCar} />
                                            <div>
                                                <span>Current Distance</span>
                                                <strong>{distanceToStation?.toFixed(0)} meters</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Instructions */}
                            <div className={styles.instructionsCard}>
                                <h4>Getting There</h4>
                                <div className={styles.instructionList}>
                                    {navigationInstructions.map((instruction, index) => (
                                        <div key={index} className={styles.instructionItem}>
                                            <div className={styles.instructionNumber}>{index + 1}</div>
                                            <div className={styles.instructionText}>{instruction}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Live Status */}
                            <div className={styles.statusCard}>
                                <div className={styles.statusHeader}>
                                    <FontAwesomeIcon 
                                        icon={userAtStation ? faCheckCircle : faLocationArrow} 
                                        className={userAtStation ? styles.statusReached : styles.statusTraveling}
                                    />
                                    <span>Live Status</span>
                                </div>
                                <div className={styles.statusMessage}>
                                    {userAtStation 
                                        ? "🎉 You've reached the charging station!"
                                        : `📍 You're ${distanceToStation?.toFixed(0)} meters away from the station`
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.modalActions}>
                        <button
                            className={styles.primaryBtn}
                            onClick={onStartMonitoring}
                            disabled={userAtStation}
                        >
                            <FontAwesomeIcon icon={faLocationArrow} />
                            {userAtStation ? 'Station Reached!' : 'Start Auto-Detection'}
                        </button>
                        <button
                            className={styles.cancelBtn}
                            onClick={onCancel}
                        >
                            Cancel Navigation
                        </button>
                    </div>

                    <div className={styles.note}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        {userAtStation 
                            ? "You can now proceed with booking your charging slot"
                            : "We'll automatically detect when you reach the station and enable booking"
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationModal;