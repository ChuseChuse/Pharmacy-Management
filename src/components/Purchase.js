import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;
export default function Purchase() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [purchaseList, setPurchaseList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`${baseURL}/drugs`);
        setMedicines(response.data);
        setFilteredMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setErrorMessage("Failed to fetch medicines. Please try again later.");
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = () => {
    const filtered = medicines.filter((medicine) =>
      medicine.DrugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.DrugID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.Manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleAddToPurchaseList = (id) => {
    const selectedMedicine = medicines.find((medicine) => medicine.DrugID === id);
    if (selectedMedicine) {
      const updatedMedicine = { ...selectedMedicine, quantity: quantities[id] || 1 };
      setPurchaseList([...purchaseList, updatedMedicine]);
    }
  };

  const handleCalculateTotal = () => {
    const total = purchaseList.reduce((acc, curr) => acc + parseFloat(curr.SellingPrice) * curr.quantity, 0 );
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const handlePurchase = async () => {
    try {
      for (const medicine of purchaseList) {
        // Fetch current stock level for the medicine
        const inventoryResponse = await axios.get(`${baseURL}/inventory?DrugID=${medicine.DrugID}`);
        const currentStockLevel = inventoryResponse.data[0].StockLevel;
  
        // Add purchased quantities to the current stock level
        const updatedStockLevel = currentStockLevel + quantities[medicine.DrugID];
  
        // Update stock level in the inventory
        await axios.put(`${baseURL}/inventory/${medicine.DrugID}`, {
          StockLevel: updatedStockLevel,
          ReorderPoint: medicine.ReorderPoint
        });
      }
  
      // Clear purchase list and quantities after successful purchase
      setPurchaseList([]);
      setQuantities({});
      setErrorMessage("");
    } catch (error) {
      console.error("Error purchasing:", error);
      setErrorMessage(error.message);
    }
  };
  
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Purchase</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">Medicine Purchase</h4>
                  </div>
                  <div className="card-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
                            <th>Medicine Name</th>
                            <th>Dosage</th>
                            <th>Manufacturer</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMedicines.map((medicine, index) => (
                            <tr key={medicine.DrugID}>
                              <td>{medicine.DrugName}</td>
                              <td>{medicine.Dosage}</td>
                              <td>{medicine.Manufacturer}</td>
                              <td>TZS{medicine.SellingPrice}</td>
                              
                              <td>
                                <input
                                  type="number"
                                  min="1"
                                  value={quantities[medicine.DrugID] || ''}
                                  onChange={(e) => handleQuantityChange(medicine.DrugID, parseInt(e.target.value))}
                                  onKeyUp={(e) => handleQuantityChange(medicine.DrugID, parseInt(e.target.value))}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => handleAddToPurchaseList(medicine.DrugID)}
                                >
                                  Add to Purchase
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
                      <button
                        type="button"
                        className="btn btn-success ml-3"
                        onClick={handlePurchase}
                      >
                        Purchase
                      </button>
                    </div>
                    <div className="mt-3">
                      <h5>Total Amount: TZS{totalAmount}</h5>
                      <ul>
                        {purchaseList.map((medicine, index) => (
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
