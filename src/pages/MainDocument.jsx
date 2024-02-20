import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import Ups_Second_Day from "./Ups_Second_Day";
import Ups_Second_Day_2 from "./Ups_Second_Day_2";
import Ups_Next_Day_Air from "./Ups_Next_Day_Air";
import Ups_Next_Day_Air_2 from "./Ups_Next_Day_Air_2";
import Ups_Ground from "./Ups_Ground";
import Ups_Ground_2 from "./Ups_Ground_2";
import Ups_Ground_3 from "./Ups_Ground_3";

const getSelectedDocument = (selectedOption, csvData) => {
  switch (selectedOption) {
    case "UPS 2ND DAY AIR":
      return <Ups_Second_Day csvData={csvData} />;
    case "UPS 2ND DAY AIR 2":
      return <Ups_Second_Day_2 csvData={csvData} />;
    case "UPS NEXT DAY AIR 2":
      return <Ups_Next_Day_Air_2 csvData={csvData} />;
    case "UPS NEXT DAY AIR":
      return <Ups_Next_Day_Air csvData={csvData} />;
    case "UPS Ground":
      return <Ups_Ground csvData={csvData} />;
    case "UPS Ground 2":
      return <Ups_Ground_2 csvData={csvData} />;
    case "UPS Ground 3":
      return <Ups_Ground_3 csvData={csvData} />;
    default:
      return <Ups_Second_Day csvData={csvData} />;
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
