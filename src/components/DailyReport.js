import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";

export default function DailyReport() {
  const [transactions, setTransactions] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/daily-reports");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setErrorMessage("Failed to fetch transactions. Please try again later.");
      }
    };

    const fetchDrugs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/drugs");
        setDrugs(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
        setErrorMessage("Failed to fetch drugs. Please try again later.");
      }
    };

    fetchTransactions();
    fetchDrugs();
  }, []);

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
      <div className="container">
        <h1>Daily Report</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button className="btn btn-primary mb-3" onClick={exportData}>Export CSV</button>
        <table className="table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Drug ID</th>
              <th>Drug Name</th>
              <th>Transaction Type</th>
              <th>Quantity In</th>
              <th>Quantity Out</th>
              <th>Transaction Date</th>
              <th>Cost Of Production</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.TransactionID}>
                <td>{transaction.TransactionID}</td>
                <td>{transaction.DrugID}</td>
                <td>{drugs.find(drug => drug.DrugID === transaction.DrugID)?.DrugName || 'Unknown'}</td>
                <td>{transaction.TransactionType}</td>
                <td>{transaction.QuantityIn}</td>
                <td>{transaction.QuantityOut}</td>
                <td>{new Date(transaction.TransactionDate).toLocaleString()}</td>
                <td>{transaction.CostOfProduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </div>
  );
}
