// Import necessary dependencies
import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";
import axios from 'axios';

// Define the component
export default function Inventory() {
  var counter = 1;
  const [medicines, setMedicines] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  // Function to fetch medicines from the API
  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/inventory');
      setMedicines(response.data);
    }
     catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle delete button click
  const handleDeleteButton = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/inventory/${id}`);
      if (response.status === 204) {
        // Update local state after successful deletion
        setMedicines(medicines.filter((medicine) => medicine.InventoryID !== id));
      } else {
        console.error("Failed to delete medicine");
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  // Render the component
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
                            <th>Inventory ID</th>
                            <th>Drug ID</th>
                            <th>Drug Name</th>
                            <th>Stock Level</th>
                            <th>Reorder Point</th>
                            <th>Last Updated</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicines.map((medicine) => {
                            return (
                              <tr key={medicine.InventoryID}>
                                <td>{medicine.InventoryID}</td>
                                <td>{medicine.DrugID}</td>
                                <td>{medicine.DrugName}</td>
                                <td>{medicine.StockLevel}</td>
                                <td>{medicine.ReorderPoint}</td>
                                <td>{medicine.LastUpdated}</td>
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
                                        handleDeleteButton(medicine.InventoryID);
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
