import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBolt,
    faPlug,
    faClock,
    faBatteryThreeQuarters,
    faTimes,
    faCar,
    faMapMarkerAlt,
    faStopCircle,
    faIdCard,
    faIndustry,
    faCreditCard
} from "@fortawesome/free-solid-svg-icons";
import styles from "../css/activechargingsession.module.css";

const ActiveChargingSession = ({
    activeBooking,
    onClose,
    onStopCharging,
    onCostUpdate
}) => {

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [chargingProgress, setChargingProgress] = useState(0);
    const [energyConsumed, setEnergyConsumed] = useState(0);
    const [currentCost, setCurrentCost] = useState(0);

    // ---------------------
    // TIMER + COST LOGIC
    // ---------------------
    useEffect(() => {
        if (!activeBooking) return;

        const start = new Date(activeBooking.scheduledStart).getTime();
        const end = new Date(activeBooking.scheduledEnd).getTime();
        const duration = end - start;

        const interval = setInterval(() => {
            const now = Date.now();

            const elapsed = Math.max(0, now - start);
            const remaining = Math.max(0, end - now);
            const progress = Math.min(100, (elapsed / duration) * 100);

            setTimeElapsed(elapsed / 1000);
            setTimeRemaining(remaining / 1000);
            setChargingProgress(progress);

            const totalKwh = activeBooking.estimatedKwh || 40;
            const kwhConsumed = (totalKwh * progress) / 100;

            const costPerKwh =
                activeBooking.connectorDetails?.pricePerKwh ||
                activeBooking.stationDetails?.pricePerKwh ||
                10;

            const newEnergyConsumed = kwhConsumed;
            const newCurrentCost = kwhConsumed * costPerKwh;

            setEnergyConsumed(newEnergyConsumed);
            setCurrentCost(newCurrentCost);

            // 🔥 Notify parent
            if (onCostUpdate) {
                onCostUpdate(newCurrentCost);
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [activeBooking]);


    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    if (!activeBooking) return null;

    const station = activeBooking.stationDetails;
    const vehicle = activeBooking.vehicleDetails;
    const connector = activeBooking.connectorDetails;

    // ---------------------
    // RENDER
    // ---------------------
    return (
        <div className={styles.activeChargingSession}>
            <div className={styles.sessionOverlay} onClick={onClose}></div>

            <div className={styles.sessionContent}>

                {/* Header */}
                <div className={styles.sessionHeader}>
                    <div className={styles.headerLeft}>
                        <FontAwesomeIcon icon={faBolt} className={styles.chargingIcon} />
                        <div className={styles.headerText}>
                            <h2>Charging in Progress</h2>
                            <p>Your vehicle is actively charging</p>
                        </div>
                    </div>

                    <button className={styles.closeButton} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                        <h3>Charging Progress</h3>
                        <span className={styles.progressPercentage}>
                            {chargingProgress.toFixed(0)}%
                        </span>
                    </div>

                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${chargingProgress}%` }}
                        ></div>
                    </div>

                    <div className={styles.progressLabels}>
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className={styles.metricsGrid}>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIconContainer}>
                            <FontAwesomeIcon icon={faClock} className={styles.metricIcon} />
                        </div>
                        <div className={styles.metricInfo}>
                            <span className={styles.metricLabel}>Time Elapsed</span>
                            <strong className={styles.metricValue}>{formatTime(timeElapsed)}</strong>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIconContainer}>
                            <FontAwesomeIcon icon={faClock} className={styles.metricIcon} />
                        </div>
                        <div className={styles.metricInfo}>
                            <span className={styles.metricLabel}>Time Remaining</span>
                            <strong className={styles.metricValue}>{formatTime(timeRemaining)}</strong>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIconContainer}>
                            <FontAwesomeIcon icon={faBatteryThreeQuarters} className={styles.metricIcon} />
                        </div>
                        <div className={styles.metricInfo}>
                            <span className={styles.metricLabel}>Energy Consumed</span>
                            <strong className={styles.metricValue}>{energyConsumed.toFixed(2)} kWh</strong>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <div className={styles.metricIconContainer}>
                            <FontAwesomeIcon icon={faCreditCard} className={styles.metricIcon} />
                        </div>
                        <div className={styles.metricInfo}>
                            <span className={styles.metricLabel}>Current Cost</span>
                            <strong className={styles.metricValue}>₹{currentCost.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>

                {/* Details Grid - Station & Vehicle Side by Side */}
                <div className={styles.detailsGrid}>
                    {/* Station Details Card */}
                    <div className={styles.detailCard}>
                        <div className={styles.cardHeader}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.cardIcon} />
                            <h3>Station Information</h3>
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.detailRow}>
                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faIndustry} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Station Name</span>
                                        <span className={styles.itemValue}>{station?.name || station?.station || "N/A"}</span>
                                    </div>
                                </div>

                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faIdCard} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Operator</span>
                                        <span className={styles.itemValue}>{station?.brand || station?.brand || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailRow}>
                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faBolt} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Power Output</span>
                                        <span className={styles.itemValue}>{connector?.power || station?.powerKW || "N/A"} kW</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailRow}>
                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faCreditCard} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Rate</span>
                                        <span className={styles.itemValue}>
                                            ₹{connector?.pricePerKwh || station?.pricePerKWh || "N/A"}/kWh
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details Card */}
                    <div className={styles.detailCard}>
                        <div className={styles.cardHeader}>
                            <FontAwesomeIcon icon={faCar} className={styles.cardIcon} />
                            <h3>Vehicle Information</h3>
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.detailRow}>
                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faIdCard} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Vehicle Model</span>
                                        <span className={styles.itemValue}>
                                            {vehicle?.make || "N/A"} {vehicle?.model || ""}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailRow}>
                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faBatteryThreeQuarters} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Battery Capacity</span>
                                        <span className={styles.itemValue}>{vehicle?.batteryCapacityKwh || "N/A"} kWh</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.detailRow}>
                                <div className={styles.detailItem}>
                                    <FontAwesomeIcon icon={faPlug} className={styles.itemIcon} />
                                    <div className={styles.itemContent}>
                                        <span className={styles.itemLabel}>Connector Type</span>
                                        <span className={styles.itemValue}>{vehicle?.connectorType || vehicle?.preferredConnector || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.vehicleStatus}>
                                <div className={styles.statusItem}>
                                    <span className={styles.statusLabel}>Charging Status</span>
                                    <span className={styles.statusValueActive}>Active</span>
                                </div>
                                <div className={styles.statusItem}>
                                    <span className={styles.statusLabel}>Battery Health</span>
                                    <span className={styles.statusValueGood}>Good</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.sessionActions}>
                    <button className={styles.stopButton} onClick={onStopCharging}>
                        <FontAwesomeIcon icon={faStopCircle} />
                        Stop Charging
                    </button>

                    <button className={styles.minimizeButton} onClick={onClose}>
                        Minimize
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ActiveChargingSession;