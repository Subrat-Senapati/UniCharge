import { NavLink, Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className="position-relative z-3">
      <div className="header-nav-menu navbar-sticky-in" id="header-nav-menu">
        <div className="container">
          <nav className="navbar navbar-expand-xl">

            <div className="d-flex align-items-center justify-content-between w-100 d-xl-none">
              {/* Mobile logo (visible only on small screens) */}
              <Link className="navbar-brand" to="/">
                <img
                  src="/Unicharge_logo_text.png"
                  alt="Logo"
                  className="w-20"
                />
              </Link>

              {/* Mobile toggle button */}
              <button
                className="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" style={{"filter": "invert(1)"}}></span>
              </button>
            </div>

            <div className="collapse navbar-collapse mt-1 mt-xl-0" id="navbarNav">
              {/* Desktop layout - unchanged */}
              <div className="d-none d-xl-flex py-1 w-100 align-items-center justify-content-between">
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
                <Link
                  className="navbar-brand position-absolute start-50 translate-middle-x d-none d-xl-block text-center"
                  to="/"
                >
                  <img
                    src="/Unicharge_logo_text.png"
                    alt="Logo"
                    className="w-40"
                  />
                </Link>

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

              {/* Mobile layout - only visible on small screens */}
              <div className="d-flex d-xl-none flex-column">
                <ul className="navbar-nav flex-column gap-2">
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      Services
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>

                {/* Mobile auth links */}
                <div className="border-top mt-3 pt-3">
                  <ul className="navbar-nav flex-column gap-2">
                    <li className="nav-item">
                      <Link
                        className="nav-link text-uppercase fw-medium px-0"
                        to="/signup"
                      >
                        SignUp
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-uppercase fw-medium px-0"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;