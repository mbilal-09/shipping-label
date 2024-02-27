import React, { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Svg,
  Polygon,
  Rect,
  Path,
  ClipPath,
  Defs,
  G,
} from "@react-pdf/renderer";
import bwipjs from "bwip-js";

Font.register({
  family: "Poppins",
  fonts: [
    { src: "/Poppins/Poppins-SemiBold.ttf", fontWeight: 600 },
    { src: "/Poppins/Poppins-Bold.ttf", fontWeight: 700 },
    { src: "/Poppins/Poppins-ExtraBold.ttf", fontWeight: 900 },
  ],
});

const styles = StyleSheet.create({
  semiBoldText: { fontFamily: "Poppins", fontWeight: 600 },
  boldText: { fontWeight: 700, fontFamily: "Poppins" },
  underShipTo: {
    fontWeight: 800,
    fontFamily: "Poppins",
    fontSize: "9px",
    marginTop: -1,
    // marginTop: 1,
    transform: "scaleY(1.2)",
    // paddingBottom: 2,
    textTransform: "uppercase",
  },
  StretchBoldText: {
    // fontWeight: 700,
    // fontFamily: "Poppins",
    // transform: "scaleY(1.3)",
    fontSize: 16,
    // letterSpacing: 0.4,
  },
  extraboldText: { fontWeight: 900, fontFamily: "Poppins" },
  barUpperText: {
    // fontWeight: 700,
    // fontFamily: "Poppins",
    fontSize: 22,
    marginBottom: 4,
    zIndex: 10,
    marginTop: -2,
    marginRight: 10,
    // transform: "scaleY(1.3)",
    // letterSpacing: 0.1,
    textTransform: "uppercase",
  },
  normal: {
    // fontFamily: "Poppins",
    //  fontWeight: 600,
    fontSize: 12,
  },
  normalTwo: { fontSize: 11 },
  second: {
    fontWeight: 300,
    // fontFamily: "Poppins",
    // transform: "scaleY(1.2)",
    fontSize: 36,
    paddingRight: 18,
    marginTop: 2,
  },
  hager: {
    // fontWeight: 700,
    // fontFamily: "Poppins",
    // transform: "scaleY(1.2)",
    fontSize: "10px",
    textTransform: "uppercase",
  },
  logo: {
    // fontWeight: 400,
    // fontFamily: "Poppins",
    // transform: "scaleY(1.1)",
    textAlign: "center",

    fontSize: 74,
    textTransform: "uppercase",
  },
});

const USPS_Ground_Advantage = ({ csvData }) => {
  const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const getCurrentMonthYearFormatted = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");
    return `${month}/${date}/${year}`;
  };
  const getCurrentMonth = () => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${month}/${year}`;
  };

  const generateMaxiCodeImage = (barcodeValueTwo) => {
    const canvas = document.createElement("canvas");
    try {
      bwipjs.toCanvas(canvas, {
        bcid: "maxicode",
        text: barcodeValueTwo,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
      });
      return canvas.toDataURL();
    } catch (e) {
      console.error("Error generating MaxiCode:", e);
      return null;
    }
  };

  const generateBarCodeImage = (barcodeValueThree) => {
    const canvas = document.createElement("canvas");
    try {
      bwipjs.toCanvas(canvas, {
        bcid: "code128",
        text: barcodeValueThree,
        scale: 1,
        height: 10,
        includetext: false,
        textxalign: "center",
      });
      return canvas.toDataURL();
    } catch (e) {
      console.error("Error generating MaxiCode:", e);
      return null;
    }
  };

  const generateBarCodeTwoImage = (barcodeValueFour) => {
    const canvas = document.createElement("canvas");
    try {
      bwipjs.toCanvas(canvas, {
        bcid: "code128",
        text: barcodeValueFour,
        scale: 1,
        height: 10,
        includetext: false,
        textxalign: "center",
      });
      return canvas.toDataURL();
    } catch (e) {
      console.error("Error generating MaxiCode:", e);
      return null;
    }
  };

  const [dailyNumber, setDailyNumber] = useState(1);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastUpdated = localStorage.getItem("lastUpdated");
    if (!lastUpdated || lastUpdated !== today) {
      const num = localStorage.getItem("dailyNumber");
      const updatedNumber = num ? parseInt(num) + 1 : "038";
      setDailyNumber(updatedNumber);
      localStorage.setItem("dailyNumber", updatedNumber);
      localStorage.setItem("lastUpdated", today);
    } else {
      const num = localStorage.getItem("dailyNumber");
      setDailyNumber(parseInt(num));
    }
  }, []);

  return (
    <Document>
      {csvData &&
        csvData?.length >= 0 &&
        csvData?.map((data, index) => {
          const maxiCodeImage = generateMaxiCodeImage(
            `[)> 01 96${
              data && data[14]?.replace("-", "").padEnd(9, "0")
            } 840 003 ${data[23]?.slice(0, 2)}${data[23]?.slice(
              data[23]?.length - 8,
              data[23]?.length
            )} UPSN ${data[23]?.slice(2, 8)} ${
              dailyNumber < 100 ? "0" + dailyNumber : dailyNumber
            } 1/1 ${data[16]} N ${data[12]} ${data[13]}`
          );
          for (let i = 0; i < data?.length; i++) {
            if (!data[i]) {
              data[i] = "";
            }
          }
          const zipCode1 = data[14];
          const zipCode = zipCode1?.replace("-", "");
          const barcodeValue = `420${zipCode?.length === 5 ? zipCode : zipCode?.slice(0, 9)}`;
          const barcodeOne = generateBarCodeImage(barcodeValue);

          const data14Parts = data[14].split("-"); // Splitting data[14] by dash
          const firstPart = data14Parts[0]; // Taking the first part before the dash
          const data23 = data[23]; // Taking data[23] as it is
          const outputString = `420${firstPart}${data23}`;
          const barcodeTwo = generateBarCodeTwoImage(outputString);

          const randomTwoDigitNumber = Math.floor(Math.random() * 90) + 10;

          let inputValue = data[23];
          let formattedValue = [
            inputValue.slice(0, 4), // Take the first four digits
            inputValue.slice(4, 8), // Take the next four digits
            inputValue.slice(8, 12), // Take the next four digits
            inputValue.slice(12, 16), // Take the next four digits
            inputValue.slice(16, 20), // Take the next four digits
            inputValue.slice(20), // Take the remaining digits
          ].join(" ");

          let zipArea = data[14];
          const match = zipArea?.match(/^(\d{4})-(\d{4})$/);
          if (match) {
            const firstPart = match[1];
            if (firstPart?.length === 4) {
              zipArea = `0${firstPart}-${match[2]}`;
            }
          }

          return (
            <Page size="A6" key={index} id={`content-id-${index}`}>
              <View>
                <View>
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#000",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: -1.3,
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 1.2,
                          borderColor: "black",
                          borderBottomWidth: 0,
                          borderLeftWidth: 1.5,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "26%",
                          height: "95%",
                          textAlign: "center",
                          //   height: "50%",
                        }}
                      >
                        <Text style={styles.logo}>G</Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1.2,
                          borderColor: "black",
                          borderRightWidth: 1.5,
                          padding: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "28%",
                          textAlign: "center",
                          paddingBottom: 6,
                          paddingTop: 2,
                          //   height: "20%",
                        }}
                      >
                        <Text style={{ fontSize: 7 }}>USPS GROUND</Text>
                        <Text style={{ fontSize: 7 }}>ADVANTAGE</Text>
                        <Text style={{ fontSize: 7 }}>U.S. POSTAGE PAID</Text>
                        <Text style={{ fontSize: 7 }}>ATFM</Text>
                        <Text style={{ fontSize: 7 }}>e-Postage</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: -2.2,
                        width: "100%",
                        height: 1.2,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingVertical: 4,
                        paddingBottom: 7,
                        textAlign: "center",
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>
                        USPS GROUND ADVANTAGE
                      </Text>
                      <Text
                        style={{
                          fontSize: 8,
                          marginLeft: 3,
                          marginTop: 2,
                          color: "black",
                        }}
                      >
                        TM
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 1.2,
                        backgroundColor: "#000",
                      }}
                    ></View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        padding: 2,
                        paddingHorizontal: 6,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          fontSize: "7px",
                          textTransform: "uppercase",
                          //   width: "50%",
                        }}
                      >
                        <Text>{data[0]}</Text>
                        <Text>{data[2]}</Text>
                        <Text>{`${data[4]} ${data[5]} ${data[6]}`}</Text>
                      </View>
                      <View
                        style={{
                          fontSize: "7px",
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          marginTop: 3,
                        }}
                      >
                        <Text>{getCurrentMonthYearFormatted()}</Text>
                        <Text>Mailed From {data[6]}</Text>
                        <Text>WT: 32.00 oz</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        width: "100%",
                        textTransform: "uppercase",
                        gap: 8,
                        paddingHorizontal: 6,
                        marginTop: 40,
                      }}
                    >
                      <View style={{ width: "10%" }}>
                        <Text style={{ fontSize: "8px" }}>SHIP</Text>
                        <Text style={{ fontSize: "8px" }}>TO:</Text>
                      </View>
                      <View style={{ fontSize: "8.5px", color: "black" }}>
                        <Text>{data[8]}</Text>
                        <Text>{data[9]}</Text>
                        <Text>{data[10]}</Text>
                        <Text
                          style={styles.hager}
                        >{`${data[12]} ${data[13]} ${zipArea}`}</Text>

                        {/* {data[11] && <Text>{data[11]}</Text>} */}
                      </View>
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        bottom: 4,
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: 4,
                          backgroundColor: "#000",
                        }}
                      ></View>
                      <View style={{ paddingVertical: 4, paddingTop: 6 }}>
                        <Text style={{ fontSize: 14, textAlign: "center" }}>
                          USPS TRACKING # EP
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            height: 66,
                            width: 250,
                            marginHorizontal: "auto",
                            paddingVertical: 8,
                          }}
                        >
                          {barcodeTwo && <Image src={barcodeTwo} />}
                        </View>
                        <Text
                          style={{
                            fontSize: "8px",
                            paddingTop: 3,
                            fontWeight: 100,
                            textAlign: "center",
                          }}
                        >
                          {formattedValue}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          height: 4,
                          backgroundColor: "#000",
                        }}
                      ></View>
                      {data[20] && (
                        <Text
                          style={{
                            fontSize: "8px",
                            marginTop: 6,
                            marginBottom: 4,
                            paddingLeft: 1,
                            //   textAlign: "center",
                          }}
                        >
                          DESC: {data[20]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          );
        })}
    </Document>
  );
};

export default USPS_Ground_Advantage;
