import React, { useState } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";

export default function AdminProfile() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newValues, setNewValues] = useState({
    name: "", // Initialize to empty string
    email: "",
    oldPassword: "",
    password: "",
  });

  const handleUpdateProfile = () => {
    // Your update logic here
    if (newValues.name && newValues.email) {
      // Your validation logic here
      setErrorMsg("");
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => {
        setSuccessMsg("");
      }, 1000);
    } else {
      setErrorMsg("Please fill out all the required fields!");
    }
  };

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Profile</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Edit Profile</div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control input-pill"
                        id="username"
                        value={newValues.name}
                        onChange={(event) =>
                          setNewValues((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter new Username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        className="form-control input-pill"
                        id="email"
                        value={newValues.email}
                        onChange={(event) =>
                          setNewValues((prev) => ({ ...prev, email: event.target.value }))
                        }
                        placeholder="Enter new Email"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        You'll use this email address to login next time!
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Old Password</label>
                      <input
                        type="password"
                        className="form-control input-pill"
                        id="password"
                        onChange={(event) =>
                          setNewValues((prev) => ({ ...prev, oldPassword: event.target.value }))
                        }
                        placeholder="Old Password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">New Password</label>
                      <input
                        type="password"
                        className="form-control input-pill"
                        id="password"
                        onChange={(event) =>
                          setNewValues((prev) => ({ ...prev, password: event.target.value }))
                        }
                        placeholder="Leave Blank to keep same Password"
                      />
                    </div>
                  </div>

                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-success mx-3" onClick={handleUpdateProfile}>
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    </>
  );
}
