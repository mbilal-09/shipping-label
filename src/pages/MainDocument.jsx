import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import SecondDocument from "./SecondDocument";
import ThirdDocument from "./ThirdDocument";

const getSelectedDocument = (selectedOption, csvData) => {
  switch (selectedOption) {
    case "UPS 2ND DAY AIR":
      return <MyDocument csvData={csvData} />;
    case "UPS NEXT DAY AIR":
      return <ThirdDocument csvData={csvData} />;
    default:
      return <SecondDocument csvData={csvData} />;
  }
};

const MainDocument = ({ csvData, cvsFileName, selectedOption }) => (
  <div>
    <div className="w-full sm:w-[16%] lg:ml-[10.8%] md:ml-[7%] sm:ml-0 ml-0 px-4 sm:px-0 mb-4">
      <PDFDownloadLink
        className="bg-blue-600 hover:bg-blue-700 mx-auto text-white transition-all rounded-lg sm:w-[100%] w-full flex  justify-center py-2 mb-4 "
        document={getSelectedDocument(selectedOption, csvData)}
        fileName={`${cvsFileName}.pdf`}
      >
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
    <PDFViewer style={{ width: "100%", height: 1200, margin: "auto" }}>
      {getSelectedDocument(selectedOption, csvData)}
    </PDFViewer>
  </div>
);

export default MainDocument;
