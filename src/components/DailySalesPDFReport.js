import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
 
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
 
// Create PDF report component
const DailySalesPDFReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Daily Sales Report</Text>
        {data.map((sale, index) => (
          <View key={index} style={styles.row}>
            <Text>{sale.product}</Text>
            <Text>{sale.amount}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
 
export default DailySalesPDFReport;