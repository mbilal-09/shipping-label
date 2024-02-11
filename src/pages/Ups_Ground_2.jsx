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
    fontWeight: 700,
    fontFamily: "Poppins",
    transform: "scaleY(1.3)",
    fontSize: 22,
    letterSpacing: 0.4,
  },
  extraboldText: { fontWeight: 900, fontFamily: "Poppins" },
  barUpperText: {
    fontWeight: 700,
    fontFamily: "Poppins",
    fontSize: 24,
    marginBottom: 4,
    zIndex: 10,
    marginTop: -2,
    transform: "scaleY(1.3)",
    letterSpacing: 0.1,
    textTransform: "uppercase",
  },
  normal: { fontFamily: "Poppins", fontWeight: 600, fontSize: 12 },
  normalTwo: { fontFamily: "Poppins", fontWeight: 600, fontSize: 10 },
  second: {
    fontWeight: 700,
    fontSize: 32,
    fontFamily: "Poppins",
    paddingRight: 18,
    transform: "scaleY(1.2)",
    marginTop: 2,
  },
  hager: {
    fontWeight: 700,
    fontFamily: "Poppins",
    transform: "scaleY(1.2)",
    fontSize: 10,
    textTransform: "uppercase",
    marginTop: -4,
  },
});

const Ups_Ground_2 = ({ csvData }) => {
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
        csvData?.length > 0 &&
        csvData?.map((data, index) => {
          const maxiCodeImage = generateMaxiCodeImage(
            `[)> 01 96${
              data && data[14]?.replace("-", "").padEnd(9, "0")
            } 840 003 ${data[23]?.slice(0, 2)}${data[23]?.slice(
              data[23]?.length - 8,
              data[23]?.length
            )} UPSN ${data[23]?.slice(2, 8)} ${
              dailyNumber < 100 ? "0" + dailyNumber : dailyNumber
            } 1/1 ${data[16]} N ${data[10]} ${data[13]}`
          );

          // if (
          //   !data[0] ||
          //   !data[2] ||
          //   !data[4] ||
          //   !data[5] ||
          //   !data[6] ||
          //   !data[7] ||
          //   !data[8] ||
          //   !data[16] ||
          //   !data[17] ||
          //   !data[18] ||
          //   !data[19] ||
          //   !data[15] ||
          //   !data[10] ||
          //   !data[12] ||
          //   !data[13] ||
          //   !data[14] ||
          //   !data[20] ||
          //   !data[21] ||
          //   !data[22]
          // ) {
          //   return null;
          // }

          for (let i = 0; i < data?.length; i++) {
            if (!data[i]) {
              data[i] = "";
            }
          }

          const zipCode1 = data[14];
          const zipCode = zipCode1?.replace("-", "");
          const barcodeValue = `420${
            zipCode?.length === 5 ? zipCode : zipCode?.slice(0, 9)
          }`;
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
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        padding: 2,
                        paddingHorizontal: 6,
                      }}
                    >
                      <View
                        style={{ fontSize: "8px", textTransform: "uppercase" }}
                      >
                        <Text style={{ marginBottom: -1 }}>{data[0]}</Text>
                        <Text>{data[7]}</Text>
                        <Text style={{ marginBottom: -1 }}>{data[2]}</Text>
                        <Text
                          style={{ marginBottom: -1 }}
                        >{`${data[4]} ${data[5]} ${data[6]}`}</Text>
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
                          <Text
                            style={{
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              fontSize: 12,
                              marginRight: 4,
                            }}
                          >
                            1 OF 1
                          </Text>
                        </View>
                        <Text
                          style={{ fontSize: "8px", marginLeft: 2 }}
                        >{`DWT: ${data[17]},${data[18]},${data[19]}`}</Text>
                      </View>
                      <View></View>
                    </View>

                    <View
                      style={{
                        padding: 0,
                        marginTop: 8,
                        marginBottom: 16,
                        paddingLeft: 6,
                      }}
                    >
                      <Text style={styles.normalTwo}>SHIP TO:</Text>
                      <View
                        style={{
                          marginLeft: 12,
                          fontSize: "9px",
                          marginTop: -2,
                          textTransform: "uppercase",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: -1,
                          }}
                        >
                          <Text
                            style={{
                              display: "block",
                              margin: 0,
                              textTransform: "uppercase",
                            }}
                          >
                            {data[8]}
                          </Text>
                          <Text
                            style={{
                              display: "block",
                              margin: 0,
                              textTransform: "uppercase",
                              marginLeft: 4,
                            }}
                          >
                            {data[9]}
                          </Text>
                        </View>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            textTransform: "uppercase",
                          }}
                        >
                          {data[15]}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginTop: -2,
                            textTransform: "uppercase",
                          }}
                        >
                          {data[10]}
                        </Text>
                        {data[11] && (
                          <Text
                            style={{
                              display: "block",
                              marginVertical: 0,
                              textTransform: "uppercase",
                              marginBottom: 0,
                            }}
                          >
                            {data[11]}
                          </Text>
                        )}
                        {/* <Text
                          style={styles.underShipTo}
                        >{`${data[13]} ${data[14]}`}</Text> */}
                        <Text
                          style={styles.hager}
                        >{`HAGERSTOWN ${data[13]} ${data[14]}`}</Text>
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
                            paddingHorizontal: 6,
                          }}
                        >
                          {maxiCodeImage && (
                            <Image
                              src={maxiCodeImage}
                              style={{ width: 80, height: 72 }}
                            />
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          height: 80,
                          paddingTop: -2,
                          paddingLeft: 4,
                          paddingBottom: 4,
                          borderLeftWidth: 1,
                          borderLeftColor: "#000",
                          position: "relative",
                        }}
                      >
                        <Text style={styles.barUpperText}>{`${data[13]} ${
                          data[14]?.slice(0, 3) || ""
                        } 9-${randomTwoDigitNumber}`}</Text>
                        {barcodeOne && (
                          <Image
                            src={barcodeOne}
                            style={{ width: 110, height: 45, marginLeft: 8 }}
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
                        marginVertical: -5,
                        marginBottom: -3,
                        paddingTop: 2,
                      }}
                    >
                      <View style={{ marginLeft: 5 }}>
                        <Text style={styles.StretchBoldText}>UPS GROUND</Text>
                        <Text
                          style={{
                            fontSize: "10px",
                            paddingBottom: 7,
                            marginTop: -5,
                          }}
                        >{`TRACKING #: ${formattedValue}`}</Text>
                      </View>
                      <View
                        style={{
                          marginVertical: -0.4,
                          backgroundColor: "black",
                          width: 44,
                          height: 44,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignContent: "flex-end",
                        }}
                      ></View>
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
                        paddingVertical: 3,
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
                    <View style={{ paddingTop: 0, paddingLeft: 4 }}>
                      <Text style={{ fontSize: "8px" }}>BILLING: P/P</Text>
                      <Text style={{ fontSize: "8px" }}>DESC: {data[20]}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingHorizontal: 4,
                        marginTop: 8,
                        position: "absolute",
                        bottom: 7,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "medium",
                          fontSize: "8px",
                        }}
                      >{`Refrence No.1: ${data[21]}`}</Text>
                      <Text
                        style={{
                          fontWeight: "medium",
                          fontSize: "8px",
                        }}
                      >
                        {data[22] && `Refrence No.2: ${data[22]}`}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-end",
                          marginRight: 18,
                          position: "relative",
                        }}
                      >
                        <Image
                          src={
                            "https://hassankhanw3.pythonanywhere.com/image/pdfgift/"
                          }
                          style={{
                            width: 50,
                            height: 20,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 7,
                            fontWeight: 700,
                            // marginLeft: -6,
                            position: "absolute",
                            right: -1,
                            bottom: 7,
                          }}
                        >
                          TM
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "flex-end",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        position: "absolute",
                        bottom: 0,
                        right: "4%",
                        // left: "50%",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "5px",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >{`ISH 13.00F LASER 15.5V ${getCurrentMonth()}`}</Text>
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

export default Ups_Ground_2;
