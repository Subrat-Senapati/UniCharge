import { useState, useEffect, useMemo } from "react";
import {
  Wallet2,
  Gift,
  CreditCard,
  Plus,
  AlertTriangle,
  Star,
} from "lucide-react";
import styles from "../css/walletcard.module.css";
import { useAuth } from "../context/AuthContext";

const useLastMonthSpend = (userData) => {
  const lastMonthSpend = useMemo(() => {
    const paymentHistory = userData?.user?.paymentHistory || [];
    const now = new Date();
    
    // Calculate the start and end date for the last full month (e.g., if today is Nov 30, use Oct 1 to Oct 31)
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    
    const endDate = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0, 0));
    
    let lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    let lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const startDate = new Date(Date.UTC(lastMonthYear, lastMonth, 1, 0, 0, 0, 0));

    const totalSpend = paymentHistory
      .filter(transaction => {
        if (transaction.type !== 'debit') {
          return false;
        }

        const transactionDate = new Date(transaction.createdAt);

        return transactionDate >= startDate && transactionDate < endDate;
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return parseFloat(totalSpend.toFixed(2));
  }, [userData]);

  return lastMonthSpend;
};

const calculateAverageWalletBalance = (usersDataArray) => {
  if (!Array.isArray(usersDataArray) || usersDataArray.length === 0) {
    return 0.00;
  }

  const validBalances = usersDataArray
    .map(data => data?.user?.wallet?.balance) // ✅ fixed path
    .filter(balance => typeof balance === 'number' && balance >= 0);

  if (validBalances.length === 0) {
    return 0.00;
  }

  const totalBalance = validBalances.reduce((sum, bal) => sum + bal, 0);
  const avg = totalBalance / validBalances.length;

  return parseFloat(avg.toFixed(2));
};

const WalletCard = () => {
  const { user, fetchProfile } = useAuth()

  const [wallet, setWallet] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtherOption, setShowOtherOption] = useState(false);
  const [otherPaymentDetails, setOtherPaymentDetails] = useState({
    type: "",
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: ""
  });


  const minBalance = 500;
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const getAiSuggestion = async () => {
    setLoadingAi(true);
    try {
      const payload = {
        month: 11,
        year: 2025,
        avg_wallet_balance: calculateAverageWalletBalance([user]),
        avg_session_duration: 60,
        peak_hour_ratio: 0,
        avg_cost: 62,
        avg_cost_efficiency: 0,
        city: "Hyderabad",
        vehicle_type: "4W",
        subscription_type: "Premium",
        payment_mode: "UPI",
        charger_type: "Fast",
        sessions_per_user_month: 7,
        previous_month_spend: useLastMonthSpend,
        smoothing_factor: 0.5,
      };

      const res = await fetch(import.meta.env.VITE_WALLET_PREDICTION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setAiSuggestion(data);
    } catch (err) {
      console.error("AI fetch error", err);
    } finally {
      setLoadingAi(false);
    }
  };



  useEffect(() => {
    fetchWallet();
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [wallet]);

  // Set default payment method when modal opens or payment methods change
  useEffect(() => {
    if (showModal && wallet?.defaultPaymentMethod) {
      setSelectedMethod(wallet.defaultPaymentMethod);
    }
  }, [showModal, wallet?.defaultPaymentMethod, paymentMethods]);

  // Fetch wallet info
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

  // Fetch payment methods
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

  // Loyalty level helper
  const getLoyaltyLevel = (points) => {
    if (points >= 1000) return { label: "Platinum", color: "text-primary" };
    if (points >= 500) return { label: "Gold", color: "text-warning" };
    if (points >= 200) return { label: "Silver", color: "text-secondary" };
    return { label: "New Member", color: "text-muted" };
  };

  // Load Razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Handle Other Payment Method
  const handleOtherPayment = async (e) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    if (!otherPaymentDetails.type) {
      alert("Please select payment type");
      return;
    }

    try {
      setLoading(true);

      if (otherPaymentDetails.type === "razorpay") {
        // Use Razorpay for other payments
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

              setShowModal(false);
              setAmount("");
              setSelectedMethod("");
              setShowOtherOption(false);
              setOtherPaymentDetails({
                type: "",
                upiId: "",
                cardNumber: "",
                expiry: "",
                cvv: "",
                nameOnCard: ""
              });
              alert("Payment successful! Wallet updated.");
              await fetchWallet();
            } catch (err) {
              alert("Error verifying payment: " + err.message);
            }
          },
          upi: {
            flow: "intent",
          },
          prefill: {
            name: user.fullName || "User",
            email: user.email || "user@example.com",
            contact: user.phoneNumber || "9999999999",
          },
          theme: { color: "#198754" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        // Handle other payment types (custom implementation)
        alert(`Processing ${otherPaymentDetails.type} payment...`);
        // Add your custom payment processing logic here
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("Error processing payment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Balance (Existing payment methods)
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
          body: JSON.stringify({
            amount: parseFloat(amount),
            paymentMethodId: selectedMethod
          }),
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
                  paymentMethodId: selectedMethod,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok)
              throw new Error(verifyData.message || "Payment verification failed");

            setShowModal(false);
            setAmount("");
            setSelectedMethod("");
            alert("Payment successful! Wallet updated.");
            await fetchWallet();
          } catch (err) {
            alert("Error verifying payment: " + err.message);
          }
        },
        upi: {
          flow: "intent",
        },
        prefill: {
          name: user.fullName || "User",
          email: user.email || "user@example.com",
          contact: user.phoneNumber || "9999999999",
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

  // Reset modal state when closed
  const handleCloseModal = () => {
    setShowModal(false);
    setShowOtherOption(false);
    setSelectedMethod(wallet?.defaultPaymentMethod || "");
    setOtherPaymentDetails({
      type: "",
      upiId: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: ""
    });
  };

  // Loading state
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
              Wallet
            </h3>
            <button
              onClick={() => setShowModal(true)}
              className={`btn btn-outline-success btn-sm ${styles.addButton}`}
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

          <div className="d-flex align-items-center gap-3 mt-2">
            <button onClick={getAiSuggestion} className={styles.rgbButton} disabled={loadingAi}>
              {loadingAi ? "Loading..." : "AI Suggest"}
            </button>

            {aiSuggestion && (
              <div className={styles.aiSuggestBox}>
                <Wallet2 size={16} className="text-info" />
                <small className="fw-bold text-dark">
                  Required Addition This Month: 
                  <span className={styles.textSuccess}> ₹{aiSuggestion.suggested_monthly_wallet.toFixed(2)}</span>
                </small>
              </div>
            )}
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
              <form
                className="modal-content"
                onSubmit={showOtherOption ? handleOtherPayment : handleAddBalance}
              >
                <div className="modal-header">
                  <h5 className="modal-title">
                    {showOtherOption ? "Other Payment Method" : "Add Balance"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Enter Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control px-4 py-2 rounded-3"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      required
                    />
                  </div>

                  {!showOtherOption ? (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Select Payment Method</label>
                        <select
                          className={`form-select ${styles.dropdown}`}
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
                                {m._id === wallet.defaultPaymentMethod && " (Default)"}
                              </option>
                            ))
                          ) : (
                            <option disabled>No methods found</option>
                          )}
                          <option value="other">Other Payment Method</option>
                        </select>
                      </div>

                      {selectedMethod === "other" && (
                        <div className="mb-3">
                          <button
                            type="button"
                            className="btn btn-outline-primary w-100"
                            onClick={() => setShowOtherOption(true)}
                          >
                            Add New Payment Method
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="other-payment-options">
                      <div className="mb-3">
                        <label className="form-label">Select Payment Type</label>
                        <select
                          className="form-select"
                          value={otherPaymentDetails.type}
                          onChange={(e) => setOtherPaymentDetails({
                            ...otherPaymentDetails,
                            type: e.target.value
                          })}
                          required
                        >
                          <option value="">Choose Payment Type</option>
                          <option value="razorpay">Razorpay (Credit/Debit Card, UPI, Net Banking)</option>
                          <option value="paypal">PayPal</option>
                          <option value="stripe">Stripe</option>
                          <option value="bank_transfer">Bank Transfer</option>
                        </select>
                      </div>

                      {otherPaymentDetails.type === "razorpay" && (
                        <div className="alert alert-info">
                          <small>
                            You will be redirected to Razorpay secure payment gateway to complete your transaction.
                          </small>
                        </div>
                      )}

                      {/* Add more payment type specific fields here if needed */}
                    </div>
                  )}
                </div>

                <div className="modal-footer gap-2">
                  {showOtherOption && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowOtherOption(false)}
                    >
                      Back to Saved Methods
                    </button>
                  )}
                  <button
                    type="button"
                    className={`btn btn-danger ${styles.cancelBtn}`}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-success ${styles.saveBtn}`}
                    disabled={loading}
                  >
                    {loading ? "Processing..." :
                      showOtherOption ? "Proceed with Other Payment" : "Proceed to Pay"}
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