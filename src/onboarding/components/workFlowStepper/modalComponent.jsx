import ReactJson from 'react-json-view';
import React, { useState } from 'react';
import './modalComponent.css'; // Assuming you have a CSS file for styling

const JsonViewerModal = ({ isOpen, onClose, json }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="modal-content">
            <ReactJson src={json} theme="monokai" collapsed={1} />
        </div>
      </div>
    </div>
  );
};

export default JsonViewerModal;
