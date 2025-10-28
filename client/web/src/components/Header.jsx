import { NavLink, Link } from "react-router-dom";
import { FaUserCircle, FaBell, FaWallet } from "react-icons/fa"; // icons
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const notificationsData = user?.notifications || [];
  const unreadCount = notificationsData.filter(n => !n.isRead).length;

  return (
    <header className="position-relative z-3 shadow-sm">
      <div className="header-nav-menu navbar-sticky-in text-white" id="header-nav-menu">
        <div className="container">
          <nav className="navbar navbar-expand-xl py-1">
            <div className="d-flex w-100 align-items-center justify-content-between">
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
                    to="/home/location"
                    className={({ isActive }) =>
                      `nav-link text-uppercase fw-medium ${isActive ? "text-success fw-bold" : ""}`
                    }
                  >
                    Near Station
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
                    to="/home/wallet" className="wallet-link d-flex align-items-center py-1 px-2"
                  >
                    <FaWallet size={22} className="me-2 text-white" />
                    <span className="fw-bold">₹{user.wallet.balance}</span>
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;