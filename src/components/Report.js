// import React from "react";
// import ExcelExport from "react-html-table-to-excel"; // Correct import
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import DailySalesPDFReport from "./DailySalesPDFReport";

// const Report = ({ dailySalesData, inventoryStatusData }) => {
//   const exportToPDF = () => {
//     const pdfReport = <DailySalesPDFReport data={dailySalesData} />;
//     return (
//       <PDFDownloadLink document={pdfReport} fileName="daily_sales_report.pdf">
//         {({ blob, url, loading, error }) =>
//           loading ? "Generating PDF..." : "Download PDF"
//         }
//       </PDFDownloadLink>
//     );
//   };

//   const exportToExcel = () => {
//     ExcelExport(document.getElementById("inventoryTable"), "inventory_status_report"); // Correct usage
//   };

//   return (
//     <div>
//       <h2>Daily Sales Report</h2>
//       {exportToPDF()}
//       <h2>Daily Inventory Status Report</h2>
//       <button onClick={exportToExcel}>Download Excel</button>
//       <table id="inventoryTable">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Stock</th>
//             <th>Expiry Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventoryStatusData.map((item) => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.stock}</td>
//               <td>{item.expiryDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Report;
