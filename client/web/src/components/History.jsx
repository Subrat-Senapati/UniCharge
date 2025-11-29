import { useState, useEffect } from "react";
import styles from "../css/history.module.css";

const TransactionDetailModal = ({ transaction, onClose, styles }) => {
  if (!transaction) return null;

  const formattedDate = new Date(transaction.createdAt).toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCredit = transaction.type === "credit";
  const amountSign = isCredit ? "+" : "-";
  const amountClass = isCredit
    ? `${styles.walletSuccess} fw-bold`
    : `${styles.walletDanger} fw-bold`;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", zIndex: 1060 }}
      tabIndex="-1"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg text-white"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div
            className={`modal-header border-0 rounded-top-4 text-white ${styles.modalHeaderBg || "bg-dark"}`}
          >
            <h5 className="modal-title fw-bold text-white">
              Transaction Details
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body p-0">
            <div
              className={`py-3 text-center rounded-bottom-4 ${isCredit ? "bg-light-green" : "bg-light-red"
                }`}
            >
              <small className="text-dark fw-bold text-uppercase d-block mb-1">
                Transaction Amount
              </small>
              <h3 className={amountClass}>
                {amountSign}₹{transaction.amount}
              </h3>
            </div>

            <ul className="list-group list-group-flush border-top">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Reference ID:</strong>
                <span className="text-muted small">{transaction.referenceId}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Date:</strong>
                <span className="text-muted">{formattedDate}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Description:</strong>
                <span className="text-wrap">{transaction.description}</span>
              </li>
              {!isCredit && (
                <>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Vehicle:</strong>
                    <span className="text-wrap">{transaction.vehicleName}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Station:</strong>
                    <span className="text-wrap">{transaction.stationName}</span>
                  </li>
                </>
              )}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Method:</strong>
                <span className="text-wrap">{transaction.method}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Type:</strong>
                <span className="text-capitalize badge bg-info">
                  {transaction.type}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Status:</strong>
                <span
                  className={`text-capitalize badge ${transaction.status === "completed"
                    ? "bg-success"
                    : transaction.status === "pending"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                    }`}
                >
                  {transaction.status}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const History = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    method: "all",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);


  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/wallet/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // optional, if your API uses cookies/session
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPaymentHistory(data.paymentHistory || []);
      setFilteredTransactions(data.paymentHistory || []);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setLoading(false);
    }
  };


  // Filter logic
  useEffect(() => {
    const filtered = paymentHistory.filter((txn) => {
      const matchType =
        filters.type === "all" || txn.type === filters.type;
      const matchStatus =
        filters.status === "all" || txn.status === filters.status;
      return matchType && matchStatus;
    });
    setFilteredTransactions(filtered);
  }, [filters, paymentHistory]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Payment History</h2>
      <hr className="mb-4" />

      {/* 🔍 Filter Section */}
      <div className="row mb-4 g-5">
        <div className="col-md-4">
          <label className="form-label fw-semibold">Type</label>
          <select
            className="form-select"
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-semibold">Status</label>
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* 🧾 Cards */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3 fw-semibold">Loading history...</p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="alert alert-info text-center">
          No transactions found.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {filteredTransactions.map((txn) => (
            <div
              key={txn._id}
              className={`card shadow-sm p-3 border-0 rounded-4 ${styles.historyCard}`}
              onClick={() => setSelectedTransaction(txn)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h6 className="fw-bold mb-1">{txn.description}</h6>
                  <small className="text-muted">
                    {new Date(txn.createdAt).toLocaleString("en-IN")}
                  </small>
                </div>

                <div>
                  <span
                    className={`badge me-2 ${txn.type === "credit" ? "bg-success" : "bg-danger"
                      }`}
                  >
                    {txn.type}
                  </span>
                  <span
                    className={`fw-bold ${txn.type === "credit"
                        ? styles.walletSuccess
                        : styles.walletDanger
                      }`}
                  >
                    {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap">
                <small className="text-muted">
                  Method: <strong>{txn.method}</strong>
                </small>
                <span
                  className={`badge text-capitalize ${txn.status === "completed"
                      ? "bg-success"
                      : txn.status === "pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Modal */}
      {selectedTransaction && (
        <>
          <TransactionDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            styles={styles}
          />
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default History;