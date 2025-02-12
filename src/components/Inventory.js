// Import necessary dependencies
import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

// Define the component
export default function Inventory() {
  // var counter = 1;
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchMedicines();
  }, []);
  

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = medicines.filter(
      (medicine) =>
        medicine.DrugName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        medicine.DrugID.toString().toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  // Function to fetch medicines from the API
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${baseURL}/inventory`);
      setMedicines(response.data);
      setFilteredMedicines(response.data)
    }
     catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "Failed to fetch medicines. Please try again later."
      );
    }
  };

  // Function to handle delete button click
  const handleDeleteButton = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/inventory/${id}`);
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
  return  (
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
                  {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}
                  <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search medicine"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                      />
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleSearchInputChange}
                      >
                        Search
                      </button>
                    </div>
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
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMedicines.map((medicine,index) => {
                            return (
                              <tr key={medicine.InventoryID}>
                                <td>{medicine.InventoryID}</td>
                                <td>{medicine.DrugID}</td>
                                <td>{medicine.DrugName}</td>
                                <td>{medicine.StockLevel}</td>
                                <td>{medicine.ReorderPoint}</td>
                                <td>{medicine.LastUpdated}</td>
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
