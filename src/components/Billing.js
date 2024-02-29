import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Billing() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [billingList, setBillingList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({}); // Object to store quantities for each medicine

  useEffect(() => {
    // Fetch medicines from the API using Axios
    axios.get("http://localhost:8000/api/drugs")
      .then((response) => {
        setMedicines(response.data);
        setFilteredMedicines(response.data); // Set filteredMedicines initially to all medicines
      })
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.DrugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.DrugID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.Manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleAddToBillingList = (id) => {
    const selectedMedicine = medicines.find((medicine) => medicine.DrugID === id);
    if (selectedMedicine) {
      const updatedMedicine = { ...selectedMedicine, quantity: quantities[id] || 1 };
      setBillingList([...billingList, updatedMedicine]);
    }
  };

  const handleCalculateTotal = () => {
    const total = billingList.reduce((acc, curr) => acc + parseFloat(curr.SellingPrice) * curr.quantity, 0 )
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
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
                    <h4 className="card-title">Medicine Sale</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Medicine Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Medicine Name</th>
                            <th>Power</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Quantity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMedicines.map((medicine, index) => (
                            <tr key={medicine.DrugID}>
                              <td>{index + 1}</td>
                              <td>{medicine.DrugName}</td>
                              <td>{medicine.Dosage}</td>
                              <td>{medicine.category}</td>
                              <td>{medicine.Manufacturer}</td>
                              <td>TZS{medicine.SellingPrice}</td>
                              <td>{medicine.stock}</td>
                              <td>
                                <input
                                  type="number"
                                  min="1"
                                  value={quantities[medicine.DrugID] || 1}
                                  onChange={(e) => handleQuantityChange(medicine.DrugID, parseInt(e.target.value))}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => handleAddToBillingList(medicine.DrugID)}
                                >
                                  Add to Billing
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCalculateTotal}
                      >
                        Calculate Total
                      </button>
                    </div>
                    <div className="mt-3">
                      <h5>Total Amount: TZS{totalAmount}</h5>
                      <ul>
                        {billingList.map((medicine, index) => (
                          <li key={index}>
                            {medicine.DrugName} - TZS{medicine.SellingPrice} - Quantity: {medicine.quantity}
                          </li>
                        ))}
                      </ul>
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
