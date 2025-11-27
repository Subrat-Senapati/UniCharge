import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/enhancedbookingmodal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCheckCircle, 
    faSpinner, 
    faExclamationTriangle,
    faTimes,
    faWallet,
    faBolt
} from '@fortawesome/free-solid-svg-icons';

// Enhanced booking modal without duration selection
const EnhancedBookingModal = ({ station, connector, isOpen, onClose, onConfirm, loading = false, user }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const navigate = useNavigate();
  
  // Calculate estimated cost based on vehicle battery (80% charging)
  const calculateEstimatedCost = (vehicle, stationPrice) => {
    if (!vehicle) return 0;
    const estimatedKwh = vehicle.batteryCapacityKwh * 0.8;
    return estimatedKwh * stationPrice;
  };

  // Update cost when vehicle changes
  useEffect(() => {
    if (selectedVehicle && station) {
      const cost = calculateEstimatedCost(selectedVehicle, station.pricePerKWh);
      setEstimatedCost(cost);
    } else if (station) {
      // Default cost if no vehicle selected
      const defaultKwh = 40 * 0.8; // Assume 40kWh battery
      setEstimatedCost(defaultKwh * station.pricePerKWh);
    }
  }, [selectedVehicle, station]);

  const handleConfirm = async () => {
    // Auto-calculate times: start 30 minutes from now, end based on estimated charging
    const scheduledStart = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    
    // Estimate charging time based on vehicle battery or default
    const batteryCapacity = selectedVehicle?.batteryCapacityKwh || 40;
    const estimatedKwh = batteryCapacity * 0.8;
    const chargingTimeHours = estimatedKwh / (connector?.power || 50); // hours to charge
    const chargingTimeMinutes = Math.ceil(chargingTimeHours * 60);
    
    const scheduledEnd = new Date(scheduledStart.getTime() + chargingTimeMinutes * 60 * 1000);

    const bookingData = {
      stationId: station.id,
      connectorId: connector.id,
      scheduledStart: scheduledStart.toISOString(),
      scheduledEnd: scheduledEnd.toISOString(),
      estimatedDuration: chargingTimeMinutes,
      vehicleId: selectedVehicle?._id || "",
      estimatedCost: estimatedCost
    };

    await onConfirm(bookingData);
  };

  const handleAddBalance = () => {
    onClose();
    navigate('/home/wallet');
  };

  // Mock user data if not provided (for testing)
  const currentUser = user || {
    vehicles: [
      { _id: '1', make: 'Tesla', model: 'Model 3', batteryCapacityKwh: 75, preferredConnector: 'CCS' },
      { _id: '2', make: 'Tata', model: 'Nexon EV', batteryCapacityKwh: 40, preferredConnector: 'Type2' }
    ],
    wallet: { balance: 500 }
  };

  const hasSufficientBalance = currentUser.wallet.balance >= estimatedCost;
  const balanceShortage = estimatedCost - currentUser.wallet.balance;

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
                <p>Connector: {connector?.type} • {connector?.power}kW • {connector?.output}</p>
                <p>Status: <span className={connector?.status === 'available' ? styles.available : styles.busy}>
                  {connector?.status}
                </span></p>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className={styles.bookingSection}>
              <h4>Select Your Vehicle (Optional)</h4>
              <p className={styles.vehicleNote}>Select your vehicle for accurate cost estimation</p>
              <div className={styles.vehicleGrid}>
                {currentUser.vehicles.map(vehicle => (
                  <div 
                    key={vehicle._id}
                    className={`${styles.vehicleCard} ${selectedVehicle?._id === vehicle._id ? styles.selected : ''}`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className={styles.vehicleInfo}>
                      <strong>{vehicle.make} {vehicle.model}</strong>
                      <span>Battery: {vehicle.batteryCapacityKwh} kWh</span>
                      <span>Connector: {vehicle.preferredConnector}</span>
                    </div>
                    {selectedVehicle?._id === vehicle._id && (
                      <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Information */}
            <div className={styles.bookingInfo}>
              <h4>Booking Information</h4>
              <div className={styles.bookingDetails}>
                <p>⏰ Your session will start automatically when you arrive at the station</p>
                <p>⚡ Charging will continue until your vehicle reaches 80% capacity</p>
                <p>💰 You only pay for the actual energy consumed</p>
                {selectedVehicle && (
                  <p>🔋 Estimated charging time: ~{Math.ceil((selectedVehicle.batteryCapacityKwh * 0.8) / (connector?.power || 50) * 60)} minutes</p>
                )}
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
                  <span className={styles.totalCost}>₹{estimatedCost.toFixed(2)}</span>
                </div>
                <div className={styles.costRow}>
                  <span>Wallet Balance:</span>
                  <span className={hasSufficientBalance ? styles.sufficient : styles.insufficient}>
                    ₹{currentUser.wallet.balance.toFixed(2)}
                  </span>
                </div>
                
                {/* Balance Alert */}
                {!hasSufficientBalance && (
                  <div className={styles.balanceAlert}>
                    <div className={styles.alertContent}>
                      <div className={styles.alertIcon}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                      </div>
                      <div className={styles.alertText}>
                        <strong>Insufficient Balance</strong>
                        <span>Shortage: ₹{balanceShortage.toFixed(2)}</span>
                      </div>
                      <button 
                        className={styles.addBalanceBtn}
                        onClick={handleAddBalance}
                      >
                        <FontAwesomeIcon icon={faWallet} />
                        Add Balance
                      </button>
                    </div>
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
              disabled={loading || !hasSufficientBalance}
              onClick={handleConfirm}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Processing...
                </>
              ) : (
                `Confirm Booking - ₹${estimatedCost.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookingModal;