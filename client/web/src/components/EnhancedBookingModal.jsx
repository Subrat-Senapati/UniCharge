import { useState } from 'react';
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

// Enhanced booking modal with vehicle selection only (wallet-only payments)
const EnhancedBookingModal = ({ station, onClose, onConfirm, user }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
  
  // Calculate estimated cost based on vehicle battery
  const calculateEstimatedCost = (vehicleId, stationPrice) => {
    const vehicle = user.vehicles.find(v => v._id === vehicleId);
    if (!vehicle) return 0;
    
    // Assume 80% charging (typical use case)
    const estimatedKwh = vehicle.batteryCapacityKwh * 0.8;
    return estimatedKwh * stationPrice;
  };

  const handleConfirm = async () => {
    if (!selectedVehicle) {
      alert("Please select a vehicle");
      return;
    }

    setBookingLoading(true);
    await onConfirm({
      station,
      vehicle: selectedVehicle,
      estimatedCost
    });
    setBookingLoading(false);
  };

  const handleAddBalance = () => {
    onClose(); // Close the booking modal first
    navigate('/home/wallet'); // Navigate to wallet page
  };

  const hasSufficientBalance = user.wallet.balance >= estimatedCost;
  const balanceShortage = estimatedCost - user.wallet.balance;

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
            {/* Station Details */}
            <div className={styles.bookingSection}>
              <h4>
                <FontAwesomeIcon icon={faBolt} />
                Station Details
              </h4>
              <div className={styles.stationInfo}>
                <p><strong>{station.station}</strong> ({station.brand})</p>
                <p>Power: {station.powerKW} kW</p>
                <p>Price: ₹{station.pricePerKWh}/kWh</p>
                <p>Connector: {station.connectorType || 'CCS2'}</p>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className={styles.bookingSection}>
              <h4>Select Your Vehicle</h4>
              <div className={styles.vehicleGrid}>
                {user.vehicles.map(vehicle => (
                  <div 
                    key={vehicle._id}
                    className={`${styles.vehicleCard} ${selectedVehicle?._id === vehicle._id ? styles.selected : ''}`}
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      const cost = calculateEstimatedCost(vehicle._id, station.pricePerKWh);
                      setEstimatedCost(cost);
                    }}
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

            {/* Cost Summary */}
            <div className={styles.costSummary}>
              <h4>Payment Summary</h4>
              <div className={styles.costDetails}>
                <div className={styles.costRow}>
                  <span>Estimated Energy:</span>
                  <span>{selectedVehicle ? (selectedVehicle.batteryCapacityKwh * 0.8).toFixed(1) : 0} kWh</span>
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
                    ₹{user.wallet.balance}
                  </span>
                </div>
                
                {/* Balance Alert in the same row */}
                {!hasSufficientBalance && selectedVehicle && (
                  <div className={styles.balanceAlertRow}>
                    <div className={styles.alertIcon}>
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <div className={styles.alertText}>
                      Shortage: <strong>₹{balanceShortage.toFixed(2)}</strong>
                    </div>
                    <button 
                      className={styles.addBalanceBtn}
                      onClick={handleAddBalance}
                    >
                      <FontAwesomeIcon icon={faWallet} />
                      Add Balance
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
              disabled={bookingLoading}
            >
              Cancel
            </button>
            <button 
              className={styles.confirmBtn}
              disabled={!selectedVehicle || bookingLoading || !hasSufficientBalance}
              onClick={handleConfirm}
            >
              {bookingLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Processing...
                </>
              ) : (
                `Pay from Wallet - ₹${estimatedCost.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookingModal;