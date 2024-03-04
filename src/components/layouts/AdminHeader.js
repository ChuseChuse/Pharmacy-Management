import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Hardcoded array for simulating user data
const hardcodedUser = {
  displayName: "John Doe",
  email: "john.doe@example.com"
};

export default function AdminHeader(props) {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Example number of unread notifications
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate authentication with a hardcoded user
    setUserName(hardcodedUser.displayName);
    setEmailAddress(hardcodedUser.email);
  }, []);

  const handleLogout = () => {
    // Simulate logout by clearing user data and navigating to login page
    setUserName("");
    setEmailAddress("");
    navigate("/login", { replace: true });
  };

  return (
    <div className="main-header">
      <div className="logo-header">
        <Link to="/" className="logo">
          MediCare
        </Link>
        <button
          className="navbar-toggler sidenav-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="collapse"
          aria-controls="sidebar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button className="topbar-toggler more">
          <i className="la la-ellipsis-v"></i>
        </button>
      </div>
      <nav className="navbar navbar-header navbar-expand-lg">
        <div className="container-fluid">
          <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">
                <span className="position-relative" style={{ fontSize: "10px" }}>
                  <i className="la la-bell"></i>
                  {unreadNotifications > 0 && <sup className="badge badge-danger position-absolute" style={{ left: "16px", top: "-8px", padding: "2px 4px" }}>{unreadNotifications}</sup>}
                </span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                onClick={() => setShowDropDown(!showDropDown)}
                className="dropdown-toggle profile-pic"
              >
                {" "}
                <img
                  src={`assets/img/profile4.jpg`}
                  alt="user-img"
                  width="36"
                  className="img-circle"
                />
                <span>{userName !== "" ? userName : "Username"}</span>{" "}
              </a>
              <ul className={`dropdown-menu dropdown-user ${showDropDown ? "show" : ""}`}>
                <li>
                  <div className="user-box">
                    <div className="u-img">
                      <img src={`assets/img/profile4.jpg`} alt="user" />
                    </div>
                    <div className="u-text">
                      <h4>{userName !== "" ? userName : "Username"}</h4>
                      <p className="text-muted">{emailAddress !== "" ? emailAddress : "Email"}</p>
                    </div>
                  </div>
                </li>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/profile">
                  <i className="fa fa-power-off"></i> Profile
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" type="button" onClick={handleLogout}>
                  <i className="fa fa-power-off"></i> Logout
                </Link>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
