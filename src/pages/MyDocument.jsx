import React, { useEffect } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Canvas,
  Font,
} from "@react-pdf/renderer";
import { randomAlphanumeric } from "random-string-alphanumeric-generator";
import bwipjs from "bwip-js";

// import { Barcode } from "@react-pdf/barcode";
import Barcode from "react-barcode";
// import Barcode from "react-jsbarcode";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "../../public/Poppins/Poppins-SemiBold.ttf",
      fontWeight: 600,
    },
    {
      src: "../../public/Poppins/Poppins-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "../../public/Poppins/Poppins-ExtraBold.ttf",
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  semiBoldText: {
    fontFamily: "Poppins",
    fontWeight: 600,
  },
  boldText: {
    fontWeight: 700,
    fontFamily: "Poppins",
  },
  underShipTo: {
    fontWeight: 800,
    fontFamily: "Poppins",
    marginBottom: 2,
    fontSize: "9.6px",
    marginTop: 6,
    transform: "scaleY(2)",
    paddingBottom: 2,
  },
  StretchBoldText: {
    fontWeight: 700,
    fontFamily: "Poppins",
    transform: "scaleY(2)",
    fontSize: 16,
  },
  extraboldText: {
    fontWeight: 900,
    fontFamily: "Poppins",
  },
  barUpperText: {
    fontWeight: 900,
    fontFamily: "Poppins",
    fontSize: 14,
    marginBottom: 3,
    zIndex: 10,
    marginTop: 2,
    transform: "scaleY(2)",
  },
  normal: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 12,
  },
  normalTwo: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 10,
  },
  second: {
    fontWeight: 600,
    fontSize: 36,
    fontFamily: "Poppins",
    paddingRight: 4,
  },
});

const MyDocument = ({ csvData }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${day},${month},${year}`;
  };

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${month}/${year}`;
  };

  const canvasRef = React.useRef(null);

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

  return (
    <Document>
      {csvData &&
        csvData.length > 0 &&
        csvData.map((data, index) => {
          const maxiCodeImage = generateMaxiCodeImage(
            `01 96${
              data && data[14]?.padEnd(9, "0")
            } 840 002 1Z10838454 UPSN 40612Y 015 1/1 ${data[16]} N ${
              data[10]
            } ${data[13]}`
          );
          console.log(
            `01 96${data[14]?.padEnd(
              9,
              "0"
            )} 840 002 1Z10838454 UPSN 40612Y 015 1/1 ${data && data[16]} N ${
              data[10]
            } ${data[13]}`
          );
          if (
            !data[0] ||
            !data[2] ||
            !data[4] ||
            !data[5] ||
            !data[6] ||
            !data[7] ||
            !data[8] ||
            !data[16] ||
            !data[17] ||
            !data[18] ||
            !data[19] ||
            !data[15] ||
            !data[10] ||
            !data[12] ||
            !data[13] ||
            !data[14] ||
            !data[20] ||
            !data[21] ||
            !data[22]
          ) {
            return null;
          }
          const generateUpsTrackingNumber = () => {
            const randomSection = `${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}`;

            return `1Z 723 90Y 02 ${randomSection?.slice(
              0,
              4
            )} ${randomSection?.slice(4)}`;
          };
          const trackingId = generateUpsTrackingNumber();
          console.log(trackingId, "trackingId");
          const zipCode = data[14];
          const barcodeValue = `420${
            zipCode?.length === 5 ? zipCode : zipCode?.slice(0, 9)
          }`;
          console.log("barcodeValue One", barcodeValue, "barcodeValue One");
          const barcodeOne = generateBarCodeImage(barcodeValue);
          const barcodeTwo = generateBarCodeTwoImage(data[23]);
          const randomTwoDigitNumber = Math.floor(Math.random() * 90) + 10;

          let inputValue = data[23];

          let formattedValue = [
            inputValue?.slice(0, 2),
            inputValue?.slice(2, 5),
            inputValue?.slice(5, 8),
            inputValue?.slice(8, 10),
            inputValue?.slice(10, 14),
            inputValue?.slice(14),
          ].join(" ");

          return (
            <Page size="A6" key={index} id={`content-id-${index}`}>
              <View>
                <View>
                  <View
                    style={{
                      backgroundColor: "#fff",
                      border: "3",
                      borderColor: "#000",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        padding: 2,
                      }}
                    >
                      <View style={{ fontSize: "8px" }}>
                        <Text>{data[0]}</Text>
                        <Text>{data[7]}</Text>
                        <Text>{data[2]}</Text>
                        <Text>{`${data[4]} ${data[5]} ${data[6]}`}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: 30,
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: 128,
                          }}
                        >
                          <Text style={styles.normal}>{`${data[16]} LBS`}</Text>
                          <Text style={styles.normal}>1 OF 1</Text>
                        </View>
                        <Text style={{ fontSize: "8px", marginLeft: 72 }}>
                          DWT: {`${data[17]},${data[18]},${data[19]}`}
                        </Text>
                      </View>
                      <View></View>
                    </View>

                    <View style={{ padding: 0, marginTop: 12, paddingLeft: 2 }}>
                      <Text style={styles.normalTwo}>SHIP TO:</Text>
                      <View
                        style={{
                          marginLeft: 12,
                          fontSize: "9px",
                          marginTop: -2,
                        }}
                      >
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            margin: 0,
                          }}
                        >
                          {data[8]}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            margin: 0,
                          }}
                        >
                          {data[15]}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            margin: 0,
                          }}
                        >
                          {data[10]}
                        </Text>
                        <Text
                          style={styles.underShipTo}
                        >{`${data[12]} ${data[13]} ${data[14]}`}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "30%", padding: 1 }}>
                        <View
                          style={{
                            width: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          {maxiCodeImage && <Image src={maxiCodeImage} />}
                        </View>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          height: 80,
                          paddingTop: 3,
                          paddingLeft: 4,
                          paddingBottom: 0,
                          borderLeftWidth: 1,
                          borderLeftColor: "#000",
                          position: "relative",
                        }}
                      >
                        <Text style={styles.barUpperText}>
                          {`${data[13]} ${
                            data[14]?.slice(0, 3) || ""
                          } 9-${randomTwoDigitNumber}`}
                        </Text>
                        {barcodeOne && (
                          <Image
                            src={barcodeOne}
                            style={{
                              width: 150,
                              height: 45,
                              marginLeft: 8,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: -4,
                        marginBottom: -7,
                      }}
                    >
                      <View style={{ marginLeft: 3 }}>
                        <Text style={styles.StretchBoldText}>
                          UPS 2ND DAY AIR
                        </Text>
                        <Text
                          style={{
                            fontSize: "10px",
                            paddingHorizontal: 2,
                          }}
                        >
                          TRACKING #: {formattedValue}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.second}>2</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 2,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        height: 90,
                        width: 220,
                        marginHorizontal: "auto",
                        paddingVertical: 6,
                        // paddingHorizontal: 2,
                      }}
                    >
                      {barcodeTwo && <Image src={barcodeTwo} />}
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View style={{ padding: 1 }}>
                      <Text style={{ fontSize: "8px" }}>BILLING: P/P</Text>
                      <Text style={{ fontSize: "8px" }}>DESC: {data[20]}</Text>
                      <Text
                        style={{
                          marginTop: 8,
                          fontWeight: "medium",
                          fontSize: "8px",
                        }}
                      >
                        REF #1: {data[21]}
                      </Text>
                      <Text
                        style={{
                          marginTop: 1,
                          fontWeight: "medium",
                          fontSize: "8px",
                        }}
                      >
                        {`REF #2: ${data[22]}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "flex-end",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        marginTop: 13.1,
                        padding: 0.1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "7px",
                          textAlign: "right",
                          marginRight: 6,
                        }}
                      >
                        {`ISH 13.00F LASER 15.5V ${getCurrentMonth()}`}
                      </Text>
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

export default MyDocument;
