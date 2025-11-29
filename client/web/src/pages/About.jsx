import {
    FaBullseye,
    FaEye,
    FaHandshake,
} from "react-icons/fa";
import styles from "../css/about.module.css";
import LandingHeader from "../components/LandingHeader";

import ThakurImg from "../assets/thakur.jpg";
import SubratImg from "../assets/subrat.jpg";
import RajibImg from "../assets/rajib.jpg";
import SkdImg from "../assets/skd.jpg";
import Footer from "../components/Footer";
import AllStation from "../components/AllStation";

const About = () => {
    const teamMembers = [
        { name: "Thakur Ashutosh Dash", role: "CEO", img: ThakurImg },
        { name: "Subrat Senapati", role: "Founder", img: SubratImg },
        { name: "Rajib Kumar Maharana", role: "Head of Operations", img: RajibImg },
        { name: "Subham Kumar Das", role: "Marketing Director", img: SkdImg },
    ];

    const stats = [
        { number: "1000+", label: "Charging Stations" },
        { number: "25", label: "Cities Across India" },
        { number: "50,000+", label: "Happy EV Owners" },
        { number: "24/7", label: "Customer Support" },
    ];

    return (
        <div className={styles.aboutWrapper}>
            {/* Header */}
            <LandingHeader />

            {/* Hero */}
            <section className={styles.heroSection}>
                <div className="container text-center mt-6 pt-5">
                    <h1 className="display-4 fw-bold mb-4">About UniCharge</h1>
                    <p className="lead mb-5">
                        Driving the future of sustainable transportation with innovative EV
                        charging solutions across India.
                    </p>
                    <a href="#our-story" className={`btn btn-lg ${styles.btnOutlinePrimary}`}>
                        Our Story
                    </a>
                </div>
            </section>

            {/* About */}
            <section id="our-story" className={styles.aboutContent}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h2 className={styles.sectionTitle}>Our Story</h2>
                            <p>
                                Subham’s EV road trip turned stressful—he juggled 5 provider apps, registrations, and separate wallets, with money stuck in each.
                            </p>
                            <p>
                                UniCharge changed it: one map to discover stations, book any slot, and pay through a single wallet using UPI/cards. EV charging became simple again.
                            </p>
                            <a href="#" className={`btn mt-5 ${styles.btnPrimary}`}>
                                Learn More About Our Journey
                            </a>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2071&q=80"
                                alt="EV Charging Station"
                                className="img-fluid rounded shadow"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* All Station */}
            <section id="our-stations" className={styles.allStationSection}>
                <div className="container text-center">
                    <h2 className={`${styles.sectionTitle} ${styles.center}`}>
                        Our Charging Network
                    </h2>
                    <p>
                        With 1000+ stations in 25 cities, we ensure you're never far from a
                        charge. Explore our extensive network designed for convenience and
                        reliability.
                    </p>
                    <div id="all-stations" className="my-4 mb-9">
                        <AllStation />
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className={styles.valuesSection}>
                <div className="container text-center">
                    <h2 className={`${styles.sectionTitle} ${styles.center}`}>
                        Our Mission & Vision
                    </h2>
                    <p>
                        We are committed to accelerating India’s transition to sustainable
                        transportation through innovative charging solutions.
                    </p>
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <div className={styles.iconBox}>
                                <FaBullseye size={40} />
                                <h4>Mission</h4>
                                <p>Build India’s most reliable and extensive EV charging network.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.iconBox}>
                                <FaEye size={40} />
                                <h4>Vision</h4>
                                <p>Future where EVs are the primary mode of transportation.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.iconBox}>
                                <FaHandshake size={40} />
                                <h4>Values</h4>
                                <p>Sustainability, innovation, reliability & customer-centricity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className={styles.teamSection}>
                <div className="container">
                    <h2 className={`${styles.sectionTitle} ${styles.center} text-center`}>
                        Meet Our Team
                    </h2>
                    <div className="row mt-4">
                        {teamMembers.map((m, i) => (
                            <div key={i} className="col-lg-3 col-md-6">
                                <div className={styles.teamMember}>
                                    <img src={m.img} alt={m.name} />
                                    <h5>{m.name}</h5>
                                    <p>{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={styles.statsSection}>
                <div className="container text-center">
                    <div className="row">
                        {stats.map((s, i) => (
                            <div key={i} className="col-md-3 col-6">
                                <div className={styles.statBox}>
                                    <div className={styles.statNumber}>{s.number}</div>
                                    <div>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;