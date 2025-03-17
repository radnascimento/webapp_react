import React from "react";
import { Modal } from "antd";

const ModalWithIframe = ({ url, isOpen, onClose }) => {
  return (
    <Modal
      title="Study Details"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width="100%" // Make width 100% for fullscreen
      style={{ top: 0, left: 0, right: 0, bottom: 0 }} // Fullscreen style for the modal container
      bodyStyle={{ height: "100vh", padding: 0 }} // Fullscreen height for modal content
      className="fullscreen-modal" // Optional class if you want to add custom CSS
      destroyOnClose
    >
      {url && (
        <iframe
          src={url} // Pass study URL to iframe
          width="100%" // Make iframe fullscreen
          height="100%" // Adjust height to 100% for full screen
          style={{ border: "none" }}
        />
      )}
    </Modal>
  );
};

export default ModalWithIframe;
