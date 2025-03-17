import React from "react";
import Modal from "./Modal"; // Ensure you import your Modal component

const ModalYt = ({ isOpen, onClose, nameTopic, url }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h5 className="card-title">
                {nameTopic} - <span>video</span>
            </h5>

            <div className="video-container">
                <iframe
                    src={url}
                    loading="lazy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    title="YT"
                ></iframe>
            </div>

         
        </Modal>
    );
};

export default ModalYt;
