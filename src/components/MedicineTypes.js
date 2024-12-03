// Import necessary dependencies
import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";
import axios from 'axios';


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
      const response = await axios.get("http://localhost:8000/api/drugs");
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
      const response = await axios.delete(`http://localhost:8000/api/drugs/${id}`);
      if (response.status === 204) {
        // Update local state after successful deletion
        setMedicines(medicines.filter((medicine) => medicine.DrugID !== id));
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
            <h4 className="page-title">Medicine Products</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">
                      Products List{" "}
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
                          {/* <th>Drug ID</th> */}
                            <th>Drug Name</th>
                            <th>Manufacturer</th>
                            {/* <th>Dosage</th> */}
                            <th>UnitPrice</th>
                            <th>SellingPrice</th>
                            <th>ExpireDate</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMedicines.map((medicine) => {
                            return (
                              <tr key={medicine.DrugID}>
                               
                                {/* <td>{medicine.DrugID}</td> */}
                                <td>{medicine.DrugName}</td>
                                <td>{medicine.Manufacturer}</td>
                                {/* <td>{medicine.Dosage}</td> */}
                                <td>{medicine.UnitPrice}</td>
                                <td>{medicine.SellingPrice}</td>
                                <td>{medicine.ExpiryDate}</td>
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
                                        handleDeleteButton(medicine.DrugID);
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
