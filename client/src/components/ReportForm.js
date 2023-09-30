import React, { useState } from "react";
import MessageModal from "./MessageModal.js";

const ReportForm = () => {
  // To-do: get the userID
  const [userID, setUserID] = useState("user01");
  const [url, setUrl] = useState("");
  const [uploadedAt, setUploadedAt] = useState(Date());
  const [validated, setValidated] = useState(false);

  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      setModalMessage("Upload successfully");

      //reset the form
      setUrl("");

      console.log("new report added: ", json);
      // dispatch({ type: 'CREATE_REPORT ', payload: json })
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-4">Upload an incident report link</h3>
      <label className="block mb-2">Enter the url</label>
      <input
        type="url"
        onChange={(e) => setUrl(e.target.value)}
        pattern="https://.*"
        required
        className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded-lg font-semibold cursor-pointer"
      >Upload</button>
      <MessageModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={closeModal}
      />
    </form>
  );
};

export default ReportForm;

//{ error && <div className='error'>{ error }</div>}
