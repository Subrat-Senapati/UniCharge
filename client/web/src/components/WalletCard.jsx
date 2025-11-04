import { Wallet2, Gift, CreditCard, Plus, AlertTriangle } from "lucide-react";
import styles from "../css/walletcard.module.css";

const WalletCard = ({ wallet, onAddBalance }) => {
  const minBalance = 500;
  const isLowBalance = wallet.balance < minBalance;

  return (
    <div
      className={`card shadow-sm w-100 ${styles.cardContainer} ${isLowBalance ? styles.lowBalance : ""
        }`}
    >
      <div className={`card-body ${styles.cardBody}`}>

        {/* Left Section - Wallet Content */}
        <div className={styles.contentSection}>
          {/* Header */}
          <div className={styles.header}>
            <h3 className="card-title mb-0 d-flex align-items-center gap-2">
              {/* <Wallet2 size={25} strokeWidth={2.5} className={styles.textSuccess} /> */}
              Wallet
            </h3>
            <button
              onClick={onAddBalance}
              className={`btn btn-outline-success btn-sm ${styles.editButton}`}
              title="Add Balance"
            >
              <Plus size={12} strokeWidth={4} />
              <span>Add Balance</span>
            </button>
          </div>

          {/* Balance Section */}
          <div className={styles.walletItem}>
            <div className="d-flex align-items-center gap-2">
              <Wallet2 size={18} className="text-primary" />
              <span className="fw-semibold">Balance:</span>
            </div>
            <span
              className={`fw-bold ${isLowBalance ? "text-danger" : styles.textSuccess
                }`}
            >
              ₹{wallet.balance?.toFixed(2) ?? "0.00"}
            </span>
          </div>

          {/* Minimum balance warning */}
          {isLowBalance && (
            <div className={`${styles.warningBox} d-flex align-items-center gap-2`}>
              <AlertTriangle size={16} className="text-danger" />
              <small className="text-danger">
                Minimum balance ₹{minBalance} required!
              </small>
            </div>
          )}

          {/* Loyalty Points */}
          <div className={styles.walletItem}>
            <div className="d-flex align-items-center gap-2">
              <Gift size={18} className="text-warning" />
              <span className="fw-semibold">Loyalty Points:</span>
            </div>
            <span className="text-dark fw-bold">
              {wallet.loyaltyPoints ?? 0}
            </span>
          </div>

          {/* Default Payment Method */}
          <div className={styles.walletItem}>
            <div className="d-flex align-items-center gap-2">
              <CreditCard size={18} className="text-secondary" />
              <span className="fw-semibold">Default Payment:</span>
            </div>
            <span className="text-muted">
              {wallet.defaultPaymentMethod ? wallet.defaultPaymentMethod : "None"}
            </span>
          </div>
        </div>

        {/* Right Section - Wallet Image (Hidden on small screens) */}
        <div className={styles.imageSection}>
          <img
            src="/images/wallet-illustration.jpg"
            alt="Wallet Illustration"
            className={styles.walletImage}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletCard;