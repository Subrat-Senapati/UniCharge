import { NavLink, Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className="position-relative z-3">
      <div className="header-nav-menu navbar-sticky-in" id="header-nav-menu">
        <div className="container">
          <nav className="navbar navbar-expand-xl">

            <div id="slicknav-mobile-tab" className="d-flex align-items-center justify-content-between w-100 d-xl-none">
              {/* Mobile logo (visible only on small screens) */}
              <a className="navbar-brand d-xl-none" href="/">
                <img
                  src="/Unicharge_logo_text.png"
                  alt="Logo"
                  className="w-20"
                />
              </a>

              {/* Mobile toggle button */}
              <button
                className="navbar-toggler slicknav_btn text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{
                  color: "white !important",
                  backgroundColor: "transparent",
                }}
              >
                <span className="navbar-toggler-icon text-white"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="d-flex py-1 w-100 align-items-center justify-content-between">
                {/* Left nav links */}
                <ul className="navbar-nav flex-row gap-3">
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""
                        }`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""
                        }`
                      }
                    >
                      Services
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""
                        }`
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>

                {/* Center logo (desktop only) */}
                <a
                  className="navbar-brand position-absolute start-50 translate-middle-x d-none d-xl-block text-center"
                  href="/"
                >
                  <img
                    src="/Unicharge_logo_text.png"
                    alt="Logo"
                    className="w-40"
                  />
                </a>

                {/* Right nav links */}
                <ul className="navbar-nav flex-row gap-3">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-uppercase fw-medium"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-uppercase fw-medium"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;