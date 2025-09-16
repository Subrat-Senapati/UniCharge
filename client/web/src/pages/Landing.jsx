import React from 'react';

const App = () => {
    // Utility components for cleanliness and reusability
    const NavItem = ({ text, hasDropdown = false, dropdownItems = [] }) => (
        <li className={`nav-item ${hasDropdown ? 'dropdown' : ''}`}>
            <a className={`nav-link text-dark ${hasDropdown ? 'dropdown-toggle' : ''}`} href="#" role={hasDropdown ? "button" : ""} data-bs-toggle={hasDropdown ? "dropdown" : ""} aria-expanded={hasDropdown ? "false" : ""}>
                {text}
            </a>
            {hasDropdown && (
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {dropdownItems.map((item, index) => (
                        <li key={index}><a className="dropdown-item" href="#">{item}</a></li>
                    ))}
                </ul>
            )}
        </li>
    );

    const HowItWorksCard = ({ imageSrc, title, description }) => (
        <div className="text-center px-3 mb-4">
            <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '150px', height: '150px' }}>
                <img src={imageSrc} className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={title} />
            </div>
            <h5 className="fw-bold">{title}</h5>
            <p className="text-muted small">{description}</p>
        </div>
    );

    const LinedItem = ({ number, title, text }) => (
        <div className="d-flex mb-4">
            <div className="bg-green text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                {number}
            </div>
            <div>
                <h5 className="fw-bold mb-1">{title}</h5>
                {text && <p className="text-muted mb-0">{text}</p>}
            </div>
        </div>
    );

    const ServiceCard = ({ icon, title, description }) => (
        <div className="card h-100 p-4 card-hover-scale">
            <div className="mb-3">
                <img src={icon} alt={`${title} Icon`} style={{ width: '60px', height: '60px' }} />
            </div>
            <h5 className="fw-bold text-green">{title}</h5>
            <p className="text-muted small">{description}</p>
        </div>
    );

    const BlogCard = ({ imageSrc, title, author, date }) => (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm card-hover-scale">
                <img src={imageSrc} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title fw-bold">{title}</h5>
                    <p className="card-text text-muted small">
                        Author: {author}
                    </p>
                    <p className="card-text text-muted small">
                        Published At: {date}
                    </p>
                    <a href="#" className="btn btn-sm btn-outline-success">Read More</a>
                </div>
            </div>
        </div>
    );

    const AboutServiceCard = ({ title, description, features, buttonText }) => (
        <div className="card h-100 p-4 card-hover-scale" style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h5 className="fw-bold mb-3">{title}</h5>
            <p className="text-muted small">{description}</p>
            <ul className="list-unstyled">
                {features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                        <i className="fa fa-caret-right text-success me-2"></i>
                        <span className="text-muted small">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="btn btn-green rounded-pill mt-auto">{buttonText}</button>
        </div>
    );

    return (
        <div>
            {/* Bootstrap CSS from CDN */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                .hero-section {
                    background-image: url('https://placehold.co/1920x800/292833/808080?text=Electric+Vehicle+Charging+Station');
                    background-size: cover;
                    background-position: center;
                    min-height: 80vh;
                    position: relative;
                }
                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(61, 107, 192, 0.4);
                    z-index: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                }
                .bg-green {
                    background-color: #008000;
                }
                .text-green {
                    color: #008000;
                }
                .btn-green {
                    background-color: #008000;
                    color: #fff;
                    border: none;
                }
                .btn-green:hover {
                    background-color: #006400;
                }
                .card-hover-scale {
                    transition: transform 0.3s ease;
                }
                .card-hover-scale:hover {
                    transform: scale(1.05);
                }
                .bg-light-green {
                    background-color: #f0fff0;
                }
                .social-icons a {
                    font-size: 1.5rem;
                }
                `}
            </style>

            <header className="sticky-top shadow-sm bg-white">
                <nav className="navbar navbar-expand-lg navbar-light container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src="https://placehold.co/50x50/0d6efd/ffffff?text=EV" alt="EV Logo" className="rounded-circle me-2" />
                        <span className="h4 fw-bold text-green">UNI CHARGE</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-lg-center">
                            <NavItem text="About Us" />
                            <NavItem text="Products" />
                            <NavItem text="Our Service" hasDropdown dropdownItems={['AC Charger Services', 'DC Charger Services']} />
                            <NavItem text="How To Use" />
                            <NavItem text="Gallery" hasDropdown dropdownItems={['Gallery 1', 'Gallery 2']} />
                            <NavItem text="Contact Us" />
                            <li className="nav-item ms-lg-3">
                                <button className="btn btn-green rounded-pill px-4">Get App</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1">
                <section className="hero-section d-flex align-items-center justify-content-center text-center text-white">
                    <div className="hero-content container">
                        <h1 className="display-4 fw-bold mb-3">Best Electric Vehicle Charging Station</h1>
                        <p className="lead mb-4">It's your chance to own an EV Charging Station (Without having to manage it)</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark rounded-pill me-2 px-4 py-2">APP STORE</button>
                            <button className="btn btn-light rounded-pill px-4 py-2">GOOGLE PLAY</button>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6">
                                <h6 className="text-green text-uppercase fw-bold mb-2">ABOUT ECHARGE</h6>
                                <h2 className="fw-bold mb-3">Our Services on The Road</h2>
                                <p className="text-muted">An EV charging station is a device that provides electric energy for recharging electric vehicles, enabling the transfer of electrical energy from the grid to the vehicle's battery pack.</p>
                                <img src="https://placehold.co/500x300/f0f0f0/000000?text=EV+Charging+Port" className="img-fluid rounded shadow-sm my-4" alt="EV Charging Port" />
                            </div>
                            <div className="col-lg-6">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <AboutServiceCard
                                            title="HOME CHARGING"
                                            description="Explore our professional installation services to ensure a seamless and safe home charging setup."
                                            features={['Charging station for home', 'Charge point setting', 'Free Support', '1 year hardware warranty']}
                                            buttonText="Contact Us"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <AboutServiceCard
                                            title="PUBLIC CHARGING"
                                            description="Find public charging stations near popular destinations, highways, and key locations."
                                            features={['Public charging station', 'Charge point setting', 'Free Support', '1 year hardware warranty']}
                                            buttonText="Contact Us"
                                        />
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn btn-dark rounded-pill px-5">Explore More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5 bg-light-green">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">Excellent And Best Services</h2>
                        <div className="row g-4 align-items-center">
                            <div className="col-md-6">
                                <div className="p-4 rounded shadow">
                                    <LinedItem number="1" title="Maximize Your Earnings" text="Earn up to ₹4/unit" />
                                    <LinedItem number="2" title="Top Income Opportunities" text="The Ultimate Passive Income Opportunity Awaits You!" />
                                    <LinedItem number="3" title="Effortless Earnings" text="Automated Monthly Payouts and Monitoring" />
                                    <LinedItem number="4" title="Cost Reduction Strategies" text="Lower Maintenance cost" />
                                    <LinedItem number="5" title="Eco-Friendly Finances" text="Going Green and Growing Wealth" />
                                    <LinedItem number="6" title="Smooth Sailing" text="No operational headaches, just smooth sailing" />
                                </div>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src="https://placehold.co/400x400/D0F0C0/000000?text=Modern+EV+Charger" className="img-fluid rounded shadow" alt="EV Charger" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">Overview of Our Services</h2>
                        <p className="text-center text-muted mb-5">Get a chance to revolutionize your charging experience with myEV points' charging station services. We provide state-of-the-art AC charging stations, DC charging stations as well as EV charging station applications so that we can deliver innovative solutions to make your EV ownership smart, convenient and relaxing. Join us today and take your first step towards a cleaner and greener future.</p>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <ServiceCard
                                    icon="https://placehold.co/60x60/f0fff0/008000?text=AC"
                                    title="Electric Vehicle AC Charging Station"
                                    description="Our designs are user-friendly and installation options are quite flexible. This makes our AC charging stations a convenient approach for having an AC charger for EV cars at home..."
                                />
                            </div>
                            <div className="col-md-4">
                                <ServiceCard
                                    icon="https://placehold.co/60x60/f0fff0/008000?text=DC"
                                    title="Electric Vehicle DC Charging Station"
                                    description="Our DC charging stations are made for those who want a quick charging. MyEV points DC fast charging stations ensure quick power up and efficiency while on the go..."
                                />
                            </div>
                            <div className="col-md-4">
                                <ServiceCard
                                    icon="https://placehold.co/60x60/f0fff0/008000?text=App"
                                    title="Electric Vehicle App Solutions"
                                    description="Enhance every aspect of EV ownership with EV car charging station app, as with our electric car charging station app, you can easily optimize the schedule for charging your EV..."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">How We Work</h2>
                        <div className="row g-4 justify-content-center">
                            <div className="col-lg-3 col-md-6">
                                <HowItWorksCard
                                    imageSrc="https://placehold.co/150x150/f0fff0/008000?text=Fast+Charging"
                                    title="Fast Charging"
                                    description="Experience swift device charging with our efficient solutions. Enjoy quick power boosts that keep you connected and on the move, eliminating unnecessary delays."
                                />
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <HowItWorksCard
                                    imageSrc="https://placehold.co/150x150/f0fff0/008000?text=Good+Mgmt"
                                    title="Good Management"
                                    description="Good management is vital for organizational success, involving coordination, strategic decisions, and effective communication to steer teams towards their goals."
                                />
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <HowItWorksCard
                                    imageSrc="https://placehold.co/150x150/f0fff0/008000?text=Renewable+Energy"
                                    title="Renewable Energy"
                                    description="Renewable energy is the key to a sustainable future, harnessed from naturally replenishing sources like sunlight, wind and water."
                                />
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <HowItWorksCard
                                    imageSrc="https://placehold.co/150x150/f0fff0/008000?text=Quality+Charger"
                                    title="Quality Charger"
                                    description="Efficient, reliable charging for modern devices. Our high-quality charger delivers fast and safe power, meeting the demands of today’s electronics."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-light-green py-5">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">TESTIMONIALS</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card shadow-sm p-4 text-center card-hover-scale">
                                    <blockquote className="blockquote mb-4">
                                        <p className="lead fst-italic text-muted">"I recently used the EV charging station near my office, and I'm impressed! The charging process was super reliable, and I got a significant boost in battery capacity in no time. It's great to have a station I can count on for my daily commutes."</p>
                                    </blockquote>
                                    <footer className="blockquote-footer">
                                        <cite title="Source Title">Isha Sharma, Senior Software Engineer</cite>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="py-5">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">Our Gallery</h2>
                        <div className="row g-4">
                            {[...Array(6)].map((_, index) => (
                                <div className="col-md-4" key={index}>
                                    <img src={`https://placehold.co/600x400/D0F0C0/000000?text=EV+Gallery+Image+${index + 1}`} className="img-fluid rounded shadow-sm card-hover-scale" alt={`Gallery Image ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-5 bg-light-green">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5">Recent Articles and News</h2>
                        <div className="row g-4">
                             <BlogCard 
                                imageSrc="https://placehold.co/600x400/D0F0C0/000000?text=Article+1"
                                title="How to install an Electric Vehicle AC Charging Station"
                                author="Rahul"
                                date="Mar 22, 2024"
                            />
                            <BlogCard 
                                imageSrc="https://placehold.co/600x400/D0F0C0/000000?text=Article+2"
                                title="5 Common Myths About EV Charging Busted"
                                author="Ankit Singh"
                                date="Aug 8, 2025"
                            />
                            <BlogCard 
                                imageSrc="https://placehold.co/600x400/D0F0C0/000000?text=Article+3"
                                title="Why EV Technology is the Future of Transportation"
                                author="Rahul"
                                date="Jun 10, 2024"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-green text-white py-5">
                    <div className="container">
                        <div className="row g-4 align-items-center">
                            <div className="col-md-6">
                                <h3 className="fw-bold mb-2">Our Newsletter</h3>
                                <p className="text-white-50">Sign Up To Get Exclusive Offers And News From Our Favorite Brands</p>
                            </div>
                            <div className="col-md-6">
                                <form className="d-flex">
                                    <input type="email" className="form-control rounded-pill me-2" placeholder="Email Address" required />
                                    <button type="submit" className="btn btn-dark rounded-pill">Subscribe Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <h2 className="fw-bold mb-4">Let's Discuss In Detail</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="text-muted">myEVpoint not only offers charging stations for residential use but for commercial purposes also if you are looking for residential installation you can take advantage of our Level 1 and Level 2 AC charging.</p>
                                <ul className="list-unstyled text-muted">
                                    <li><i className="fa fa-circle-arrow-right text-green me-2"></i>Level 1 charging require 120V, so it is easy to plug in the car in a standard household outlet.</li>
                                    <li><i className="fa fa-circle-arrow-right text-green me-2"></i>It is the slowest form of charging.</li>
                                    <li><i className="fa fa-circle-arrow-right text-green me-2"></i>If you need to cover short distances on a regular basis, this charging level is suitable for you.</li>
                                </ul>
                                <img src="https://placehold.co/400x400/D0F0C0/000000?text=AC+Charger+Installation" className="img-fluid rounded shadow-sm my-4" alt="EV Charger" />
                            </div>
                            <div className="col-md-6">
                                <h4 className="fw-bold mb-3">We Provide</h4>
                                <ul className="list-unstyled">
                                    <li><LinedItem number="1" title="State-of-the-art charging infrastructure." /></li>
                                    <li><LinedItem number="2" title="Fast and reliable charging." /></li>
                                    <li><LinedItem number="3" title="High-powered charging capability." /></li>
                                    <li><LinedItem number="4" title="Affordable price range." /></li>
                                    <li><LinedItem number="5" title="Charging infrastructure compatible with different makes and models." /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-dark text-white py-5 mt-auto">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <h5 className="fw-bold mb-3">my EV POINT</h5>
                            <p className="text-muted small">A preeminent charging station service provider offers impeccable expertise and seamless solutions assisting you in having your own station without any burden of its management.</p>
                            <div className="d-flex social-icons">
                                <a href="#" className="text-white-50 me-3"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-white-50 me-3"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-white-50 me-3"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="text-white-50 me-3"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h5 className="fw-bold mb-3">Contact Info</h5>
                            <ul className="list-unstyled small text-muted">
                                <li><i className="fa fa-map-marker-alt me-2"></i>Hall 3, IT Wing, B-70, Phase 7, Mohali Area...</li>
                                <li><i className="fa fa-envelope me-2"></i>info@myevpoint.in</li>
                                <li><i className="fa fa-phone me-2"></i>+91 8427-444675</li>
                                <li><i className="fa fa-phone me-2"></i>+91 9592-595975</li>
                            </ul>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h5 className="fw-bold mb-3">Useful Links</h5>
                            <ul className="list-unstyled small text-muted">
                                <li><a href="#" className="text-decoration-none text-white-50">AC Charger Services</a></li>
                                <li><a href="#" className="text-decoration-none text-white-50">DC Charger Services</a></li>
                                <li><a href="#" className="text-decoration-none text-white-50">Careers</a></li>
                                <li><a href="#" className="text-decoration-none text-white-50">Privacy Policy</a></li>
                                <li><a href="#" className="text-decoration-none text-white-50">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h5 className="fw-bold mb-3">Recent Articles and News</h5>
                            <ul className="list-unstyled small text-muted">
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none text-white-50">How to install an Electric Vehicle AC Charging Station</a>
                                    <p className="fst-italic mb-0">Author: Rahul</p>
                                </li>
                                <li>
                                    <a href="#" className="text-decoration-none text-white-50">5 Common Myths About EV Charging Busted</a>
                                    <p className="fst-italic mb-0">Author: Ankit Singh</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-4 border-secondary" />
                    <div className="text-center small text-muted">
                        &copy; 2025 by VP Clean Energy. All Rights Reserved.
                    </div>
                </div>
            </footer>
            
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
};

export default App;
