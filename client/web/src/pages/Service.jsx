import styles from "../css/service.module.css";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";
import { Link } from "react-router-dom";

const Service = () => {
    return (
        <>
            {/* Header */}
            <LandingHeader />

            {/* --- Ac charging ------ */}
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>AC Charging Station Solutions</h1>
                    <p>
                        Professional installation and maintenance of AC charging stations
                        for electric vehicles. Reliable, efficient, and tailored to your
                        needs.
                    </p>
                    <Link to="/login" className={styles.btn}>
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.sectionTitle}>
                        <h2>Why Choose Our AC Charging Stations</h2>
                        <p>
                            We provide comprehensive charging solutions that are designed for
                            efficiency, reliability, and user convenience.
                        </p>
                    </div>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>⚡</div>
                            <h3>Fast Charging</h3>
                            <p>
                                Our AC stations deliver optimized charging speeds to get you
                                back on the road quickly.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🔒</div>
                            <h3>Secure & Safe</h3>
                            <p>
                                Built with multiple safety features to protect both your vehicle
                                and the charging infrastructure.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>📱</div>
                            <h3>Smart Connectivity</h3>
                            <p>
                                Monitor and control charging sessions remotely through our
                                intuitive mobile app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.sectionTitle}>
                        <h2>Our AC Charging Services</h2>
                        <p>
                            From consultation to installation and ongoing support, we offer
                            end-to-end solutions for your EV charging needs.
                        </p>
                    </div>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceImg}>Consultation & Planning</div>
                            <div className={styles.serviceContent}>
                                <h3>Site Assessment</h3>
                                <p>
                                    Our experts evaluate your location to determine the optimal
                                    charging solution based on your requirements and
                                    infrastructure.
                                </p>
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceImg}>Installation</div>
                            <div className={styles.serviceContent}>
                                <h3>Professional Installation</h3>
                                <p>
                                    Certified technicians handle the complete installation process
                                    with minimal disruption to your operations.
                                </p>
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceImg}>Maintenance</div>
                            <div className={styles.serviceContent}>
                                <h3>Ongoing Maintenance</h3>
                                <p>
                                    Regular maintenance services to ensure your charging stations
                                    operate at peak performance at all times.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Dc charging ------ */}
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>DC Charging Station Solutions</h1>
                    <p>
                        Professional installation and maintenance of DC fast-charging stations
                        for electric vehicles. Ultra-fast, reliable, and built for the future of
                        mobility.
                    </p>
                    <Link to="/login" className={styles.btn}>
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.sectionTitle}>
                        <h2>Why Choose Our DC Charging Stations</h2>
                        <p>
                            We deliver cutting-edge DC charging solutions designed for speed,
                            reliability, and seamless user experience.
                        </p>
                    </div>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>⚡</div>
                            <h3>Ultra-Fast Charging</h3>
                            <p>
                                Our DC chargers provide rapid charging to get your EV powered up in
                                minutes, not hours.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🔒</div>
                            <h3>Safe & Reliable</h3>
                            <p>
                                Advanced protection systems ensure maximum safety for both your
                                vehicle and the charging network.
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>🌐</div>
                            <h3>Smart Network</h3>
                            <p>
                                Integrated with intelligent software to monitor, manage, and optimize
                                charging operations in real time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.sectionTitle}>
                        <h2>Our DC Charging Services</h2>
                        <p>
                            From consultation to installation and ongoing support, we provide
                            complete solutions for high-performance DC charging stations.
                        </p>
                    </div>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceImg}>Consultation & Design</div>
                            <div className={styles.serviceContent}>
                                <h3>Site Assessment</h3>
                                <p>
                                    Our specialists analyze your site and energy requirements to
                                    recommend the most effective DC charging setup.
                                </p>
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceImg}>Installation</div>
                            <div className={styles.serviceContent}>
                                <h3>Expert Installation</h3>
                                <p>
                                    Certified professionals ensure seamless installation with all
                                    safety and compliance standards met.
                                </p>
                            </div>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceImg}>Support</div>
                            <div className={styles.serviceContent}>
                                <h3>24/7 Maintenance</h3>
                                <p>
                                    Continuous monitoring and support services to keep your charging
                                    stations running at full capacity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={styles.process}>
                <div className={styles.container}>
                    <div className={styles.sectionTitle}>
                        <h2>Our Simple 4-Step Process</h2>
                        <p>
                            We make EV charging station installation straightforward and
                            hassle-free.
                        </p>
                    </div>
                    <div className={styles.processSteps}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h3>Consultation</h3>
                            <p>We discuss your requirements and assess your site.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h3>Planning</h3>
                            <p>We design a customized solution for your specific needs.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h3>Installation</h3>
                            <p>Our certified technicians install the charging station.</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>4</div>
                            <h3>Support</h3>
                            <p>We provide ongoing maintenance and 24/7 support.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <h2>Ready to Install Your AC/DC Charging Station?</h2>
                    <p>
                        Contact us today for a free consultation and quote. Let's power the
                        future of transportation together.
                    </p>
                    <Link to="/contact" className={styles.btn}>
                        Get Your Quote Now
                    </Link>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />
        </>
    );
};

export default Service;