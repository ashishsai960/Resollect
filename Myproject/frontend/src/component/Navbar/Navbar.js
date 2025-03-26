import React from "react";
import "./Navbar.css";
import logo from "../Images/resollect.png"; 

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Centered Title */}
      <div className="navbar-title">IIT Ropar - Student Record Management</div>

      {/* User Profile & Logout Section */}
      <div className="user-actions">
        <div className="user-profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="profile-pic"
          />
          <div className="user-info">
            <span className="user-name">Tushar</span>
            <span className="user-email">tushar@resollect.com</span>
          </div>
        </div>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
