import React, { useState } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";

export default function MedicineTypes() {
  var counter = 1;
  
  // Define your local array of medicine types
  const [medTypes, setMedTypes] = useState([
    { id: 1, name: "Type 1" },
    { id: 2, name: "Type 2" },
    { id: 3, name: "Type 3" },
    // Add more type objects as needed
  ]);

  const handleDeleteButton = (id) => {
    // Filter out the type with the provided id
    const updatedMedTypes = medTypes.filter((medType) => medType.id !== id);
    setMedTypes(updatedMedTypes);
  };

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Medicine Types</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">
                      Types List{" "}
                      <Link to="/addtype" className="btn btn-primary btn-sm float-right">
                        Add new Type
                      </Link>{" "}
                    </h4>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Type Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medTypes.map((medType) => {
                            return (
                              <tr key={medType.id}>
                                <td>{counter++}</td>
                                <td>{medType.name}</td>
                                <td className="td-actions">
                                  <div className="form-button-action">
                                    <Link to="/updatetype">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-success"
                                        onClick={() => {
                                          localStorage.setItem(
                                            "medtype_obj",
                                            JSON.stringify(medType)
                                          );
                                        }}>
                                        <i className="la la-edit"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDeleteButton(medType.id);
                                      }}
                                      className="btn btn-link btn-danger">
                                      <i className="la la-times"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
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
