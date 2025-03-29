import React from "react";
import Modal from "./Modal"; // Ensure you import your Modal component

const ModalYt = ({ isOpen, onClose, nameTopic, url }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <style>
                {`
                .modal-overlay {
                    background-color: rgba(0, 0, 0, 0.5); 
                }
                .modal-content {
                    text-align: center;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: black;
                }

                .modal-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .video-wrapper {
                    position: relative;
                    width: 100%;
                    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
                    overflow: hidden;
                    border-radius: 10px;
                    background: #000; /* Black background for video */
                }

                .video-wrapper iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .modal-footer {
                    margin-top: 10px;
                }

                .close-btn {
                    background-color: #ff4d4f;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background 0.3s ease;
                }

                .close-btn:hover {
                    background-color: #d9363e;
                }
                `}
            </style>

            <div className="modal-content">
                {/* Modal Title */}
                <h5 className="modal-title">{nameTopic} - <span>Video</span></h5>

                {/* Video Container */}
                <div className="video-wrapper">
                    <iframe
                        src={url}
                        loading="lazy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        title="YouTube Video"
                    ></iframe>
                </div>

                {/* Modal Footer with Close Button */}
                <div className="modal-footer">
                    <button onClick={onClose} className="close-btn">Fechar</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalYt;
