import { useState } from 'react';
import styles from "../css/history.module.css";

const TransactionDetailModal = ({ transaction, onClose, styles }) => { 
  if (!transaction) {
    return null;
  }

  const formattedDate = transaction.createdAt.toLocaleString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  // Determine styles for the amount display
  const amountClass = transaction.type === "credit"
    ? `${styles.walletSuccess} fw-bold`
    : `${styles.walletDanger} fw-bold`;

  const amountSign = transaction.type === "credit" ? "+" : "-";

  return (
    <div className="modal fade show" style={{ display: 'block', zIndex: 1060 , borderRadius : '2rem'}} tabIndex="-1" role="dialog" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-lg text-white" role="document" onClick={e => e.stopPropagation()}>
        <div className="modal-content shadow-lg border-0 rounded-4" >
          
          <div className={`modal-header border-0 rounded-top-4 text-white ${styles.modalHeaderBg || 'bg-dark'}`}>
            <h5 className="modal-title fw-bold text-white">Transaction Details</h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-0">
            <div className={`py-3 text-center rounded-bottom-4 ${transaction.type === "credit" ? 'bg-light-green' : 'bg-light-red'}`}>
              <small className="text-dark fw-bold text-uppercase d-block mb-1">Transaction Amount</small>
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
                <strong>Description:</strong> <br/>
                <span className="text-wrap">{transaction.description}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Type:</strong>
                <span className="text-capitalize badge bg-info">{transaction.type}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Status:</strong>
                <span className="text-capitalize badge bg-success">{transaction.status}</span>
              </li>
              
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Method:</strong>
                <span className="text-wrap">{transaction.method}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. DEMO DATA ---

const paymentHistory = [
  {
    _id: "1",
    type: "credit",
    amount: 500,
    method: "UPI",
    description: "Wallet Recharge",
    referenceId: "TXN12345",
    status: "completed",
    createdAt: new Date("2025-09-20T10:30:00"),
  },
  {
    _id: "2",
    type: "debit",
    amount: 200,
    method: "Card",
    description: "Charging Session",
    referenceId: "TXN12346",
    status: "completed",
    createdAt: new Date("2025-09-21T14:15:00"),
  },
  {
    _id: "3",
    type: "credit",
    amount: 1000,
    method: "UPI",
    description: "Wallet Recharge",
    referenceId: "TXN12347",
    status: "completed",
    createdAt: new Date("2025-09-22T09:00:00"),
  },
];


const History = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleRowClick = (txn) => {
    setSelectedTransaction(txn);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Payment History</h2>

      {paymentHistory.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No payment history available.
        </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className={`table-dark ${styles.tableDark}`}>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((txn) => (
              <tr
                key={txn._id}
                onClick={() => handleRowClick(txn)}
                style={{ cursor: 'pointer' }}
                title="Click for details"
              >
                <td>{txn.createdAt.toLocaleString()}</td>
                <td className="text-capitalize">{txn.type}</td>
                <td
                  className={
                    txn.type === "credit"
                      ? `${styles.walletSuccess} fw-bold`
                      : `${styles.walletDanger} fw-bold`
                  }
                >
                  {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
                </td>
                <td>{txn.method}</td>
                <td>{txn.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
          styles={styles}
        />
      )}

      {selectedTransaction && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default History;