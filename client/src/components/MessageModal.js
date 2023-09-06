import React from "react";
import "../MessageModal.css";

function MessageModal({ isOpen, message, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="model-background">
        <div className="modal-content">
          <p>{message}</p>
          <div className="close">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
