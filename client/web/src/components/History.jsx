
// Demo data
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
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Payment History</h2>

      {paymentHistory.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No payment history available.
        </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
              <tr key={txn._id}>
                <td>{txn.createdAt.toLocaleString()}</td>
                <td className="text-capitalize">{txn.type}</td>
                <td
                  className={
                    txn.type === "credit" ? "text-success fw-bold" : "text-danger fw-bold"
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
    </div>
  );
};

export default History;