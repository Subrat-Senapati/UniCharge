import { NavLink, Link } from "react-router-dom";
import { FaUserCircle, FaBell, FaWallet } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const isNotificationExpired = (notification) => {
  if (!notification.expiresAt) return false;
  const now = new Date();
  const expiresAt = new Date(notification.expiresAt);
  return now > expiresAt;
};

const Header = () => {
  const { user } = useAuth();
  const notificationsData = user?.notifications || [];
  const unreadCount = notificationsData
    .filter(n => !isNotificationExpired(n))
    .filter(n => !n.isRead)
    .length;

  return (
    <header className="position-relative z-3 shadow-sm">
      <div className="header-nav-menu navbar-sticky-in text-white" id="header-nav-menu">
        <div className="container">
          <nav className="navbar navbar-expand-xl py-1">
            
            {/* Mobile Header - Only visible on small screens */}
            <div className="d-flex align-items-center justify-content-between w-100 d-xl-none">
              {/* Mobile Logo */}
              <Link className="navbar-brand" to="/home/dashboard">
                <img
                  src="/Unicharge_logo_text.png"
                  alt="App Logo"
                  style={{ maxHeight: "35px" }}
                />
              </Link>

              {/* Mobile Toggle Button */}
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

            {/* Collapsible Menu */}
            <div className="collapse navbar-collapse mt-2 mt-xl-0" id="navbarNav">
              
              {/* Desktop Layout - Unchanged */}
              <div className="d-none d-xl-flex w-100 align-items-center justify-content-between">
                {/* Left side */}
                <ul className="navbar-nav flex-row gap-4 align-items-center">
                  {/* Dashboard/Profile */}
                  <li className="nav-item">
                    <NavLink to="/home/dashboard" className="nav-link">
                      <FaUserCircle size={28} className="text-white" />
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/chargehub"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/vehicle"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      Vehicle
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/wallet"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      Wallet
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/history"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""}`
                      }
                    >
                      History
                    </NavLink>
                  </li>
                </ul>

                {/* Right side */}
                <ul className="navbar-nav flex-row gap-4 align-items-center justify-content-end">
                  {/* Notification */}
                  <li className="nav-item">
                    <NavLink to="/home/notifications" className="nav-link position-relative">
                      <FaBell size={22} className="text-white" />
                      <span
                        className="position-absolute mt-1 top-65 start-65 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {unreadCount}
                      </span>
                    </NavLink>
                  </li>

                  {/* Wallet Balance */}
                  <li className="d-flex align-items-center">
                    <NavLink
                      to="/home/wallet" 
                      className="wallet-link d-flex align-items-center py-1 px-2"
                    >
                      <FaWallet size={22} className="me-2 text-white" />
                      <span className="fw-bold">₹{user?.wallet?.balance?.toFixed(2) || '0.00'}</span>
                    </NavLink>
                  </li>

                  {/* App Logo */}
                  <li className="nav-item">
                    <Link className="navbar-brand d-flex align-items-center" to="/home/location">
                      <img
                        src="/Unicharge_logo_text.png"
                        alt="App Logo"
                        className="w-95"
                        style={{ maxHeight: "40px" }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Mobile Layout - Only visible on small screens */}
              <div className="d-flex d-xl-none flex-column w-100">
                {/* User Profile & Wallet Section */}
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <NavLink to="/home/dashboard" className="nav-link d-flex align-items-center">
                    <FaUserCircle size={32} className="text-white me-2" />
                    <span className="text-white">Profile</span>
                  </NavLink>
                  
                  <NavLink to="/home/wallet" className="wallet-link d-flex align-items-center">
                    <FaWallet size={24} className="me-2 text-white" />
                    <span className="fw-bold text-white">₹{user?.wallet?.balance?.toFixed(2) || '0.00'}</span>
                  </NavLink>
                </div>

                {/* Navigation Links */}
                <ul className="navbar-nav flex-column gap-2 mb-3">
                  <li className="nav-item">
                    <NavLink
                      to="/home/chargehub"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 py-2 ${isActive ? "text-success fw-bold" : "text-white"}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/vehicle"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 py-2 ${isActive ? "text-success fw-bold" : "text-white"}`
                      }
                    >
                      Vehicle
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/wallet"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 py-2 ${isActive ? "text-success fw-bold" : "text-white"}`
                      }
                    >
                      Wallet
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/home/history"
                      className={({ isActive }) =>
                        `nav-link text-uppercase fw-medium px-0 py-2 ${isActive ? "text-success fw-bold" : "text-white"}`
                      }
                    >
                      History
                    </NavLink>
                  </li>
                </ul>

                {/* Notifications */}
                <div className="border-top pt-3">
                  <NavLink 
                    to="/home/notifications" 
                    className="nav-link d-flex align-items-center justify-content-between px-0 py-2"
                  >
                    <div className="d-flex align-items-center">
                      <FaBell size={20} className="text-white me-2" />
                      <span className="text-white">Notifications</span>
                    </div>
                    <span className="badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                      {unreadCount}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;