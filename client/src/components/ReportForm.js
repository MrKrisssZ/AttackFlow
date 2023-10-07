import React, { useState, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import MessageModal from "./MessageModal";
import { useAuthContext } from '../hooks/UseAuthContext'

const ReportForm = () => {
  const { user } = useAuthContext();
  const [userID, setUserID] = useState(user.userID);
  const [pdfFile, setPdfFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadedAt, setUploadedAt] = useState(Date());
  const [validated, setValidated] = useState(false);
  const fileType = ["application/pdf"];
  const newplugin = defaultLayoutPlugin();
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
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
      setModalMessage("Upload failed");
    }

    if (response.ok) {
      // reset the error
      setError(null);


      //reset the form
      setPdfFile("");
      setModalMessage("Upload successfully");

      console.log("new report added: ", json);
      // dispatch({ type: 'CREATE_REPORT ', payload: json })
    }

    setIsModalOpen(true);
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Upload a PDF file</h3>
        <label>Choose a PDF file</label>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleChange}
          pattern="*.pdf"
          required
        />
        <button onClick={handleFileUpload}>Upload</button>
        {error && <div className="error">{error}</div>}
      </form>
      <MessageModal
        isOpen={isModalOpen}
        message={modalMessage}
        onRequestClose={() => setIsModalOpen(false)}
      />
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
