import { useState, useEffect } from "react";
import { Edit3, Plus, CreditCard, Wallet, Trash2 } from "lucide-react";
import styles from "../css/payment.module.css";

// Badge for payment type
const PaymentTypeBadge = ({ type }) => {
    return (
        <span
            className={`${styles.typeBadge} ${type === "upi" ? styles.upi : styles.card
                }`}
        >
            {type.toUpperCase()}
        </span>
    );
};

const PaymentCard = ({ payment, onEdit, onDelete }) => {
    return (
        <div className={`card shadow-sm w-100 ${styles.cardContainer}`}>
            <div className="card-body d-flex flex-wrap flex-column justify-content-between">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title mb-0 d-flex align-items-center gap-2">
                        {payment.type === "upi" ? (
                            <Wallet size={22} className="text-primary" />
                        ) : (
                            <CreditCard size={22} className="text-primary" />
                        )}
                        {payment.type === "upi" ? "UPI Payment" : "Card Payment"}
                        {payment.isDefault && (
                            <span className="badge bg-success ms-2">Default</span>
                        )}
                    </h5>

                    <div className="d-flex gap-2">
                        <button
                            onClick={() => onEdit(payment)}
                            className={`btn btn-outline-success btn-sm px-2 py-1 ${styles.editButton}`}
                            title="Edit Payment Method"
                        >
                            <Edit3 size={12} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => onDelete(payment._id)}
                            className={`btn btn-outline-danger btn-sm px-2 py-1 ${styles.deleteButton}`}
                            title="Delete Payment Method"
                        >
                            <Trash2 size={12} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Details */}
                <div className="mt-3 d-flex justify-content-between align-items-center">
                    {payment.type === "upi" ? (
                        <small className="text-muted">UPI ID: {payment.upiId}</small>
                    ) : (
                        <small className="text-muted">
                            Card: **** **** **** {payment.card.cardNumberMasked} <br />
                            Holder: {payment.card.cardHolder} <br />
                            Expiry: {payment.card.expiryMonth}/{payment.card.expiryYear}
                        </small>
                    )}
                    <div className="align-self-end">
                        <PaymentTypeBadge type={payment.type} />
                    </div>
                </div>
            </div>
        </div>
    );
};


const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const [formData, setFormData] = useState({
        type: "upi",
        upiId: "",
        card: {
            cardNumberMasked: "",
            cardHolder: "",
            expiryMonth: "",
            expiryYear: "",
        },
        isDefault: false,
    });

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/payment-methods`,
                { credentials: "include" }
            );
            if (!res.ok) throw new Error("Failed to fetch payments");
            const data = await res.json();
            setPayments(data.paymentMethods);
        } catch (err) {
            console.error("Error fetching payments:", err);
        }
    };

    const openAddModal = () => {
        setEditingPayment(null);
        setFormData({
            type: "upi",
            upiId: "",
            card: { cardNumberMasked: "", cardHolder: "", expiryMonth: "", expiryYear: "" },
            isDefault: false,
        });
        setShowModal(true);
    };

    const openEditModal = (payment) => {
        setEditingPayment(payment);
        setFormData(payment);
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("card.")) {
            const key = name.split(".")[1];
            setFormData({ ...formData, card: { ...formData.card, [key]: value } });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingPayment ? "PUT" : "POST";
            const url = editingPayment
                ? `${import.meta.env.VITE_SERVER_URL}/api/payment-methods/${editingPayment._id}`
                : `${import.meta.env.VITE_SERVER_URL}/api/payment-methods`;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to save payment method");
            }

            await fetchPayments();
            setShowModal(false);
        } catch (err) {
            console.error("Error saving payment:", err);
            alert("Error saving payment: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this payment method?"))
            return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/payment-methods/${id}`,
                { method: "DELETE", credentials: "include" }
            );

            if (!res.ok) throw new Error("Failed to delete payment method");
            await fetchPayments();
        } catch (err) {
            console.error("Error deleting payment:", err);
            alert("Error deleting payment: " + err.message);
        }
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h2 className="mb-4">Payment Methods</h2>
            <hr className="mb-4" />

            <button
                className="btn btn-outline-success px-2 py-1 mb-4 d-flex align-items-center gap-2"
                onClick={openAddModal}
            >
                <Plus size={15} strokeWidth={4} />
                <span>Add New Payment</span>
            </button>

            {payments.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    No payment methods added yet. Click "Add New Payment" to get started!
                </div>
            ) : (
                <div className="row g-4">
                    {payments.map((p) => (
                        <div
                            key={p._id}
                            className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-wrap"
                        >
                            <PaymentCard
                                payment={p}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <form className="modal-content" onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingPayment ? "Edit Payment" : "Add Payment"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {/* Type Selector */}
                                <div className="mb-3">
                                    <label className="form-label">Payment Type</label>
                                    <select
                                        className={`form-select ${styles.dropdown}`}
                                        name="type"
                                        value={formData.type}
                                        onChange={handleFormChange}
                                    >
                                        <option value="upi">UPI</option>
                                        <option value="card">Card</option>
                                    </select>
                                </div>

                                {formData.type === "upi" && (
                                    <div className="mb-3">
                                        <label className="form-label">UPI ID</label>
                                        <input
                                            type="text"
                                            className="form-control px-4 py-2 rounded-3"
                                            name="upiId"
                                            placeholder="example@upi"
                                            value={formData.upiId}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </div>
                                )}

                                {formData.type === "card" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Card Number (Last 4)</label>
                                            <input
                                                type="text"
                                                className="form-control px-4 py-2 rounded-3"
                                                name="card.cardNumberMasked"
                                                placeholder="1234"
                                                maxLength={4}
                                                value={formData.card.cardNumberMasked}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Card Holder</label>
                                            <input
                                                type="text"
                                                className="form-control px-4 py-2 rounded-3"
                                                name="card.cardHolder"
                                                placeholder="John Doe"
                                                value={formData.card.cardHolder}
                                                onChange={handleFormChange}
                                                required
                                            />
                                        </div>
                                        <div className="d-flex gap-3">
                                            <div className="mb-3 flex-fill">
                                                <label className="form-label">Expiry Month</label>
                                                <input
                                                    type="text"
                                                    className="form-control px-4 py-2 rounded-3"
                                                    name="card.expiryMonth"
                                                    placeholder="MM"
                                                    maxLength={2}
                                                    value={formData.card.expiryMonth}
                                                    onChange={handleFormChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3 flex-fill">
                                                <label className="form-label">Expiry Year</label>
                                                <input
                                                    type="text"
                                                    className="form-control px-4 py-2 rounded-3"
                                                    name="card.expiryYear"
                                                    placeholder="YY"
                                                    maxLength={2}
                                                    value={formData.card.expiryYear}
                                                    onChange={handleFormChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className={`form-check-input ${styles["checkbox-green"]}`}
                                        id="isDefault"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleFormChange}
                                    />
                                    <label className="form-check-label" htmlFor="isDefault">
                                        Set as Default
                                    </label>
                                </div>


                            </div>
                            <div className="modal-footer gap-2">
                                <button
                                    type="button"
                                    className={`btn btn-danger px-2 py-1 ${styles.cancelBtn}`}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-success px-2 py-1 ${styles.saveBtn}`}
                                >
                                    {editingPayment ? "Save Changes" : "Add Payment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal backdrop */}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default Payment;