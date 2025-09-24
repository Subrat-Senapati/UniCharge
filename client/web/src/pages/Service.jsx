import styles from "../css/service.module.css";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";

const Service = () => {
  return (
    <>
    {/* Header */}
    <LandingHeader />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>AC Charging Station Solutions</h1>
          <p>
            Professional installation and maintenance of AC charging stations
            for electric vehicles. Reliable, efficient, and tailored to your
            needs.
          </p>
          <a href="#contact" className={styles.btn}>
            Get Started
          </a>
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
          <h2>Ready to Install Your AC Charging Station?</h2>
          <p>
            Contact us today for a free consultation and quote. Let's power the
            future of transportation together.
          </p>
          <a href="#contact" className={styles.btn}>
            Get Your Quote Now
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Service;