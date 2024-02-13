import React, { useState } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";

export default function Inventory() {
  var counter = 1;
  
  // Define your local array of medicines
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Medicine 1", power: "5mg", category: "Category 1", type: "Type 1", price: 10, stock: 50 },
    { id: 2, name: "Medicine 2", power: "10mg", category: "Category 2", type: "Type 2", price: 15, stock: 30 },
    // Add more medicine objects as needed
  ]);

  const handleDeleteButton = (id) => {
    // Filter out the medicine with the provided id
    const updatedMedicines = medicines.filter((medicine) => medicine.id !== id);
    setMedicines(updatedMedicines);
  };

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Medicine Inventory</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">
                      Inventory List{" "}
                      <Link to="/addmedicine" className="btn btn-primary btn-sm float-right">
                        Add new Medicine
                      </Link>{" "}
                    </h4>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>
                              Medicine Name<sup>Power</sup>
                            </th>
                            <th>Medicine Category</th>
                            <th>Medicine Type</th>
                            <th>Medicine Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicines.map((medicine) => {
                            return (
                              <tr key={medicine.id}>
                                <td>{counter++}</td>
                                <td>
                                  {medicine.name} <sup>{medicine.power}</sup>
                                </td>
                                <td>{medicine.category}</td>
                                <td>{medicine.type}</td>
                                <td>₹{medicine.price}</td>
                                <td>{medicine.stock}</td>
                                <td className="td-actions">
                                  <div className="form-button-action">
                                    <Link to="/updatemedicine">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-success"
                                        onClick={() => {
                                          localStorage.setItem(
                                            "medicine_obj",
                                            JSON.stringify(medicine)
                                          );
                                        }}>
                                        <i className="la la-edit"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDeleteButton(medicine.id);
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
