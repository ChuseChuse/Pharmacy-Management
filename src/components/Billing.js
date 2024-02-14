import React, { useState } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";

export default function Billing() {
  // Define your local array of medicines
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Medicine 1", power: "5mg", category: "Category 1", type: "Type 1", price: 10, stock: 50 },
    { id: 2, name: "Medicine 2", power: "10mg", category: "Category 2", type: "Type 2", price: 15, stock: 30 },
    // Add more medicine objects as needed
  ]);

  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [billingList, setBillingList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleAddToBillingList = (id) => {
    const selectedMedicine = medicines.find((medicine) => medicine.id === id);
    if (selectedMedicine) {
      setBillingList([...billingList, selectedMedicine]);
    }
  };

  const handleCalculateTotal = () => {
    const total = billingList.reduce((acc, curr) => acc + curr.price, 0);
    setTotalAmount(total);
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
                      Medicine Sale
                    </h4>
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMedicines.map((medicine, index) => (
                            <tr key={medicine.id}>
                              <td>{index + 1}</td>
                              <td>{medicine.name}</td>
                              <td>{medicine.power}</td>
                              <td>{medicine.category}</td>
                              <td>{medicine.type}</td>
                              <td>₹{medicine.price}</td>
                              <td>{medicine.stock}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => handleAddToBillingList(medicine.id)}
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
                      <h5>Total Amount: ₹{totalAmount}</h5>
                      <ul>
                        {billingList.map((medicine) => (
                          <li key={medicine.id}>{medicine.name} - ₹{medicine.price}</li>
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
