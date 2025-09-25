import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [activeItem, setActiveItem] = useState("location");
  const navigate = useNavigate();

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fa-tachometer", path: "dashboard" },
    { key: "location", label: "Location", icon: "fa-map-marker", path: "location" },
    { key: "vehicle", label: "Vehicle", icon: "fa-car", path: "vehicle" },
    { key: "wallet", label: "Wallet", icon: "fa-credit-card", path: "wallet" },
    { key: "history", label: "History", icon: "fa-history", path: "history" },
  ];

  const handleClick = (item) => {
    setActiveItem(item.key);
    navigate(item.path);
  };

  return (
    <nav className="navbar navbar-expand bg-light border-bottom shadow-sm px-3">
      {/* Left Menu */}
      <ul className="navbar-nav me-auto d-flex flex-row gap-2">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.key}>
            <button
              className={`btn d-flex align-items-center gap-1 ${
                activeItem === item.key
                  ? "text-primary fw-bold"
                  : "text-secondary"
              }`}
              onClick={() => handleClick(item)}
              style={{ background: "transparent", border: "none" }}
            >
              <i className={`fa ${item.icon}`}></i>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-4">
        <img
          src="/Unicharge_logo_text.png"
          alt="Logo"
          className="img-fluid"
          style={{ width: "120px" }}
        />
        <button className="btn position-relative">
          <i className="fa fa-bell fa-lg text-secondary"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        <div className="d-flex align-items-center gap-2">
          <i className="fa fa-wallet fa-lg text-secondary"></i>
          <span className="fw-semibold text-dark">₹500.00</span>
        </div>
      </div>
    </nav>
  );
}