import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Document,
  Page,
  Image,
  View,
  Text,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const MyDocument = ({
  frontImage,
  backImage,
  experiment,
  fontFamily,
  primaryColor,
  textColor,
}) => {
  console.log("this is experiment", experiment);
  return (
    <Document>
      {frontImage && (
        <Page size="letter" orientation="landscape">
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {/* second */}
            <Image src={frontImage} style={{ objectFit: "contain" }} />
            <View
              style={{
                position: "absolute",
                height: "70px",
                width: "70px",
                backgroundColor: "#471C75",
                top: "3%",
                left: "3%",
                borderRadius: "100%",
                border: "3px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: "50px",
                }}
              >
                {experiment["Experiment Number"] < 10
                  ? `0${experiment["Experiment Number"]}`
                  : experiment["Experiment Number"]}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                height: "70%",
                width: "80%",

                top: "10%",
                left: "10%",
              }}
            >
              <Text
                style={{
                  fontSize: "47px",
                  letterSpacing: -2,
                  textTransform: "uppercase",
                  textAlign: "center",
                  color: "#732561",
                }}
              >
                {experiment["Experiment Name"]}
              </Text>
              <Text
                style={{
                  marginTop: "15px",
                  fontSize: "40.2px",
                  textTransform: "uppercase",
                  color: "#85157B",
                }}
              >
                Objective
              </Text>
              <Text
                style={{
                  fontSize: "26.7px",
                }}
              >
                {experiment["Objective"]}
              </Text>
              <Text
                style={{
                  marginTop: "15px",
                  fontSize: "40.2px",
                  textTransform: "uppercase",
                  color: "#85157B",
                }}
              >
                Materials
              </Text>
              <Text
                style={{
                  fontSize: "26.7px",
                }}
              >
                {experiment["Quantity"]}
              </Text>
            </View>
          </View>
        </Page>
      )}
      {backImage && (
        <Page size="letter" orientation="landscape">
          <View style={{ width: "100%", height: "100%" }}>
            <Image src={backImage} style={{ objectFit: "contain" }} />
            <View
              style={{
                position: "absolute",
                height: "70%",
                width: "80%",

                top: "10%",
                left: "10%",
              }}
            >
              <Text
                style={{
                  marginTop: "15px",
                  fontSize: "40.2px",
                  textTransform: "uppercase",
                  color: "#85157B",
                }}
              >
                Procedure
              </Text>
              <Text
                style={{
                  fontSize: "26.7px",
                }}
              >
                {experiment["Procedure"]}
              </Text>
              <Text
                style={{
                  marginTop: "15px",
                  fontSize: "40.2px",
                  textTransform: "uppercase",
                  color: "#85157B",
                }}
              >
                EXPLANATION
              </Text>
              <Text
                style={{
                  fontSize: "26.7px",
                }}
              >
                {experiment["Explanation"]}
              </Text>
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
};

const Dashboard = () => {
  const [fontFamily, setFontFamily] = useState("Kalam");
  const [primaryColor, setPrimaryColor] = useState("purple");
  const [textColor, setTextColor] = useState("black");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isFrontView, setIsFrontView] = useState(true);
  const [dataArray, setDataArray] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.name.split(".").pop() !== "xlsx") {
      return alert("Please Select Correct FileType");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract header row
      const headers = dataArray[0];

      // Convert subsequent rows to objects
      const objectsArray = dataArray.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      setDataArray(objectsArray);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileInput = (e, flag) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      if (flag) {
        setFrontImage(imageDataUrl);
      } else {
        setBackImage(imageDataUrl);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const downloadAllPDFs = () => {
    // if (dataArray) {
    //   const zip = new JSZip();
    //   dataArray.forEach((data, index) => {
    //     const pdfBlob = new Blob(
    //       [
    // <MyDocument
    //   key={index} // Ensure each PDF has a unique key
    //   frontImage={frontImage}
    //   backImage={backImage}
    //   experiment={data}
    //   fontFamily={fontFamily}
    //   primaryColor={primaryColor}
    //   textColor={textColor}
    // />,
    //       ],
    //       {
    //         type: "application/pdf",
    //       }
    //     );

    //     // Add each PDF blob to the zip file
    //     zip.file(`preview_${index + 1}.pdf`, pdfBlob);

    //     // Test: Output the PDF blob to console
    //     console.log(`PDF Blob for object ${index + 1}:`, pdfBlob);
    //   });

    //   // Generate the zip file
    //   zip.generateAsync({ type: "blob" }).then((content) => {
    //     // Download the zip file
    //     saveAs(content, "preview.zip");
    //   });
    // } else {
    //   console.log("Data array is empty or null");
    // }

    if (dataArray) {
      const zip = new JSZip();
      // for each pdf you have to add the blob to the zip
      const imgfolder = zip.folder("images");
      dataArray &&
        dataArray.length > 0 &&
        dataArray.map((experiment, index) => {
          imgfolder.file(
            `${experiment["Experiment Name"]}.pdf`,
            pdf(
              <MyDocument
                key={index} // Ensure each PDF has a unique key
                frontImage={frontImage}
                backImage={backImage}
                experiment={experiment}
                fontFamily={fontFamily}
                primaryColor={primaryColor}
                textColor={textColor}
              />
            ).toBlob()
          );
        });

      zip.generateAsync({ type: "blob" }).then(function (content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
      });
    }
  };

  return (
    <div className="container-fluid">
      {dataArray && dataArray.length > 0 && (
        <PDFViewer className="main-preview">
          <MyDocument
            frontImage={frontImage}
            backImage={backImage}
            experiment={dataArray[0]}
            fontFamily={fontFamily}
            primaryColor={primaryColor}
            textColor={textColor}
          />
        </PDFViewer>
      )}
      <div className="toggle-preview">
        <button
          className="btn btn-primary"
          onClick={() => setIsFrontView(true)}
        >
          Front Preview
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsFrontView(false)}
        >
          Back Preview
        </button>
      </div>
      <div className="main-inputs">
        <input type="file" onChange={(e) => handleFileInput(e, true)} />
        <input type="file" onChange={(e) => handleFileInput(e, false)} />
        <div className="form-file">
          <input
            type="file"
            className="form-file-input"
            id="customFile"
            onChange={handleFileChange}
          />
          <label className="form-file-label" htmlFor="customFile">
            <span className="form-file-text">
              Bulk Add Emails... Eg. abc.xslx
            </span>
            <span
              className="btn btn-primary"
              style={{ borderRadius: "0 3px 3px 0" }}
            >
              Browse
            </span>
          </label>
        </div>
        <button className="btn btn-primary" onClick={downloadAllPDFs}>
          Download All PDFs
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
