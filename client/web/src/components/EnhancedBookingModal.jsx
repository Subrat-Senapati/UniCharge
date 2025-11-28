import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/enhancedbookingmodal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheckCircle, 
    faSpinner, 
    faTimes,
    faWallet,
    faBolt
} from '@fortawesome/free-solid-svg-icons';

// Enhanced booking modal without duration selection
const EnhancedBookingModal = ({ station, connector, isOpen, onClose, onConfirm, loading = false, user }) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const navigate = useNavigate();

    const vehicles = user?.vehicles || [];
    const walletBalance = user?.wallet?.balance || 0;
    const stationRate = station?.pricePerKWh || 0;
    const minBalanceRequired = 500;
    const isBelowMinBalance = walletBalance < minBalanceRequired;

    const [chargeCost, setChargeCost] = useState(null);
    const [loadingCost, setLoadingCost] = useState(false);

    const createPayload = (vehicle) => {
        if (!vehicle) return null;

        const {
            make = "Unknown",
            model = "Standard",
            batteryCapacityKwh = 40,
            preferredConnector = "AC"
        } = vehicle;

        // Calculate dynamic values based on available data
        const isDC = preferredConnector.includes('DC') || preferredConnector.includes('CCS') || preferredConnector.includes('CHAdeMO');
        
        // Default charging power based on connector type
        const defaultACCharging = 7.2; // kW
        const defaultDCCharging = 50; // kW
        
        // Estimate range based on battery capacity (assuming 5-6 km per kWh)
        const estimatedRange = Math.round(batteryCapacityKwh * 5.5);
        
        // Calculate charge times based on battery capacity and connector type
        const acChargingPower = defaultACCharging;
        const dcChargingPower = isDC ? defaultDCCharging : 50;
        
        const acFullChargeHours = Math.ceil(batteryCapacityKwh / acChargingPower);
        const dc10to80Minutes = Math.ceil((batteryCapacityKwh * 0.7) / dcChargingPower * 60);

        return {
            Brand: make,
            Segment: model,
            Battery_Capacity_kWh: batteryCapacityKwh,
            Range_km: estimatedRange,
            AC_Charging_kW: acChargingPower,
            DC_Charging_kW: dcChargingPower,
            AC_FullCharge_hr: acFullChargeHours,
            DC_10_80_min: dc10to80Minutes,
            Launch_Year: new Date().getFullYear() - 2,
            Connector_Type: preferredConnector
        };
    };

    const getPredictedCost = async () => {
        setLoadingCost(true);
        try {
            const payload = createPayload(selectedVehicle);

            if (!payload) {
                console.error("No payload created for selected vehicle");
                return;
            }

            const res = await fetch(import.meta.env.VITE_CPU_PREDICTION_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            setChargeCost(data.Predicted_FullChargeCost_Rs);
        } catch (err) {
            console.error("Cost fetch error", err);
        } finally {
            setLoadingCost(false);
        }
    };

    useEffect(() => {
        if (selectedVehicle && chargeCost) {
            const bookingCost = (selectedVehicle.batteryCapacityKwh * 0.8) * stationRate;
            setEstimatedCost(bookingCost);
        }
    }, [chargeCost, selectedVehicle, stationRate]);

    useEffect(() => {
        if (selectedVehicle && station?.id) {
            getPredictedCost(); 
        }
    }, [selectedVehicle, station?.id]);

    const handleConfirm = async () => {
        const start = new Date(Date.now() + 30 * 60 * 1000);
        const battery = selectedVehicle?.batteryCapacityKwh || 40;
        const kwh = battery * 0.8;
        const minutes = Math.ceil((kwh / (connector?.power || 50)) * 60);
        const end = new Date(start.getTime() + minutes * 60 * 1000);

        await onConfirm({
            stationId: station.id,
            connectorId: connector.id,
            scheduledStart: start.toISOString(),
            scheduledEnd: end.toISOString(),
            estimatedDuration: minutes,
            vehicleId: selectedVehicle._id,
            estimatedCost : chargeCost
        });
    };

    const handleAddBalance = () => {
        onClose();
        navigate('/home/wallet');
    };

    const isFormValid = station?.id && connector?.id && selectedVehicle?._id && !isBelowMinBalance && !loadingCost && !loading;
    
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h3>Book Charging Session</h3>
                        <button onClick={onClose} className={styles.closeBtn}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <div className={styles.modalBody}>
                        {/* Station & Connector Details */}
                        <div className={styles.bookingSection}>
                            <h4>
                                <FontAwesomeIcon icon={faBolt} />
                                Station Details
                            </h4>
                            <div className={styles.stationInfo}>
                                <p><strong>{station.station}</strong> ({station.brand})</p>
                                <p>Power: {station.powerKW} kW</p>
                                <p>Price: ₹{station.pricePerKWh}/kWh</p>
                                <p>Connector: {connector?.power}kW • {connector?.output}</p>
                                <p>Status: <span className={connector?.status === 'available' ? styles.available : styles.busy}>
                                    {connector?.status}
                                </span></p>
                            </div>
                        </div>

                        {/* Vehicle Selection */}
                        <div className={styles.bookingSection}>
                            <h4>Vehicle</h4>
                            <div className={styles.vehicleGrid}>
                                {vehicles.map(v => (
                                    <div
                                        key={v._id}
                                        className={`${styles.vehicleCard} ${selectedVehicle?._id === v._id ? styles.selected : ''}`}
                                        onClick={() => setSelectedVehicle(v)}
                                    >
                                        <div className={styles.vehicleInfo}>
                                            <strong>{v.make} {v.model}</strong>
                                            <span>{v.batteryCapacityKwh}kWh • {v.preferredConnector}</span>
                                        </div>
                                        {selectedVehicle?._id === v._id && <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cost Summary */}
                        <div className={styles.costSummary}>
                            <h4>Payment Summary</h4>
                            <div className={styles.costDetails}>
                                <div className={styles.costRow}>
                                    <span>Estimated Energy:</span>
                                    <span>{selectedVehicle ? (selectedVehicle.batteryCapacityKwh * 0.8).toFixed(1) : '32.0'} kWh</span>
                                </div>
                                <div className={styles.costRow}>
                                    <span>Rate:</span>
                                    <span>₹{station.pricePerKWh}/kWh</span>
                                </div>
                                <div className={styles.costRow}>
                                    <span>Estimated Cost:</span>
                                    <span className={styles.totalCost}>
                                        {loadingCost ? (
                                            <>
                                                <FontAwesomeIcon icon={faSpinner} spin /> Calculating...
                                            </>
                                        ) : (
                                            `₹${estimatedCost.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className={styles.costRow}>
                                    <span>Wallet Balance:</span>
                                    <span className={!isBelowMinBalance ? styles.sufficient : styles.insufficient}>
                                        ₹{walletBalance.toFixed(2)}
                                    </span>
                                </div>
                                
                                {/* Balance Alert */}
                                {isBelowMinBalance && (
                                    <div className={styles.balanceAlert}>
                                        <FontAwesomeIcon icon={faWallet} />
                                        <span> Minimum wallet balance must be ₹500</span>
                                        <button onClick={handleAddBalance} className={styles.addBalanceBtn}>
                                            Add Money
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Actions */}
                    <div className={styles.modalActions}>
                        <button 
                            className={styles.cancelBtn}
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button 
                            className={styles.confirmBtn}
                            onClick={handleConfirm}
                            disabled={!isFormValid}
                        >
                            {loading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin /> Processing...
                                </>
                            ) : (
                                "Confirm Booking"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedBookingModal;