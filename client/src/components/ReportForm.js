import React, { useState, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ReportForm = () => {
  // To-do: get the userID
  const [userID, setUserID] = useState("user01");
  const [pdfFile, setPdfFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadedAt, setUploadedAt] = useState(Date());
  const [validated, setValidated] = useState(false);
  const fileType = ["application/pdf"];
  const newplugin = defaultLayoutPlugin();
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let selectedFilename = selectedFile.name;
        setUrl(selectedFilename);
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setError("Not a valid PDF file");
      }
    }
  };

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      const responseGD = await fetch("http://localhost:5005/upload", {
        method: "POST",
        body: formData,
      });

      const data = await responseGD.json();
      console.log("upload file: ", data.files);
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const report = { url, uploadedAt, userID, validated };

    const response = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      // reset the error
      setError(null);

      //reset the form
      setPdfFile("");

      console.log("new report added: ", json);
      // dispatch({ type: 'CREATE_REPORT ', payload: json })
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Upload a PDF file</h3>
        <label>Choose a PDF file</label>
        <input
          type="file"
          onChange={handleChange}
          //onClick={handleFileUpload}
          pattern="*.pdf"
          required
        />
        <button>Upload</button>
        {error && <div className="error">{error}</div>}
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
};

export default ReportForm;
