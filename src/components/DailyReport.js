import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
const baseURL = process.env.REACT_APP_API_BASE_URL;
export default function DailyReport() {
  const [transactions, setTransactions] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [drugNameFilter, setDrugNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const params = {};
        if (drugNameFilter) params.drugName = drugNameFilter;
        if (startDateFilter) params.startDate = startDateFilter;
        if (endDateFilter) params.endDate = endDateFilter;

        console.log("Filter Params:", params); // Debug: Log filter parameters

        const response = await axios.get(`${baseURL}/daily-reports`, { params });

        console.log("Fetched Transactions:", response.data); // Debug: Log fetched transactions

        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setErrorMessage("Failed to fetch transactions. Please try again later.");
      }
    };

    const fetchDrugs = async () => {
      try {
        const response = await axios.get(`${baseURL}/drugs`);
        setDrugs(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
        setErrorMessage("Failed to fetch drugs. Please try again later.");
      }
    };

    fetchTransactions();
    fetchDrugs();
  }, [drugNameFilter, startDateFilter, endDateFilter]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "drugName") {
      // Trim leading and trailing whitespace from the drug name
      setDrugNameFilter(value.trim());
    } else if (name === "startDate") {
      setStartDateFilter(value);
    } else if (name === "endDate") {
      setEndDateFilter(value);
    }
  };
  
  const exportData = () => {
    // Convert transactions to CSV format
    const csvContent = "data:text/csv;charset=utf-8," + transactions.map(row => {
      const drug = drugs.find(drug => drug.DrugID === row.DrugID);
      const drugName = drug ? drug.DrugName : 'Unknown';
      return [...Object.values(row), drugName].join(",");
    }).join("\n");
    // Create a link element and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };

  return (
    <div>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Report</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">Daily Report</h4>
                  </div>
      <div className="container">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="mb-3">
          <input
            type="text"
            name="drugName"
            placeholder="Filter by drug name"
            value={drugNameFilter}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start date"
            value={startDateFilter}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="endDate"
            placeholder="End date"
            value={endDateFilter}
            onChange={handleFilterChange}
          />
        </div>
        <button className="btn btn-primary mb-3" onClick={exportData}>Export CSV</button>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Transaction ID</th> */}
              {/* <th>Drug ID</th> */}
              <th>Drug Name</th>
              <th>Transaction Type</th>
              {/* <th>Quantity In</th> */}
              <th>Quantity</th>
              <th>Price@1</th>
              <th>Amount</th>
              <th>Discount%</th>
              <th>Transaction Date</th>
              {/* <th>Profit</th> */}
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.TransactionID}>
                {/* <td>{transaction.TransactionID}</td> */}
                {/* <td>{transaction.DrugID}</td> */}
                <td>{drugs.find(drug => drug.DrugID === transaction.DrugID)?.DrugName || 'Unknown'}</td>
                <td>{transaction.TransactionType}</td>
                {/* <td>{transaction.QuantityIn}</td> */}
                <td>{(transaction.TransactionType === "Sale" ? transaction.QuantityOut : transaction.QuantityIn)}</td>

                <td>{drugs.find(drug => drug.DrugID === transaction.DrugID)?.SellingPrice || 'Unknown'}</td>
                <td>{transaction.CostOfProduction}</td>
                <td>0</td>
                <td>{new Date(transaction.TransactionDate).toLocaleString()}</td>
                
              </tr>
            ))}
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
  );
}
