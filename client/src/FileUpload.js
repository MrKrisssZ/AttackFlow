import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatusMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', { // 请根据你的后端配置调整此URL
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("File successfully uploaded!");
      } else {
        setStatusMessage(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      setStatusMessage(`Upload error: ${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Choose file:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Upload</button>
      </form>

      {previewUrl && (
        <div>
          <h3>Preview:</h3>
          <img src={previewUrl} alt="File Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default FileUpload;
