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
              <i className="la la-dashboard" style={{ color: 'black' }}></i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inventory">
              <i className="la la-ambulance" style={{ color: 'blue' }}></i>
              <p>Inventory</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/billing">
              <i className="la la-credit-card" style={{ color: 'green' }}></i>
              <p>Billing</p>
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/purchase">
              <i className="la la-shopping-cart" style={{ color: 'darkblue' }}></i>
              <p>Purchases</p>
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/report">
              <i className="la la-list-alt" style={{ color: 'brown' }}></i>
              <p>Report</p>
            </Link>
            </li>
          <li className="nav-item">
            <Link to="/categories">
              <i className="la la-check-circle" style={{ color: 'orange' }}></i>
              <p>Transactions</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/types">
        
              <i className="la la-medkit" style={{ color: 'red' }}></i>
              <p>Drugdetails</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile">
              <i className="la la-user" style={{ color: 'lightblue' }}></i>
              <p>Profile</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={handleLogout}>
              <i className="la la-power-off" style={{ color: 'black' }}></i>
              <p>Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
