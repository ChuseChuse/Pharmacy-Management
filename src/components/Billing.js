import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Billing() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [billingList, setBillingList] = useState([]);
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
        setErrorMessage(
          "Failed to fetch medicines. Please try again later."
        );
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = () => {
    const filtered = medicines.filter(
      (medicine) =>
        medicine.DrugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.DrugID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.Manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMedicines(filtered);
  };

  const handleAddToBillingList = (id) => {
    const selectedMedicine = medicines.find(
      (medicine) => medicine.DrugID === id
    );
    if (selectedMedicine) {
      const updatedMedicine = {
        ...selectedMedicine,
        quantity: quantities[id] || 1,
      };
      setBillingList([...billingList, updatedMedicine]);
    }
  };

  const handleCalculateTotal = () => {
    const total = billingList.reduce(
      (acc, curr) =>
        acc + parseFloat(curr.SellingPrice) * curr.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const handleBilling = async () => {
    try {
      for (const medicine of billingList) {
        const inventoryResponse = await axios.get(`${baseURL}/inventory?DrugID=${medicine.DrugID}`);
        const currentStockLevel = inventoryResponse.data[0].StockLevel;
  
        if (quantities[medicine.DrugID] > currentStockLevel) {
          throw new Error(`Insufficient stock for ${medicine.DrugName}. Current stock: ${currentStockLevel}`);
        }
  
        const updatedStockLevel = currentStockLevel - quantities[medicine.DrugID];
  
        await axios.put(`${baseURL}/inventory/${medicine.DrugID}`, {
          StockLevel: updatedStockLevel,
          ReorderPoint: medicine.ReorderPoint
        });

        const transactionData = {
          DrugID: medicine.DrugID,
          TransactionType: "Sales",
          QuantityIn: 0,
          QuantityOut: quantities[medicine.DrugID],
          CostOfProduction: parseFloat((medicine.SellingPrice)*quantities[medicine.DrugID]) -parseFloat((medicine.UnitPrice)*(quantities[medicine.DrugID]))
        };

        await axios.post(`${baseURL}/transactions`, transactionData);
      }

      // Open billing summary in a popup window
      handlePrintBill();
      
      setBillingList([]);
      setQuantities({});
      setTotalAmount(0);
      setErrorMessage("");
    } catch (error) {
      console.error("Error billing:", error);
      setErrorMessage(error.message);
    }
  };

  const handlePrintBill = () => {
    const ownerInfo = {
      name: "Your Pharmacy Name",
      address: "123 Main Street, City, Country",
      mobile: "+1234567890",
      email: "example@example.com",
    };

    const billContent = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            /* Add your custom styles for the bill here */
            .container {
              width: 100%;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
            }
            .info {
              margin-bottom: 20px;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .items th, .items td {
              border: 1px solid #ccc;
              padding: 10px;
            }
            .total {
              margin-top: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="info">
              <h2>${ownerInfo.name}</h2>
              <p>Address: ${ownerInfo.address}</p>
              <p>Mobile: ${ownerInfo.mobile}</p>
              <p>Email: ${ownerInfo.email}</p>
            </div>
            <hr />
            <h3>Billing Summary</h3>
            <table class="items">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${billingList.map((medicine) => `
                  <tr>
                    <td>${medicine.DrugName}</td>
                    <td>${medicine.quantity}</td>
                    <td>${(parseFloat(medicine.SellingPrice) * parseFloat(medicine.quantity)).toFixed(2)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
            <p class="total">Total Amount: TZS${parseFloat(totalAmount).toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;

    const billWindow = window.open("", "_blank", "resizable=yes,width=600,height=400");
    billWindow.document.write(billContent);
    billWindow.document.close();

    billWindow.document.body.innerHTML += `
      <div>
        <button onclick="window.print()">Print Bill</button>
        <button onclick="window.close()">Cancel</button>
      </div>
    `;
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
                    {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="search medicine "
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
                                  value={quantities[medicine.DrugID] || ""}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      medicine.DrugID,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  onKeyUp={(e) =>
                                    handleQuantityChange(
                                      medicine.DrugID,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() =>
                                    handleAddToBillingList(medicine.DrugID)
                                  }
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
                      <button
                        type="button"
                        className="btn btn-success ml-3"
                        onClick={handleBilling}
                      >
                        Bill
                      </button>
                    </div>
                    <div className="mt-3">
                      <h5>Total Amount: TZS{parseFloat(totalAmount).toFixed(2)}</h5>
                      <ul>
                        {billingList.map((medicine, index) => (
                          <li key={index}>
                            {medicine.DrugName} - TZS
                            {(
                              parseFloat(medicine.SellingPrice) *
                              parseFloat(medicine.quantity)
                            ).toFixed(2)}
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
