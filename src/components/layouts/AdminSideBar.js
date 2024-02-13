import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hardcoded array for simulating user data
const hardcodedUser = {
  displayName: "John Doe",
  email: "john.doe@example.com"
};

export default function AdminSideBar(props) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate authentication with a hardcoded user
    setUserName(hardcodedUser.displayName);
  }, []);

  const handleLogout = () => {
    // Simulate logout by clearing user data and navigating to login page
    setUserName("");
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="scrollbar-inner sidebar-wrapper">
        <div className="user">
          <div className="photo">
            <img src={`assets/img/profile4.jpg`} alt="Profile" />
          </div>
          <div className="info">
            <a>
              <span>
                {userName !== "" ? userName : "Username"}
                <span className="user-level">Administrator</span>
              </span>
            </a>
          </div>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/">
              <i className="la la-dashboard"></i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inventory">
              <i className="la la-ambulance"></i>
              <p>Inventory</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories">
              <i className="la la-align-justify"></i>
              <p>Medicine Categories</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/types">
              <i className="la la-sticky-note"></i>
              <p>Medicine Types</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile">
              <i className="la la-user"></i>
              <p>Profile</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleLogout}>
              <i className="la la-power-off"></i>
              <p>Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
