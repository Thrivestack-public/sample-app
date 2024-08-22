import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './modalComponent.css';
import { textConstants } from "../../../textConstants";
import { IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const JsonViewerModal = ({ isOpen, onClose, json1, json2 }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  if (!isOpen) return null;

  const handleTabClick = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-title">{textConstants.SHARED_DATA_MODAL_TITLE}</div>
            <div className="modal-subtitle">{textConstants.SHARED_DATA_MODAL_DESC}</div>
          </div>
          <IconButton
            onClick={onClose}
            className="close-button"
            size="large">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal-content">
          <div className="modal-tabs">
            <div
              className={`modal-tab ${selectedTab === 1 ? 'active' : ''}`}
              onClick={() => handleTabClick(1)}
            >
              User data
            </div>
            <div
              className={`modal-tab ${selectedTab === 2 ? 'active' : ''}`}
              onClick={() => handleTabClick(2)}
            >
              Authentication data
            </div>
          </div>
          <div className="json-viewer">
            {selectedTab === 1 && <ReactJson src={json1} theme="monokai" collapsed={false} />}
            {selectedTab === 2 && <ReactJson src={json2} theme="monokai" collapsed={false} />}
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JsonViewerModal;
