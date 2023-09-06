// FileUpload.js
import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    setStatusMessage("文件已 '上传'！（注意：此示例未实际上传到任何服务器）");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          选择文件：
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">上传</button>
      </form>

      {previewUrl && (
        <div>
          <h3>预览：</h3>
          <img src={previewUrl} alt="File Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default FileUpload;
