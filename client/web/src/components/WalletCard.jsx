import { useState, useEffect } from "react";
import {
  Wallet2,
  Gift,
  CreditCard,
  Plus,
  AlertTriangle,
  Star,
} from "lucide-react";
import styles from "../css/walletcard.module.css";

const WalletCard = () => {
  const [wallet, setWallet] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const minBalance = 500;

  useEffect(() => {
    fetchWallet();
    fetchPaymentMethods();
  }, []);

  // ✅ Fetch wallet info
  const fetchWallet = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/wallet`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch wallet");
      const data = await res.json();
      setWallet(data.wallet);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    }
  };

  // ✅ Fetch payment methods
  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/payment-methods`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch payment methods");
      const data = await res.json();
      setPaymentMethods(Array.isArray(data.paymentMethods) ? data.paymentMethods : []);
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  // ✅ Loyalty level helper
  const getLoyaltyLevel = (points) => {
    if (points >= 1000) return { label: "Platinum", color: "text-primary" };
    if (points >= 500) return { label: "Gold", color: "text-warning" };
    if (points >= 200) return { label: "Silver", color: "text-secondary" };
    return { label: "New Member", color: "text-muted" };
  };

  // ✅ Load Razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // ✅ Handle Add Balance (Razorpay)
  const handleAddBalance = async (e) => {
    e.preventDefault();
    if (!amount || !selectedMethod) {
      alert("Please enter amount and select a payment method");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/wallet/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ amount: parseFloat(amount) }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error("Failed to create Razorpay order");

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "MyApp Wallet",
        description: "Add balance to wallet",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/wallet/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  amount: parseFloat(amount),
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok)
              throw new Error(verifyData.message || "Payment verification failed");

            alert("Payment successful! Wallet updated.");
            await fetchWallet();
            setShowModal(false);
            setAmount("");
            setSelectedMethod("");
          } catch (err) {
            alert("Error verifying payment: " + err.message);
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#198754" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error adding balance:", err);
      alert("Error adding balance: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading state
  if (!wallet) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Loading Wallet...</p>
      </div>
    );
  }

  const balance = wallet.balance ?? 0;
  const points = wallet.loyaltyPoints ?? 0;
  const isLowBalance = balance < minBalance;
  const loyalty = getLoyaltyLevel(points);

  // Find full details of default payment method
  const defaultPaymentMethod =
    paymentMethods.find((m) => m._id === wallet.defaultPaymentMethod) || null;

  const defaultPayment =
    defaultPaymentMethod
      ? defaultPaymentMethod.type === "upi"
        ? `UPI: ${defaultPaymentMethod.upiId}`
        : `Card: **** ${defaultPaymentMethod.card?.cardNumberMasked || "XXXX"}`
      : "None";


  return (
    <div
      className={`card shadow-sm w-100 ${styles.cardContainer} ${isLowBalance ? styles.lowBalance : ""
        }`}
    >
      <div className={`card-body ${styles.cardBody}`}>
        {/* Left Section */}
        <div className={styles.contentSection}>
          <div className={styles.header}>
            <h3 className="card-title mb-0 d-flex align-items-center gap-2">
              {/* <Wallet2 size={24} className={styles.textSuccess} /> */}
              Wallet
            </h3>
            <button
              onClick={() => setShowModal(true)}
              className={`btn btn-outline-success btn-sm ${styles.editButton}`}
              title="Add Balance"
            >
              <Plus size={12} strokeWidth={3} />
              <span>Add Balance</span>
            </button>
          </div>

          <div className={styles.walletItem}>
            <div className="d-flex align-items-center gap-2">
              <Wallet2 size={18} className="text-primary" />
              <span className="fw-semibold">Balance:</span>
            </div>
            <span
              className={`fw-bold ${isLowBalance ? "text-danger" : styles.textSuccess
                }`}
            >
              ₹{balance.toFixed(2)}
            </span>
          </div>

          {isLowBalance && (
            <div className={`${styles.warningBox} d-flex align-items-center gap-2`}>
              <AlertTriangle size={16} className="text-danger" />
              <small className="text-danger">
                Minimum balance ₹{minBalance} required!
              </small>
            </div>
          )}

          <div className={styles.walletItem}>
            <div className="d-flex align-items-center gap-2">
              <Gift size={18} className="text-warning" />
              <span className="fw-semibold">Loyalty Points:</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-dark fw-bold">{points}</span>
              <small className={`${loyalty.color} d-flex align-items-center gap-1`}>
                <Star size={14} /> {loyalty.label}
              </small>
            </div>
          </div>

          <div className={styles.walletItem}>
            <div className="d-flex align-items-center gap-2">
              <CreditCard size={18} className="text-secondary" />
              <span className="fw-semibold">Default Payment:</span>
            </div>
            <span className="text-muted">{defaultPayment}</span>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className={styles.imageSection}>
          <img
            src="/images/wallet-illustration.jpg"
            alt="Wallet Illustration"
            className={styles.walletImage}
          />
        </div>
      </div>

      {/* Add Balance Modal */}
      {showModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <form className="modal-content" onSubmit={handleAddBalance}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Balance</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Enter Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Payment Method</label>
                    <select
                      className="form-select"
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      required
                    >
                      <option value="">Choose Method</option>
                      {paymentMethods.length > 0 ? (
                        paymentMethods.map((m) => (
                          <option key={m._id} value={m._id}>
                            {m.type === "upi"
                              ? `UPI: ${m.upiId}`
                              : `Card: **** ${m.card?.cardNumberMasked}`}
                          </option>
                        ))
                      ) : (
                        <option disabled>No methods found</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="modal-footer gap-2">
                  <button
                    type="button"
                    className="btn btn-danger px-3"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success px-3"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Proceed to Pay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default WalletCard;