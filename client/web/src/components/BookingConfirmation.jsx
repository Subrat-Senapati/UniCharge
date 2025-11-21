import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimes,
    faBolt,
    faCalendar,
    faClock,
    faMapMarkerAlt,
    faPlug,
    faWallet,
    faReceipt,
    faCopy,
    faList
} from "@fortawesome/free-solid-svg-icons";
import styles from "../css/bookingconfirmation.module.css";

const BookingConfirmation = ({ 
    booking, 
    station, 
    connector, 
    onClose, 
    onViewAllBookings 
}) => {
    // Enhanced debug logging
    console.log('🔍 BookingConfirmation rendered with:', {
        hasBooking: !!booking,
        booking: booking,
        hasStation: !!station,
        station: station,
        hasConnector: !!connector,
        connector: connector
    });

    if (!booking) {
        console.log('❌ No booking data, returning null');
        return null;
    }

    console.log('✅ Rendering BookingConfirmation with data');

    const handleCopyBookingId = () => {
        navigator.clipboard.writeText(booking._id);
        alert('Booking ID copied to clipboard!');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={styles.bookingConfirmation}>
            <div className={styles.confirmationOverlay} onClick={onClose}></div>
            
            <div className={styles.confirmationContent}>
                {/* Header */}
                <div className={styles.confirmationHeader}>
                    <div className={styles.headerLeft}>
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.successIcon} />
                        <div className={styles.headerText}>
                            <h2>Booking Confirmed!</h2>
                            <p>Your charging session has been successfully booked</p>
                        </div>
                    </div>
                    <button 
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close confirmation"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Booking Details */}
                <div className={styles.bookingDetails}>
                    {/* Quick Summary */}
                    <div className={styles.quickSummary}>
                        <div className={styles.summaryItem}>
                            <FontAwesomeIcon icon={faReceipt} />
                            <div>
                                <span className={styles.summaryLabel}>Booking ID</span>
                                <span className={styles.summaryValue}>
                                    {booking._id || 'No ID'}
                                    <button 
                                        className={styles.copyButton}
                                        onClick={handleCopyBookingId}
                                        title="Copy Booking ID"
                                    >
                                        <FontAwesomeIcon icon={faCopy} />
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className={styles.summaryItem}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <div>
                                <span className={styles.summaryLabel}>Status</span>
                                <span className={`${styles.status} ${styles.statusConfirmed}`}>
                                    {booking.status || 'Confirmed'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Station Details */}
                    <div className={styles.detailSection}>
                        <h3>
                            <FontAwesomeIcon icon={faBolt} />
                            Station Information
                        </h3>
                        <div className={styles.detailGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    Station Name
                                </span>
                                <span className={styles.detailValue}>
                                    {station?.station || 'Unknown Station'}
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Brand</span>
                                <span className={styles.detailValue}>
                                    {station?.brand || 'Unknown Brand'}
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>
                                    <FontAwesomeIcon icon={faPlug} />
                                    Connector
                                </span>
                                <span className={styles.detailValue}>
                                    {connector?.type || 'Unknown'} • {connector?.power || '0'}kW
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Power</span>
                                <span className={styles.detailValue}>
                                    {station?.powerKW || '0'} kW
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Charging Schedule */}
                    <div className={styles.detailSection}>
                        <h3>
                            <FontAwesomeIcon icon={faCalendar} />
                            Charging Schedule
                        </h3>
                        <div className={styles.scheduleGrid}>
                            <div className={styles.scheduleItem}>
                                <div className={styles.timeSlot}>
                                    <span className={styles.timeLabel}>Start Time</span>
                                    <span className={styles.timeValue}>
                                        {booking.scheduledStart ? formatTime(booking.scheduledStart) : 'N/A'}
                                    </span>
                                    <span className={styles.dateValue}>
                                        {booking.scheduledStart ? formatDate(booking.scheduledStart) : 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.scheduleDivider}>
                                <div className={styles.duration}>
                                    <FontAwesomeIcon icon={faClock} />
                                    {booking.estimatedDuration || 60} min
                                </div>
                            </div>
                            <div className={styles.scheduleItem}>
                                <div className={styles.timeSlot}>
                                    <span className={styles.timeLabel}>End Time</span>
                                    <span className={styles.timeValue}>
                                        {booking.scheduledEnd ? formatTime(booking.scheduledEnd) : 'N/A'}
                                    </span>
                                    <span className={styles.dateValue}>
                                        {booking.scheduledEnd ? formatDate(booking.scheduledEnd) : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className={styles.detailSection}>
                        <h3>
                            <FontAwesomeIcon icon={faWallet} />
                            Payment Summary
                        </h3>
                        <div className={styles.paymentGrid}>
                            <div className={styles.paymentItem}>
                                <span className={styles.paymentLabel}>Estimated Cost</span>
                                <span className={styles.paymentValue}>
                                    ₹{booking.estimatedCost?.toFixed(2) || '0.00'}
                                </span>
                            </div>
                            <div className={styles.paymentItem}>
                                <span className={styles.paymentLabel}>Payment Method</span>
                                <span className={styles.paymentValue}>Wallet</span>
                            </div>
                            <div className={styles.paymentItem}>
                                <span className={styles.paymentLabel}>Payment Status</span>
                                <span className={`${styles.status} ${styles.statusPaid}`}>
                                    Paid
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className={styles.notesSection}>
                        <h4>Important Information</h4>
                        <ul className={styles.notesList}>
                            <li>📍 Arrive at the station 5 minutes before your scheduled time</li>
                            <li>⚡ Your session will start automatically when you plug in</li>
                            <li>💰 You'll only be charged for the actual energy consumed</li>
                            <li>⏰ Session will automatically end at the scheduled time</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;