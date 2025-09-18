import Slider from "react-slick";

import '../css/plugin.css';
import '../css/default.css';
import '../css/landing.css';

const Landing = () => {
    const banner_settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,       // 5s per slide
        speed: 2000,                // transition speed
        arrows: false,
        pauseOnHover: false,
    };

    const priceSlider_settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,     // time between slides (3 second)
        speed: 500,               // animation speed (0.5 second)
        arrows: false,
        dots: false,
        pauseOnHover: false,
        cssEase: "linear",
    };

    const projectSlider_settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,              // transition speed (ms)
        autoplaySpeed: 1000,      // delay between slides (ms)
        arrows: false,
        pauseOnHover: false,
        cssEase: "linear",
    };

    const terminalSlider_settings = {
        autoplay: true,
        autoplaySpeed: 3500,
        infinite: true,
        arrows: false,
        dots: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const blogSlider_settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
    };


    return (
        <div className="App index-2">
            {/* Header Section Starts */}
            <header className="position-relative z-3">
                <div className="header-nav-menu navbar-sticky-in" id="header-nav-menu">
                    <div className="container">
                        <div className="header-nav-menu-inner">
                            <div className="row align-items-center justify-content-between">
                                <div className="d-block d-xl-none col-lg-2 col-md-3 col-5">
                                    <div className="navbar-logo m-0">
                                        {/* <h3 style={{ color: "white" }}>Your Brand Logo</h3> */}
                                        <a href="index.html"><img src="/Unicharge_logo_text.png" alt="Logo" class="w-50" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div
                                        className="navbar-collapse"
                                        id="bs-example-navbar-collapse-1"
                                    >
                                        <ul
                                            className="navbar-nav align-items-center justify-content-between flex-row"
                                            id="responsive-menu"
                                        >
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle px-3 white text-uppercase fw-medium active"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Home
                                                </a>
                                                <ul className="dropdown-menu bg-grey p-0 rounded1 bg-off-white border-0">
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0 "
                                                            href="index.html"
                                                        >
                                                            Homepage{" "}
                                                        </a>
                                                    </li>
                                                    <li className="border-0">
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize border-0 dark-grey active"
                                                            href="index-2.html"
                                                        >
                                                            Homepage 2
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link px-3 py-0 white text-uppercase fw-medium"
                                                    href="about.html"
                                                >
                                                    About
                                                </a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle px-3 white text-uppercase fw-medium"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Services
                                                </a>
                                                <ul className="dropdown-menu bg-grey p-0 border-0 rounded1 bg-off-white">
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize border-0 dark-grey"
                                                            href="service-list.html"
                                                        >
                                                            Service List
                                                        </a>
                                                    </li>
                                                    <li className="border-0">
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize border-0 dark-grey"
                                                            href="service-detail.html"
                                                        >
                                                            Service Details
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle px-3 white text-uppercase fw-medium"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Projects
                                                </a>
                                                <ul className="dropdown-menu bg-grey p-0 rounded1 bg-off-white border-0">
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="project-list.html"
                                                        >
                                                            Project List
                                                        </a>
                                                    </li>
                                                    <li className="border-0">
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize border-0 dark-grey"
                                                            href="project-detail.html"
                                                        >
                                                            Project Detail
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="  text-center d-none d-xl-block">
                                                {/* <h3 style={{ color: "green" }}>Your Logo</h3> */}
                                                <a class="text-uppercase fw-medium active text-center" aria-current="page" href="index.html">
                                                    <img src="Unicharge_logo_text.png" alt="Logo" class="w-50" />
                                                </a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle px-3 white text-uppercase fw-medium"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Pages
                                                </a>
                                                <ul className="dropdown-menu bg-grey p-0 rounded1 bg-off-white border-0">
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="team.html"
                                                        >
                                                            Our Team
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="team-detail.html"
                                                        >
                                                            Team Detail
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="career-list.html"
                                                        >
                                                            Career List
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="career-detail.html"
                                                        >
                                                            Career Detail
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="gallery.html"
                                                        >
                                                            Gallery
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="testimonial.html"
                                                        >
                                                            Testimonials
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="faq.html"
                                                        >
                                                            Faq
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="price.html"
                                                        >
                                                            Pricing
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="product-list.html"
                                                        >
                                                            Product List
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="product-detail.html"
                                                        >
                                                            Product Single
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="coming-soon.html"
                                                        >
                                                            Coming Soon
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="error.html"
                                                        >
                                                            404 Error
                                                        </a>
                                                    </li>
                                                    <li className="border-0">
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey"
                                                            href="search.html"
                                                        >
                                                            Search Result
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle px-3 white text-uppercase fw-medium"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Shop
                                                </a>
                                                <ul className="dropdown-menu bg-grey p-0 rounded1 bg-off-white border-0">
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="product-list.html"
                                                        >
                                                            Product List
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="product-detail.html"
                                                        >
                                                            Product Detail
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="cart.html"
                                                        >
                                                            Cart
                                                        </a>
                                                    </li>
                                                    <li className="border-0">
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize border-0 dark-grey"
                                                            href="checkout.html"
                                                        >
                                                            Checkout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle px-3 white text-uppercase fw-medium"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Blogs
                                                </a>
                                                <ul className="dropdown-menu bg-grey p-0 rounded1 bg-off-white border-0">
                                                    <li>
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize dark-grey border-0"
                                                            href="blog-list.html"
                                                        >
                                                            Blog List
                                                        </a>
                                                    </li>
                                                    <li className="border-0">
                                                        <a
                                                            className="dropdown-item py-2 px-7 text-capitalize border-0 dark-grey"
                                                            href="blog-detail.html"
                                                        >
                                                            Blog single
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link px-3 py-0 white text-uppercase fw-medium"
                                                    href="contact.html"
                                                >
                                                    Contact
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="slicknav-mobile" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header Section Ends */}
            {/* Banner Section Starts */}
            <section className="banner-1 pt-8 mt-1  position-relative rounded3 rounded-top-0">
                <div className="overlay" />
                <div className="container position-relative">
                    <div className="banner-1-inner pt-9 text-white position-relative text-center text-lg-start">
                        <div className="section-title position-relative mb-9">
                            <div className="row gx-lg-5 gy-4">
                                <div className="col-lg-8">
                                    <div className="section-title-left">
                                        <h5 className="mb-2 text-white text-uppercase fw-medium">
                                            Eco Friendly Solution
                                        </h5>
                                        <h1 className="text-white text-uppercase ps-4 border-start border-3 border-green">
                                            <span className="green">Powering</span> a Sustainable tomorrow
                                        </h1>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="section-title-right text-center position-relative">
                                        <a href="service-list.html">
                                            <div className="spin-demo-main position-relative">
                                                <img src="images/top-right.png" alt="" />
                                                <svg
                                                    id="rotatingText"
                                                    viewBox="0 0 200 200"
                                                    width={150}
                                                    height={150}
                                                >
                                                    <defs>
                                                        <path
                                                            id="circle"
                                                            d="M 100, 100
                               m -75, 0
                               a 75, 75 0 1, 0 150, 0
                               a 75, 75 0 1, 0 -150, 0"
                                                        ></path>
                                                    </defs>
                                                    <text>
                                                        <textPath
                                                            alignmentBaseline="hanging"
                                                            xlinkHref="#circle"
                                                            className="text"
                                                        >
                                                            Explore Catalog &nbsp; Explore Catalog
                                                        </textPath>
                                                    </text>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ✅ Slider Section */}
                        <div className="section-body position-relative overflow-visible">
                            <Slider {...banner_settings} className="banner-slider">
                                {/* Slide 1 */}
                                <div className="slide">
                                    <div class="section-body">
                                        <div className="row gx-lg-5">
                                            <div className="col-xl-8 order-2 order-xl-1 align-self-end">
                                                <div className="banner-1-image text-center">
                                                    <div className="banner-1-image-">
                                                        <img
                                                            src="images/freepik__background__84520.png"
                                                            alt=""
                                                            className="w-100"
                                                            style={{
                                                                width: "100%",
                                                                height: "600px",
                                                                objectFit: "contain",
                                                                objectPosition: "center"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 order-1 order-xl-2">
                                                <div className="banner-info-right">
                                                    <h3 className="text-white mb-2">Tesla Model 3</h3>
                                                    <p className="mb-4">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Beatae est voluptas excepturi labore numquam aspernatur
                                                        ullam officiis eum ea quaerat.
                                                    </p>
                                                    <div className="feature-list mb-11">
                                                        <div className="row gy-4">
                                                            <div className="col-md-6">
                                                                <div className="feature-box p-3 bg-lightgrey rounded1 fw-semibold">
                                                                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-4">
                                                                        <li>
                                                                            <span className="h2 fw-bold">16</span>Hrs
                                                                        </li>
                                                                        <li className="h3">
                                                                            <i className="fa fa-microchip green" />
                                                                        </li>
                                                                    </ul>
                                                                    <span className="text-uppercase">Non Stop</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="feature-box p-3 bg-lightgrey rounded1 fw-semibold">
                                                                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-4">
                                                                        <li>
                                                                            <span className="h2 fw-bold">CO</span>2
                                                                        </li>
                                                                        <li className="h3">
                                                                            <i className="fa fa-leaf green" />
                                                                        </li>
                                                                    </ul>
                                                                    <span className="text-uppercase">Carbon Free</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Slide 2 */}
                                <div className="slide">
                                    <div class="section-body">
                                        <div className="row gx-lg-5">
                                            <div className="col-xl-8 order-2 order-xl-1 align-self-end">
                                                <div className="banner-1-image text-center">
                                                    <div className="banner-1-image-inner">
                                                        <img
                                                            src="images/freepik__background__84520-car2.PNG"
                                                            alt=""
                                                            className="w-100"
                                                            style={{
                                                                width: "100%",
                                                                height: "600px",
                                                                objectFit: "contain",
                                                                objectPosition: "center"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 order-1 order-xl-2">
                                                <div className="banner-info-right">
                                                    <h3 className="text-white mb-2">Hyundai Ioniq 6</h3>
                                                    <p className="mb-4">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Beatae est voluptas excepturi labore numquam aspernatur
                                                        ullam officiis eum ea quaerat.
                                                    </p>
                                                    <div className="feature-list mb-11">
                                                        <div className="row gy-4">
                                                            <div className="col-md-6">
                                                                <div className="feature-box p-3 bg-lightgrey rounded1 fw-semibold">
                                                                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-4">
                                                                        <li>
                                                                            <span className="h2 fw-bold">14</span>Hrs
                                                                        </li>
                                                                        <li className="h3">
                                                                            <i className="fa fa-microchip green" />
                                                                        </li>
                                                                    </ul>
                                                                    <span className="text-uppercase">Non Stop</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="feature-box p-3 bg-lightgrey rounded1 fw-semibold">
                                                                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-4">
                                                                        <li>
                                                                            <span className="h2 fw-bold">CO</span>2
                                                                        </li>
                                                                        <li className="h3">
                                                                            <i className="fa fa-leaf green" />
                                                                        </li>
                                                                    </ul>
                                                                    <span className="text-uppercase">Carbon Free</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
            {/* Banner Section Ends */}
            {/* About Us Section Starts */}
            <section className="about-us bg-lightgreen py-10">
                <div className="container">
                    <div className="about-us-inner pt-11">
                        <div className="row gy-5 gx-lg-5 align-items-center">
                            <div className="col-lg-6">
                                <div className="section-right text-center text-lg-start">
                                    <div className="section-title mb-5">
                                        <h6 className="mb-2 green1 text-uppercase fw-medium">
                                            About Us
                                        </h6>
                                        <h2 className="ps-4 border-start border-3 border-green">
                                            Charging Solutions For all{" "}
                                            <span className="green">business and EV Drivers</span>
                                        </h2>
                                    </div>
                                    <div className="section-body">
                                        <p className="mb-4">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Similique recusandae id nihil, enim magni tempora quo!
                                            Officiis, maxime accusamus. voluptatum adipisci.
                                        </p>
                                        <div className="service-list text-start">
                                            <div className="service-progress-list mb-6">
                                                <span className="fw-bold">Eco-friendly Charging</span>
                                                <div className="progress-bar-section w-lg-75">
                                                    <div
                                                        className="progress bg-darkgreen position-relative overflow-visible mt-2"
                                                        role="progressbar"
                                                        aria-label="Basic example"
                                                        aria-valuenow={90}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ height: 15 }}
                                                    >
                                                        <div
                                                            className="progress-bar rounded-start-2 bg-green position-relative overflow-visible"
                                                            style={{ width: "90%" }}
                                                        >
                                                            <div className="percentage-wrapper position-absolute p-2 bg-green d-flex align-items-center justify-content-between rounded-circle">
                                                                <span className="progress-num" data-val={90}>
                                                                    90
                                                                </span>
                                                                <span>%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="service-progress-list mb-6">
                                                <span className="fw-bold">Energy Storage Systems</span>
                                                <div className="progress-bar-section w-lg-75">
                                                    <div
                                                        className="progress bg-darkgreen position-relative overflow-visible mt-2"
                                                        role="progressbar"
                                                        aria-label="Basic example"
                                                        aria-valuenow={90}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ height: 15 }}
                                                    >
                                                        <div
                                                            className="progress-bar rounded-start-2 bg-green position-relative overflow-visible"
                                                            style={{ width: "85%" }}
                                                        >
                                                            <div className="percentage-wrapper position-absolute p-2 bg-green d-flex align-items-center justify-content-between rounded-circle">
                                                                <span className="progress-num" data-val={85}>
                                                                    85
                                                                </span>
                                                                <span>%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="service-progress-list">
                                                <span className="fw-bold">EV Drivers Services</span>
                                                <div className="progress-bar-section w-lg-75">
                                                    <div
                                                        className="progress bg-darkgreen position-relative overflow-visible mt-2"
                                                        role="progressbar"
                                                        aria-label="Basic example"
                                                        aria-valuenow={90}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ height: 15 }}
                                                    >
                                                        <div
                                                            className="progress-bar rounded-start-2 bg-green position-relative overflow-visible"
                                                            style={{ width: "89%" }}
                                                        >
                                                            <div className="percentage-wrapper position-absolute p-2 bg-green d-flex align-items-center justify-content-between rounded-circle">
                                                                <span className="progress-num" data-val={89}>
                                                                    89
                                                                </span>
                                                                <span>%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="section-left position-relative">
                                    <img
                                        src="images/kindelmedia-9800029.jpg"
                                        alt="about image"
                                        className="w-100 rounded2"
                                    />
                                    <div className="about-counter-box bg-green1 border border-4 border-lightgreen p-4 text-white position-absolute rounded2 text-center text-lg-start mt-2">
                                        <div className="about-counter-image mb-2">
                                            <img
                                                src="images/charging-station.png"
                                                alt="about counter image"
                                            />
                                        </div>
                                        <h2 className="text-white">
                                            <span className="num" data-val={50} />+
                                        </h2>
                                        <span className="small">Charging Stations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Us Section Ends */}
            {/* Service Section Starts */}
            <section className="service pb-10">
                <div className="container">
                    <div className="service-inner">
                        <div className="section-title mb-6 text-center text-lg-start">
                            <div className="row gx-lg-5 gy-4 align-items-center">
                                <div className="col-lg-7">
                                    <div className="section-title-left">
                                        <h6 className="mb-2 green1 text-uppercase fw-medium">
                                            Our Services
                                        </h6>
                                        <h2 className="ps-4 border-start border-3 border-green">
                                            Best EV <span className="green">charging service</span> for
                                            your electric vehicle
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="section-title-right">
                                        <p className="mb-3">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                                            dolor architecto molestias aritatis minima accusamus.
                                        </p>
                                        <a href="service-list.html" className="btn btn2">
                                            More Servicess
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="row  gy-4">
                                <div className="col-lg-4 col-md-6">
                                    <div className="service-box p-6 border border-2 bg-white border-lightgreen rounded2 shadow">
                                        <div className="service-icon mb-4">
                                            <img
                                                src="images/PNG/filling_station.png"
                                                alt="service-icon"
                                            />
                                        </div>
                                        <div className="service-info">
                                            <h4>
                                                <a href="service-detail.html" className="black">
                                                    Home Charging
                                                </a>
                                            </h4>
                                            <p className="mt-2 mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Nulla voluptate amet enim atque impedit inventore.
                                            </p>
                                            <a
                                                href="service-detail.html"
                                                className="btn border border-1 border-green"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="service-box p-6 border border-2 bg-white border-lightgreen rounded2 shadow">
                                        <div className="service-icon mb-4">
                                            <img src="images/PNG/car_with_flash.png" alt="service-icon" />
                                        </div>
                                        <div className="service-info">
                                            <h4>
                                                <a href="service-detail.html" className="black">
                                                    Renewable Energy
                                                </a>
                                            </h4>
                                            <p className="mt-2 mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Nulla voluptate amet enim atque impedit inventore.
                                            </p>
                                            <a
                                                href="service-detail.html"
                                                className="btn border border-1 border-green"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="service-box p-6 border border-2 bg-white border-lightgreen rounded2 shadow">
                                        <div className="service-icon mb-4">
                                            <img src="images/PNG/car_eco.png" alt="service-icon" />
                                        </div>
                                        <div className="service-info">
                                            <h4>
                                                <a href="service-detail.html" className="black">
                                                    EV Drivers
                                                </a>
                                            </h4>
                                            <p className="mt-2 mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Nulla voluptate amet enim atque impedit inventore.
                                            </p>
                                            <a
                                                href="service-detail.html"
                                                className="btn border border-1 border-green"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="service-box p-6 border border-2 bg-white border-lightgreen rounded2 shadow">
                                        <div className="service-icon mb-4">
                                            <img src="images/PNG/accumulator.png" alt="service-icon" />
                                        </div>
                                        <div className="service-info">
                                            <h4>
                                                <a href="service-detail.html" className="black">
                                                    AC Charger
                                                </a>
                                            </h4>
                                            <p className="mt-2 mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Nulla voluptate amet enim atque impedit inventore.
                                            </p>
                                            <a
                                                href="service-detail.html"
                                                className="btn border border-1 border-green"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="service-box p-6 border border-2 bg-white border-lightgreen rounded2 shadow">
                                        <div className="service-icon mb-4">
                                            <img src="images/PNG/battery_full.png" alt="service-icon" />
                                        </div>
                                        <div className="service-info">
                                            <h4>
                                                <a href="service-detail.html" className="black">
                                                    DC Charger
                                                </a>
                                            </h4>
                                            <p className="mt-2 mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Nulla voluptate amet enim atque impedit inventore.
                                            </p>
                                            <a
                                                href="service-detail.html"
                                                className="btn border border-1 border-green"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="service-box p-6 border border-2 bg-white border-lightgreen rounded2 shadow">
                                        <div className="service-icon mb-4">
                                            <img src="images/PNG/car_with_plug.png" alt="service-icon" />
                                        </div>
                                        <div className="service-info">
                                            <h4>
                                                <a href="service-detail.html" className="black">
                                                    24/7 Support
                                                </a>
                                            </h4>
                                            <p className="mt-2 mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Nulla voluptate amet enim atque impedit inventore.
                                            </p>
                                            <a
                                                href="service-detail.html"
                                                className="btn border border-1 border-green"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Service Section Ends */}
            {/* More About Section Starts */}
            <section className="more-about pt-10 rounded3 position-relative z-1">
                <div className="container">
                    <div className="more-about-inner px-2 text-center text-xl-start">
                        <div className="row gx-xl-5 gy-5 align-items-center">
                            <div className="col-xl-7">
                                <div className="section-left m-0 pb-9">
                                    <div className="section-title mb-6">
                                        <h6 className="text-uppercase fw-medium green1 mb-1">
                                            Who we are
                                        </h6>
                                        <h2 className="ps-4 border-start border-3 border-green text-white">
                                            Effortless Charging from{" "}
                                            <span className="green">Best in business</span>
                                        </h2>
                                    </div>
                                    <div className="section-body text-white position-relative">
                                        <p className="mb-4">
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                            occaecat cupidatat non proident, sunt in culpa qui officia
                                            deserunt mollit anim id est laborum.
                                        </p>
                                        <p className="mb-4">
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.
                                        </p>
                                        <a href="about.html" className="btn btn2 mb-7">
                                            Discover More
                                        </a>
                                        <div className="about-counter text-center text-xl-start">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="counter-box mb-6 pb-6 border-bottom border-1 border-grey">
                                                        <h2 className="green">
                                                            <span className="num" data-val={20}>20</span>+
                                                        </h2>
                                                        <span className="text-uppercase fw-medium">
                                                            Years Experience
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="counter-box mb-6 pb-6 border-bottom border-1 border-grey">
                                                        <h2 className="green">
                                                            <span className="num" data-val={80}>80</span>+
                                                        </h2>
                                                        <span className="text-uppercase fw-medium">
                                                            Service Stations
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="counter-box mb-6 pb-6">
                                                        <h2 className="green">
                                                            <span className="num" data-val={15}>15</span>K+
                                                        </h2>
                                                        <span className="text-uppercase fw-medium">
                                                            Positive Reviews
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="counter-box mb-6 border-0">
                                                        <h2 className="green">
                                                            <span className="num" data-val={20}>20</span>K+
                                                        </h2>
                                                        <span className="text-uppercase fw-medium">
                                                            Happy Customers
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5">
                                <div className="section-right">
                                    <div className="about-video-wrapper position-relative text-center">
                                        <img
                                            src="images/electric-vehicle-charging-png.png"
                                            alt="video thumbnail"
                                            className="w-lg-75 w-md-50 w-100 m-auto rounded2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* More About Section Ends */}
            {/* Pricing Section Starts */}
            <section className="pricing pt-11 position-relative">
                <div className="container">
                    <div className="pricing-inner">
                        <div className="row align-items-center gy-5">
                            {/* Left Side Title */}
                            <div className="col-lg-4">
                                <div className="section-title text-center text-lg-start">
                                    <h6 className="text-uppercase fw-medium green1 mb-1">Pricing</h6>
                                    <h2 className="ps-4 border-start border-3 border-green mb-4">
                                        Explore our charging<span className="green"> Plans</span>
                                    </h2>
                                    <p className="mb-4">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
                                        expedita temporibus dolore, minus perspiciatis porro et modi.
                                    </p>
                                    <a href="price.html" className="btn btn2">
                                        View Plans
                                    </a>
                                </div>
                            </div>

                            {/* Right Side Slider */}
                            <div className="col-lg-8">
                                <div className="section-body text-center">
                                    <Slider {...priceSlider_settings} className="price-slider">

                                        {/* Slide 1 */}
                                        <div className="slide mx-2">
                                            <div className="pricing-box bg-white py-4 px-5 mx-2 rounded2 border border-2 border-lightgreen">
                                                <div className="price-title">
                                                    <h4 className="green1 text-uppercase mb-1">Business</h4>
                                                    <span className="fw-medium">Stander Package</span>
                                                </div>
                                                <div className="plan-price py-6 green1">
                                                    <div className="plan-price inter text-uppercase d-flex align-items-center justify-content-center">
                                                        <span className="currency fw-bold align-self-start lh-lg h5">$</span>
                                                        <span className="h1 fw-bold mb-0 lh-1">19</span>
                                                        <span className="currency align-self-start fw-bold lh-lg h5">99</span>
                                                    </div>
                                                    <span>per Month</span>
                                                </div>
                                                <div className="plan-listing mb-6">
                                                    <ul className="list-unstyled">
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Availability Status
                                                        </li>
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Booking & Reservation
                                                        </li>
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Mobile App Linking
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            One-Click Checkout
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="pricing-btn">
                                                    <a href="" className="btn btn2 mb-2">
                                                        Choose Plan
                                                    </a>
                                                    <p className="small">
                                                        *Please read our term and condition before ordering a Package
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slide 2 */}
                                        <div className="slide mx-2">
                                            <div className="pricing-box position-relative overflow-hidden bg-white py-4 px-5 mx-2 rounded2 border border-2 border-lightgreen">
                                                <div className="price-title">
                                                    <h4 className="green1 text-uppercase mb-1">Premium</h4>
                                                    <span className="fw-medium">Pro Package</span>
                                                </div>
                                                <div className="plan-price py-6 green1">
                                                    <div className="plan-price inter text-uppercase d-flex align-items-center justify-content-center">
                                                        <span className="currency fw-bold align-self-start lh-lg h5">$</span>
                                                        <span className="h1 fw-bold mb-0 lh-1">39</span>
                                                        <span className="currency align-self-start fw-bold lh-lg h5">99</span>
                                                    </div>
                                                    <span>per Month</span>
                                                </div>
                                                <div className="plan-listing mb-6">
                                                    <ul className="list-unstyled">
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Availability Status
                                                        </li>
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Booking & Reservation
                                                        </li>
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Mobile App Linking
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            One-Click Checkout
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="pricing-btn">
                                                    <a href="" className="btn btn2 mb-2">
                                                        Choose Plan
                                                    </a>
                                                    <p className="small">
                                                        *Please read our term and condition before ordering a Package
                                                    </p>
                                                </div>
                                                <div className="popular-tag px-8 py-1 bg-green small text-white text-uppercase position-absolute">
                                                    Trending
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slide 3 */}
                                        <div className="slide mx-2">
                                            <div className="pricing-box bg-white py-4 px-5 mx-2 rounded2 border border-2 border-lightgreen">
                                                <div className="price-title">
                                                    <h4 className="green1 text-uppercase mb-1">Enterprise</h4>
                                                    <span className="fw-medium">Pro Package</span>
                                                </div>
                                                <div className="plan-price py-6 green1">
                                                    <div className="plan-price inter text-uppercase d-flex align-items-center justify-content-center">
                                                        <span className="currency fw-bold align-self-start lh-lg h5">$</span>
                                                        <span className="h1 fw-bold mb-0 lh-1">79</span>
                                                        <span className="currency align-self-start fw-bold lh-lg h5">99</span>
                                                    </div>
                                                    <span>per Month</span>
                                                </div>
                                                <div className="plan-listing mb-6">
                                                    <ul className="list-unstyled">
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Availability Status
                                                        </li>
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Booking & Reservation
                                                        </li>
                                                        <li className="mb-1 border-dashed border-1 border-start-0 border-end-0 border-top-0 mb-2 pb-2">
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            Mobile App Linking
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-check green1 me-1" aria-hidden="true"></i>
                                                            One-Click Checkout
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="pricing-btn">
                                                    <a href="" className="btn btn2 mb-2">
                                                        Choose Plan
                                                    </a>
                                                    <p className="small">
                                                        *Please read our term and condition before ordering a Package
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </Slider>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* Pricing Section Ends */}
            {/* How we work Section Starts */}
            <section className="how-work bg-lightgreen py-10">
                <div className="container">
                    <div className="how-work-inner">
                        <div className="section-title text-center w-lg-50 w-md-75 m-auto mb-8">
                            <h6 className="text-uppercase fw-medium mb-1 green1">How we work</h6>
                            <h2 className="">
                                Professional <span className="green">EV Charging</span> solution for
                                you
                            </h2>
                        </div>
                        <div className="section-body position-relative">
                            <div className="timeline position-relative z-2 text-center text-md-start">
                                <div className="timeline-row position-relative w-md-50 mb-4">
                                    <div className="work-box-number text-center p-2 rounded-circle border border-3 border-lightgreen bg-green d-inline-block h-auto mb-2 position-absolute top-50 start-100 translate-middle">
                                        <h4 className="text-white">01.</h4>
                                    </div>
                                    <div className="work-info position-relative p-4 border-3 border border-white bg-lightgreen1 me-9 rounded2">
                                        <h4 className="mb-3">Fast Charging</h4>
                                        <p>
                                            Lorem ipsum dolor sit consectetur adipiscing elit, sed do
                                            eiusmod tempor amet.
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-row position-relative w-md-50 ms-auto mb-4">
                                    <div className="work-box-number text-center p-2 rounded-circle border border-3 border-lightgreen bg-green d-inline-block h-auto mb-2 position-absolute top-50 start-0 translate-middle">
                                        <h4 className="text-white">02.</h4>
                                    </div>
                                    <div className="work-info position-relative p-4 border-3 border border-white bg-lightgreen1 ms-9 rounded2">
                                        <h4 className="mb-3">Good Management</h4>
                                        <p>
                                            Lorem ipsum dolor sit consectetur adipiscing elit, sed do
                                            eiusmod tempor amet.
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-row position-relative w-md-50 mb-4">
                                    <div className="work-box-number text-center p-2 rounded-circle border border-3 border-lightgreen bg-green d-inline-block h-auto mb-2 position-absolute top-50 start-100 translate-middle">
                                        <h4 className="text-white">03.</h4>
                                    </div>
                                    <div className="work-info position-relative p-4 border-3 border border-white bg-lightgreen1 me-9 rounded2">
                                        <h4 className="mb-3">Renewable Energy</h4>
                                        <p>
                                            Lorem ipsum dolor sit consectetur adipiscing elit, sed do
                                            eiusmod tempor amet.
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-row position-relative w-md-50 ms-auto mb-0">
                                    <div className="work-box-number text-center p-2 rounded-circle border border-3 border-lightgreen bg-green d-inline-block h-auto mb-2 position-absolute top-50 start-0 translate-middle">
                                        <h4 className="text-white">04.</h4>
                                    </div>
                                    <div className="work-info position-relative p-4 border-3 border border-white bg-lightgreen1 ms-9 rounded2">
                                        <h4 className="mb-3">Quality Charger</h4>
                                        <p>
                                            Lorem ipsum dolor sit consectetur adipiscing elit, sed do
                                            eiusmod tempor amet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* How we work Section Ends */}
            {/* Our Projects Section Starts */}
            <section className="project pb-10">
                <div className="container">
                    <div className="project-inner">
                        <div className="section-title mb-6 text-center text-lg-start">
                            <div className="row align-items-center gy-4">
                                <div className="col-lg-7">
                                    <div className="section-title-left">
                                        <h6 className="mb-2 green1 text-uppercase fw-medium">
                                            Our Portfolio
                                        </h6>
                                        <h2 className="ps-4 border-start border-3 border-green">
                                            Take a look at some of our ongoing{" "}
                                            <span className="green">EV Projects</span>
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="section-title-right">
                                        <p className="mb-3">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                                            dolor architecto molestias a quodritatis minima accusamus.
                                        </p>
                                        <a href="project-list.html" className="btn btn2">
                                            All Projects
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section-body">
                            <Slider {...projectSlider_settings}>
                                <div className="slide mx-1">
                                    <div className="project-box rounded2 overflow-hidden border border-2 border-lightgreen">
                                        <div className="project-image position-relative">
                                            <img
                                                src="images/modern-electric-car-charging-at-outdoors-ev-statio-2023-03-17-23-18-45-utc.jpg"
                                                alt="project"
                                                className="w-100 rounded2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="slide mx-1">
                                    <div className="project-box rounded2 overflow-hidden border border-2 border-lightgreen">
                                        <div className="project-image position-relative">
                                            <img
                                                src="images/hand-holding-electric-car-charger-electric-vehicl-2022-11-16-14-02-45-utc.jpg"
                                                alt="project"
                                                className="w-100 rounded2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="slide mx-1">
                                    <div className="project-box rounded2 overflow-hidden border border-2 border-lightgreen">
                                        <div className="project-image position-relative">
                                            <img
                                                src="images/rearview-car-parked-in-luxury-showroom-car-dealer-2023-03-30-01-57-28-utc.JPG"
                                                alt="project"
                                                className="w-100 rounded2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="slide mx-1">
                                    <div className="project-box rounded2 overflow-hidden border border-2 border-lightgreen">
                                        <div className="project-image position-relative">
                                            <img
                                                src="images/electric-car-charging-connected-to-the-grid-2023-02-07-21-01-15-utc.jpg"
                                                alt="project"
                                                className="w-100 rounded2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
            {/* Our Projects Section Ends */}
            {/* Testimonial Section Starts */}
            <section className="testimonial-1 py-9 rounded3 rounded-start-0 position-relative">
                <div className="overlay rounded3 rounded-start-0" />
                <div className="container position-relative">
                    <div className="testimonial-1-inner text-center text-md-start">
                        <div className="row align-items-center gx-lg-5">
                            <div className="col-lg-7">
                                <div className="section-left position-relative">
                                    <Slider {...terminalSlider_settings} className="testimonial-slider bg-white rounded2 py-4 position-relative">

                                        {/* Slide 1 */}
                                        <div className="slide">
                                            <div className="review-box p-6 py-8 position-relative">
                                                <div className="qoute-icon p-3 h2 bg-lightgreen1 position-absolute rounded2">
                                                    <i className="fa fa-quote-right green" aria-hidden="true" />
                                                </div>
                                                <div className="review-star mb-3">
                                                    <ul className="list-unstyled d-flex justify-content-center justify-content-md-start gap-1">
                                                        <li><i className="fa fa-star green" /></li>
                                                        <li><i className="fa fa-star green" /></li>
                                                        <li><i className="fa fa-star green" /></li>
                                                        <li><i className="fa fa-star green" /></li>
                                                        <li><i className="fa fa-star green" /></li>
                                                    </ul>
                                                </div>
                                                <div className="review-info mb-6">
                                                    <p className="h4 fw-normal fst-italic lh-base mb-0">
                                                        "Duis aute irure dolor in repre hend in volu ptate velites mollit anim id..."
                                                    </p>
                                                </div>
                                                <div className="reviewer-bio d-flex align-items-center justify-content-center justify-content-md-start">
                                                    <div className="reviewer-image me-4">
                                                        <img src="images/review1.jpg" alt="reviewer" className="rounded-circle object-fit-cover" />
                                                    </div>
                                                    <div className="review-info">
                                                        <h6 className="grey mb-1">Miley Houdson</h6>
                                                        <span className="green1 fw-medium">CEO, Houston</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slide 2 */}
                                        <div className="slide">
                                            <div class="review-box p-6 py-8 position-relative">
                                                <div class="qoute-icon p-3 h2 bg-lightgreen1 position-absolute rounded2">
                                                    <i><i class="fa fa-quote-right green" aria-hidden="true"></i></i>
                                                </div>
                                                <div class="review-star mb-3">
                                                    <ul class="list-unstyled d-flex justify-content-center justify-content-md-start gap-1">
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                    </ul>
                                                </div>
                                                <div class="review-info mb-6">
                                                    <p class="h4 fw-normal fst-italic lh-base mb-0">"Duis aute irure dolor in repre hend in volu ptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."</p>
                                                </div>
                                                <div class="reviewer-bio d-flex align-items-center justify-content-center justify-content-md-start">
                                                    <div class="reviewer-image me-4">
                                                        <img src="images/review3.jpg" alt="review-image" class="rounded-circle object-fit-cover" />
                                                    </div>
                                                    <div class="review-info">
                                                        <h6 class="grey mb-1">Tyler Herro</h6>
                                                        <span class="green1 fw-medium">Technician, Compton</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slide 3 */}
                                        <div className="slide">
                                            <div class="review-box p-6 py-8 position-relative">
                                                <div class="qoute-icon p-3 h2 bg-lightgreen1 position-absolute rounded2">
                                                    <i><i class="fa fa-quote-right green" aria-hidden="true"></i></i>
                                                </div>
                                                <div class="review-star mb-3">
                                                    <ul class="list-unstyled d-flex justify-content-center justify-content-md-start gap-1">
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                        <li><i class="fa fa-star green" aria-hidden="true"></i></li>
                                                    </ul>
                                                </div>
                                                <div class="review-info mb-6">
                                                    <p class="h4 fw-normal fst-italic lh-base mb-0">"Duis aute irure dolor in repre hend in volu ptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."</p>
                                                </div>
                                                <div class="reviewer-bio d-flex align-items-center justify-content-center justify-content-md-start">
                                                    <div class="reviewer-image me-4">
                                                        <img src="images/review4.jpg" alt="review-image" class="rounded-circle object-fit-cover" />
                                                    </div>
                                                    <div class="review-info">
                                                        <h6 class="grey mb-1">Kendrick Mathers</h6>
                                                        <span class="green1 fw-medium">Driver, LA</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div class="section-right position-relative h-100">
                                    <div className="section-right-inner text-center mt-5">
                                        <div className="about-video mb-3">
                                            <div className="lightgallery-box position-relative d-inline-block">
                                                <div className="promo-video position-relative d-inline-block">
                                                    <div className="waves-block position-relative d-inline-block">
                                                        <div className="waves wave-1 position-absolute rounded-circle z-n1"></div>
                                                        <div className="waves wave-2 position-absolute rounded-circle z-n1"></div>
                                                        <div className="waves wave-3 position-absolute rounded-circle z-n1"></div>

                                                        <a
                                                            data-src="https://youtu.be/VhBl3dHT5SY"
                                                            className="about-video-play video-popup mfp-iframe bg-green rounded-circle text-center text-white d-inline-flex align-items-center justify-content-center"
                                                            style={{ width: "60px", height: "60px", position: "relative", zIndex: 2 }}
                                                        >
                                                            <i className="fa fa-play fa-lg" aria-hidden="true"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="list-unstyled d-flex justify-content-center mb-2 gap-1">
                                            <li><i className="fa fa-star green" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star green" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star green" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star green" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star green" aria-hidden="true"></i></li>
                                        </ul>

                                        <p className="text-white fw-medium">
                                            <span className="fw-bold">99.9% Customer Satisfaction</span> based on 550+ reviews of 2,250 Completed Projects, and 2,820 Happy Customers trust us.
                                        </p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Testimonial Section Ends */}
            {/* Blog Section Starts */}
            <section className="blog py-10 m-0">
                <div className="container">
                    <div className="blog-inner">
                        <div className="blog-title mb-6 text-center text-lg-start">
                            <div className="row align-items-center gy-4">
                                <div className="col-lg-7">
                                    <div className="blog-title-left">
                                        <h6 className="mb-2 green1 text-uppercase fw-medium">
                                            Our News &amp; articles
                                        </h6>
                                        <h2 className="ps-4 border-start border-3 border-green">
                                            Latest Buzz <span className="green">what's new?</span>
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="blog-title-right">
                                        <p className="mb-3">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                                            dolor archite ea veritatis minima accusamus.
                                        </p>
                                        <a href="blog-list.html" className="btn btn2">
                                            All Blogs
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="blog-body">
                            <div className="row align-items-stretch gy-4">
                                <div className="col-lg-8">
                                    <div className="blog-body-left h-100">
                                        <Slider {...blogSlider_settings} className="news-slider h-100 p-6 px-2  rounded2 border border-2 border-lightgreen bg-white">

                                            <div className="slide px-5 mx-1">
                                                <div className="blog-box">
                                                    <div className="row align-items-center gy-4">
                                                        <div className="col-md-5 order-2 order-md-1">
                                                            <div className="blog-info">
                                                                <div className="blog-tag px-2 py-1 rounded2 bg-lightgreen black small d-inline-block mb-2">
                                                                    <span className="fw-medium">Electric</span>
                                                                </div>
                                                                <h4 className="mb-4">
                                                                    <a href="blog-detail.html" className="black">
                                                                        Business benefits from EV management software
                                                                    </a>
                                                                </h4>
                                                                <p className="mb-2">
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolor archite ea veritatis.
                                                                </p>
                                                                <div className="blog-data pt-2 border-top border-1 border-grey2">
                                                                    <span className="small">January 10, 2025 | 1 Comment</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 order-1 order-md-2">
                                                            <div className="blog-image position-relative">
                                                                <a href="blog-detail.html">
                                                                    <img
                                                                        src="images/electric-car-charging-connected-to-the-grid-2023-02-07-21-01-15-utc.jpg"
                                                                        alt=""
                                                                        className="w-100 rounded1"
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="slide px-5 mx-1">
                                                <div className="blog-box">
                                                    <div className="row align-items-center gy-4">
                                                        <div className="col-md-5 order-2 order-md-1">
                                                            <div className="blog-info">
                                                                <div className="blog-tag px-2 py-1 rounded2 bg-lightgreen black small d-inline-block mb-2">
                                                                    <span className="fw-medium">Electric</span>
                                                                </div>
                                                                <h4 className="mb-4">
                                                                    <a href="blog-detail.html" className="black">
                                                                        Solar cells for electric charge appeared on sale
                                                                    </a>
                                                                </h4>
                                                                <p className="mb-2">
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolor archite ea veritatis.
                                                                </p>
                                                                <div className="blog-data pt-2 border-top border-1 border-grey2">
                                                                    <span className="small">January 10, 2025 | 1 Comment</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 order-1 order-md-2">
                                                            <div className="blog-image position-relative">
                                                                <a href="blog-detail.html">
                                                                    <img
                                                                        src="images/rearview-car-parked-in-luxury-showroom-car-dealer-2023-03-30-01-57-28-utc.JPG"
                                                                        alt=""
                                                                        className="w-100 rounded1"
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="slide px-5 mx-1">
                                                <div className="blog-box">
                                                    <div className="row align-items-center gy-4">
                                                        <div className="col-md-5 order-2 order-md-1">
                                                            <div className="blog-info">
                                                                <div className="blog-tag px-2 py-1 rounded2 bg-lightgreen black small d-inline-block mb-2">
                                                                    <span className="fw-medium">Electric</span>
                                                                </div>
                                                                <h4 className="mb-4">
                                                                    <a href="blog-detail.html" className="black">
                                                                        Auto dealership need EV charging station
                                                                    </a>
                                                                </h4>
                                                                <p className="mb-2">
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolor archite ea veritatis.
                                                                </p>
                                                                <div className="blog-data pt-2 border-top border-1 border-grey2">
                                                                    <span className="small">January 10, 2025 | 1 Comment</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 order-1 order-md-2">
                                                            <div className="blog-image position-relative">
                                                                <a href="blog-detail.html">
                                                                    <img
                                                                        src="images/hand-holding-electric-car-charger-electric-vehicl-2022-11-16-14-02-45-utc.jpg"
                                                                        alt=""
                                                                        className="w-100 rounded1"
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Slider>
                                    </div>
                                </div>

                                <div className="col-lg-4 d-flex">
                                    <div className="blog-body-right h-100 p-6 py-4 rounded2 border border-2 border-lightgreen bg-white">
                                        <div className="blog-box">
                                            <div className="blog-image mb-4 position-relative">
                                                <a href="blog-detail.html">
                                                    <img
                                                        src="images/indian-businessman-charging-car-at-outdoor-ev-stat-2023-03-17-23-18-50-utc.jpg"
                                                        alt="blog image"
                                                        className="w-100 rounded1"
                                                    />
                                                </a>
                                            </div>
                                            <div className="blog-info">
                                                <h5 className="mb-3">
                                                    <a href="blog-detail.html" className="black">
                                                        what is EV charging loading management
                                                    </a>
                                                </h5>
                                                <ul className="list-unstyled d-flex align-items-center justify-content-between">
                                                    <li className="blog-tag px-2 py-1 rounded2 bg-lightgreen black small">
                                                        <span className="fw-medium">Charger</span>
                                                    </li>
                                                    <li className="small">January 10, 2025</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Blog Section Ends */}
            {/* Contact Us section Starts */}
            <section className="contact-mobile pb-10">
                <div className="container">
                    <div className="contact-mobile-inner">
                        <div className="row gy-5 align-items-center">
                            <div className="col-lg-6">
                                <div className="mobile-app1">
                                    <div className="mobile-app1-title mb-6 text-center">
                                        <h6 className="text-uppercase fw-medium green1 mb-1">
                                            Download evcharge app
                                        </h6>
                                        <h2>
                                            Discover Nearby{" "}
                                            <span className="green">charging station</span> with our app
                                        </h2>
                                    </div>
                                    <div className="mobile-app1-body">
                                        <div className="mobile-app-image text-center ">
                                            <img
                                                src="images/mockup-ev.png"
                                                alt="app image"
                                                className="w-50 m-auto"
                                            />
                                        </div>
                                        <ul className="list-unstyled text-center download-btn d-md-flex justify-content-center">
                                            <li className="mx-1 my-2">
                                                <a href="" className="btn btn2">
                                                    <i className="fa fa-apple me-2" aria-hidden="true" /> App
                                                    store
                                                </a>
                                            </li>
                                            <li className="mx-1 my-2 h6">
                                                <a href="" className="btn border border-1 border-green">
                                                    <i className="fa fa-play me-2" aria-hidden="true" /> Play
                                                    Store
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-form p-6 bg-white rounded2 border border-2 border-lightgreen">
                                    <div className="form-title mb-6 text-center">
                                        <h3 className="mb-2">Any questions? Ask us!!</h3>
                                        <p>
                                            Magna voluptatum dolorem! Dolores! Sociosqu commodo nobis
                                            imperdiet lacinia
                                        </p>
                                    </div>
                                    <div className="career-form-inner">
                                        <form>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Your Name*"
                                                className="bg-lightgreen mb-4"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Your Email*"
                                                className="bg-lightgreen mb-4"
                                            />
                                            <input
                                                type="number"
                                                name="number"
                                                id="number"
                                                placeholder="Mobile Number"
                                                className="bg-lightgreen mb-4"
                                            />
                                            <textarea
                                                className="bg-lightgreen mb-4"
                                                rows={4}
                                                placeholder="Enter your message*"
                                                defaultValue={""}
                                            />
                                            <button className="btn btn2">Submit Message</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Us section Ends */}
            {/* Footer Section Starts */}
            <footer className="rounded-bottom-0 pb-6 pt-9 rounded3 position-relative text-center text-xl-start">
                <div className="container">
                    <div className="footer-inner">
                        <div className="footer-middle mb-6 pb-8 border-bottom border-1 border-grey">
                            <div className="row gy-5 align-items-center">
                                <div className="col-xl-8">
                                    <div className="newsletter m-0">
                                        <div className="newsletter-title mb-4">
                                            <h6 className="text-uppercase fw-medium mb-1 text-white">
                                                Subscribe Newsletter
                                            </h6>
                                            <h2 className="text-white">
                                                Don't miss our future updates! Get subscribed today!
                                            </h2>
                                        </div>
                                        <div className="newsletter-body">
                                            <div className="search-bar">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className=" w-md-50"
                                                />
                                                <a href="" className="btn btn2 mx-1 my-2">
                                                    subscribe
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-md-6">
                                    <div className="quick-links">
                                        <h3 className="text-white mb-2">Quick Link</h3>
                                        <div className="seperator w-25 border-bottom border-1 border-white mb-6 ms-xl-1 m-auto" />
                                        <ul className="list-unstyled">
                                            <li className="mb-4">
                                                <a href="about.html">About Us</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="service-list.html">Services</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="">Attorneys</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="blog-list.html">News &amp; Articles</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="">Policies</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-md-6">
                                    <div className="quick-links">
                                        <h3 className="text-white mb-2">Features</h3>
                                        <div className="seperator w-25 border-bottom border-1 border-white mb-6 ms-xl-1 m-auto" />
                                        <ul className="list-unstyled">
                                            <li className="mb-4">
                                                <a href="">Support Plans</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="">Benifits</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="">Subscriptions</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="">Payment Methods</a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="">Onsite Payment</a>
                                            </li>
                                            <li>
                                                <a href="">Merchant Refund</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom pb-5">
                            <div className="row gy-3 align-items-center">
                                <div className="col-lg-6">
                                    <div className="footer-logo1">
                                        <div className="footer-logo-image text-lg-start">
                                            {/* <h3 style={{ color: "white" }}>Your Brand Logo</h3> */}
                                            <img src="Unicharge_logo.png" alt="footer logo" class="w-lg-10 w-md-10 w-10"/>
                                            <img src="Unicharge_logo_text.png" alt="footer logo" class="w-lg-30 w-md-30 w-30"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="footer-socials d-flex justify-content-center justify-content-lg-end">
                                        <a
                                            href=""
                                            className="rounded-circle text-center me-1 bg-lightdark"
                                        >
                                            <i className="fa fa-facebook" aria-hidden="true" />
                                        </a>
                                        <a
                                            href=""
                                            className="rounded-circle text-center me-1 bg-lightdark"
                                        >
                                            <i className="fa fa-twitter" aria-hidden="true" />
                                        </a>
                                        <a
                                            href=""
                                            className="rounded-circle text-center me-1 bg-lightdark"
                                        >
                                            <i className="fa fa-google-plus" aria-hidden="true" />
                                        </a>
                                        <a href="" className="rounded-circle text-center bg-lightdark">
                                            <i className="fa fa-instagram" aria-hidden="true" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="copyright px-4 py-2 rounded2 text-center position-relative">
                            <div className="overlay bg-white rounded2" />
                            <div className="copyright-inner position-relative">
                                <div className="row gy-4 align-items-center">
                                    <div className="col-xl-8">
                                        <div className="copyright-links">
                                            <ul className="list-unstyled small d-md-flex text-white justify-content-center justify-content-xl-start">
                                                <li className="me-4 my-2">
                                                    <i className="fa fa-map-marker me-1" aria-hidden="true" />{" "}
                                                    256 Elizaberth Ave, CA, 90025
                                                </li>
                                                <li className="me-4 my-2">
                                                    <a href="tel:+4733378901" className="text-white">
                                                        <i className="fa fa-phone me-1" aria-hidden="true" />{" "}
                                                        +569 2316 2156
                                                    </a>
                                                </li>
                                                <li className="my-2">
                                                    <a
                                                        href="/cdn-cgi/l/email-protection#60090e060f20170502130914054e030f0d"
                                                        className="text-white"
                                                    >
                                                        <i
                                                            className="fa fa-envelope-o me-1"
                                                            aria-hidden="true"
                                                        />{" "}
                                                        <span
                                                            className="__cf_email__"
                                                            data-cfemail="84edeae2ebc4e1f2e0f6edf2e1fcaae7ebe9"
                                                        >
                                                            [email&nbsp;protected]
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="copyright-info text-xl-end text-white">
                                            <p className="small">2025 Brand Name. All rights reserved.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Footer Section Starts */}
            {/*Back-to-top Button start*/}
            <div id="back-to-top">
                <a
                    href="#"
                    className="bg-green position-relative align-items-center rounded-circle d-block border border-4 border-grey"
                />
            </div>
            {/*Bacl-to-top Button end*/}
        </div>
    );
}

export default Landing;