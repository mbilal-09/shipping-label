import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer, PDFDownloadLink, View, Text } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import SecondDocument from "./SecondDocument";
import ThirdDocument from "./ThirdDocument";

const MainDocument = ({ csvData, selectedOption }) => (
  <div>
    {selectedOption === "UPS 2ND DAY AIR" ? (
      <PDFViewer style={{ width: "100%", height: 1200, margin: "auto" }}>
        <MyDocument csvData={csvData} />
      </PDFViewer>
    ) : selectedOption === "UPS NEXT DAY AIR" ? (
      <PDFViewer style={{ width: "100%", height: 1200, margin: "auto" }}>
        <ThirdDocument csvData={csvData} />
      </PDFViewer>
    ) : (
      <PDFViewer style={{ width: "100%", height: 1200, margin: "auto" }}>
        <SecondDocument csvData={csvData} />
      </PDFViewer>
    )}
    <PDFDownloadLink
      document={
        selectedOption === "UPS 2ND DAY AIR" ? (
          <MyDocument csvData={csvData} />
        ) : selectedOption === "UPS NEXT DAY AIR" ? (
          <ThirdDocument csvData={csvData} />
        ) : (
          <SecondDocument csvData={csvData} />
        )
      }
      fileName="your-document.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  </div>
);

export default MainDocument;
