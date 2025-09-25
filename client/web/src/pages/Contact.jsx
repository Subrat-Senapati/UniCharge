import { useState } from "react";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";
import styles from "../css/contact.module.css";


const Contact = () => {
    const [feedback, setFeedback] = useState({
        name: "",
        email: "",
        subject: "",
        review: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const apiUrl = import.meta.env.VITE_SERVER_URL;
            const res = await fetch(`${apiUrl}/api/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feedback),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ Thank you! Your feedback has been submitted.");
                setFeedback({ name: "", email: "", subject: "", review: "" });
            } else {
                setMessage(data.message || "❌ Something went wrong, please try again.");
            }
        } catch (err) {
            console.error(err);
            setMessage("⚠️ Server error. Please try later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* header */}
            <LandingHeader />

            <div className={`${styles.container} py-5`}>
                {/* Title */}
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Contact our friendly team</h2>
                    <p className="text-muted">Let us know how we can help with UniCharge.</p>
                </div>

                {/* Contact Options */}
                <div className="row g-4 mb-5 text-center">
                    <div className="col-md-3">
                        <div className={`${styles.contactCard} card shadow-sm border-0 rounded-4 p-4`}>
                            <h6 className="fw-bold">💬 Chat to Sales</h6>
                            <p className="text-muted">Speak to our team</p>
                            <a href="mailto:sales@unicharge.com" className="text-primary">
                                sales@unicharge.com
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.contactCard} card shadow-sm border-0 rounded-4 p-4`}>
                            <h6 className="fw-bold">🛠️ Chat to Support</h6>
                            <p className="text-muted">We’re here to help</p>
                            <a href="mailto:support@unicharge.com" className="text-primary">
                                support@unicharge.com
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.contactCard} card shadow-sm border-0 rounded-4 p-4`}>
                            <h6 className="fw-bold">📍 Visit us</h6>
                            <p className="text-muted">Visit our HQ</p>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={`${styles.contactCard} card shadow-sm border-0 rounded-4 p-4`}>
                            <h6 className="fw-bold">📞 Call us</h6>
                            <p className="text-muted">Mon–Fri 8am–5pm</p>
                            <a href="tel:+15581000000" className="text-primary">
                                +1 (558) 100-0000
                            </a>
                        </div>
                    </div>
                </div>


                {/* FAQ + Feedback */}
                <div className="row g-4">
                    {/* FAQ */}
                    <div className="col-md-7">
                        <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
                            <h4 className="fw-bold mb-3">❓ Frequently Asked Questions</h4>
                            <div className="accordion" id="faqAccordion">
                                {/* Q1 */}
                                <div className="accordion-item border-0 rounded-3">
                                    <h2 className="accordion-header rounded-3" id="faq1">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse1"
                                        >
                                            Is there a free trial available?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapse1"
                                        className="accordion-collapse collapse rounded-3"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            Yes, you can try UniCharge free for 30 days. We also provide
                                            a free onboarding call to help you get started.
                                        </div>
                                    </div>
                                </div>

                                {/* Q2 */}
                                <div className="accordion-item border-0  rounded-3">
                                    <h2 className="accordion-header rounded-3" id="faq2">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse2"
                                        >
                                            Can I change my plan later?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapse2"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            Absolutely. You can upgrade, downgrade, or cancel anytime
                                            directly from your dashboard.
                                        </div>
                                    </div>
                                </div>

                                {/* Q3 */}
                                <div className="accordion-item border-0  rounded-3">
                                    <h2 className="accordion-header rounded-3" id="faq3">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse3"
                                        >
                                            How does UniCharge handle payments?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapse3"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            UniCharge integrates with secure payment gateways. You can
                                            pay via credit card, debit card, UPI, or net banking. All
                                            transactions are encrypted.
                                        </div>
                                    </div>
                                </div>

                                {/* Q4 */}
                                <div className="accordion-item border-0 rounded-3">
                                    <h2 className="accordion-header rounded-3" id="faq4">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse4"
                                        >
                                            Can I locate charging stations using UniCharge?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapse4"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            Yes, the UniCharge app has an inbuilt map that helps you
                                            find the nearest charging stations with live availability.
                                        </div>
                                    </div>
                                </div>

                                {/* Q5 */}
                                <div className="accordion-item border-0  rounded-3">
                                    <h2 className="accordion-header rounded-3" id="faq5">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse5"
                                        >
                                            Do I need a subscription to use UniCharge?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapse5"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            You can pay-per-use at charging stations, or subscribe for
                                            unlimited access depending on your charging needs.
                                        </div>
                                    </div>
                                </div>

                                {/* Q6 */}
                                <div className="accordion-item border-0  rounded-3">
                                    <h2 className="accordion-header rounded-3" id="faq6">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapse6"
                                        >
                                            Is UniCharge available in all cities?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapse6"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body text-muted">
                                            Currently, UniCharge is available in major metro cities and
                                            expanding rapidly to Tier-2 and Tier-3 cities across India.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="col-md-5">
                        <div className="card shadow-sm border-0 rounded-4 p-4">
                            <h5 className="fw-bold mb-3 text-primary">💡 Share your feedback</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control rounded-3"
                                        value={feedback.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control rounded-3"
                                        value={feedback.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Subject Title</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className="form-control rounded-3"
                                        value={feedback.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Review</label>
                                    <textarea
                                        name="review"
                                        className="form-control rounded-3"
                                        rows="3"
                                        value={feedback.review}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 rounded-3 fw-semibold shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit Feedback 🚀"}
                                </button>
                            </form>

                            {/* Success/Error message */}
                            {message && <p className="mt-3 text-center">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </>
    );
}

export default Contact;