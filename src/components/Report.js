import React, { useState } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";

import React from "react";
import { saveAs } from "file-saver";
import { exportExcel } from "react-html-table-to-excel";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DailySalesPDFReport from "./DailySalesPDFReport"; // Import your PDF report component

const Report = ({ dailySalesData, inventoryStatusData }) => {
  const exportToPDF = () => {
    const pdfReport = <DailySalesPDFReport data={dailySalesData} />;
    return (
      <PDFDownloadLink document={pdfReport} fileName="daily_sales_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    );
  };

  const exportToExcel = () => {
    exportExcel(document.getElementById("inventoryTable"), "inventory_status_report");
  };

  return (
    <div>
      <h2>Daily Sales Report</h2>
      {exportToPDF()}
      <h2>Daily Inventory Status Report</h2>
      <button onClick={exportToExcel}>Download Excel</button>
      <table id="inventoryTable">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Stock</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {inventoryStatusData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
