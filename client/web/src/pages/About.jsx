import {
    FaBolt,
    FaBullseye,
    FaEye,
    FaHandshake,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import styles from "../css/about.module.css";
import LandingHeader from "../components/LandingHeader";

import ThakurImg from "../assets/thakur.jpg";
import SubratImg from "../assets/subrat.jpg";
import RajibImg from "../assets/rajib.jpg";
import SkdImg from "../assets/skd.jpg";

const About = () => {
    const teamMembers = [
        { name: "Thakur Ashutosh Dash", role: "CEO", img: ThakurImg },
        { name: "Subhrat Senapati", role: "Founder", img: SubratImg },
        { name: "Rajib Kumar Maharana", role: "Head of Operations", img: RajibImg },
        { name: "Subham Kumar Das", role: "Marketing Director", img: SkdImg },
    ];

    const stats = [
        { number: "500+", label: "Charging Stations" },
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
                                Founded in 2025, UniCharge began with a simple vision: to make EV
                                charging accessible, reliable, and convenient for everyone in India.
                            </p>
                            <p>
                                From 3 charging stations in Bangalore, we’ve grown into 500+ stations
                                across 25 cities.
                            </p>
                            <p>
                                Our team of engineers, sustainability experts, and service
                                professionals ensure a seamless charging experience.
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
                                    <div className={styles.socialIcons}>
                                        <a href="#">
                                            <FaLinkedinIn />
                                        </a>
                                        <a href="#">
                                            <FaTwitter />
                                        </a>
                                    </div>
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
            <footer className={styles.footer}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="footer-logo-image text-lg-start mb-1">
                                <img src="Unicharge_logo.png" alt="footer logo" class="w-lg-20 w-md-20 w-20" />
                                <img src="Unicharge_logo_text.png" alt="footer logo" class="w-lg-50 w-md-50 w-50" />
                            </div>
                            <p className="mb-3">Leading EV revolution in India with reliable charging.</p>
                            <div className={styles.socialIcons}>
                                <a href="#">
                                    <FaFacebookF />
                                </a>
                                <a href="#">
                                    <FaTwitter />
                                </a>
                                <a href="#">
                                    <FaInstagram />
                                </a>
                                <a href="#">
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <h5>Quick Links</h5>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Services</a>
                                </li>
                                <li>
                                    <a href="#">Stations</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <h5>Services</h5>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <a href="#">Home Charging</a>
                                </li>
                                <li>
                                    <a href="#">Public Stations</a>
                                </li>
                                <li>
                                    <a href="#">Fleet Solutions</a>
                                </li>
                                <li>
                                    <a href="#">Commercial Hubs</a>
                                </li>
                                <li>
                                    <a href="#">Maintenance</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <h5>Contact</h5>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <FaMapMarkerAlt /> New Delhi, India
                                </li>
                                <li>
                                    <FaPhone /> +91 9876543321
                                </li>
                                <li>
                                    <FaEnvelope /> info@unicharge.in
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        <p>© 2025 UniCharge. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;