import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function PDFViewer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const newplugin = defaultLayoutPlugin();
  const fileType = ["application/pdf"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid PDF file");
        setPdfFile(null);
      }
    } else {
      console.log("Please select a PDF file");
    }
  };

  return (
    <div className="container">
      <form>
        <label>
          <h2>Upload PDF</h2>
        </label>
        <br></br>
        <input type="file" className="form-control" onChange={handleChange} />
        <button type="submit" className="btn btn-success">
          Upload
        </button>
      </form>
      <h2>View PDF</h2>
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[newplugin]}></Viewer>
          </Worker>
        )}
        {!pdfFile && <>No PDF</>}
      </div>
    </div>
  );
}

export default PDFViewer;
