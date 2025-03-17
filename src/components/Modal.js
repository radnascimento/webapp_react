//import React from 'react';

//const Modal = ({ isOpen, onClose, children }) => {
//    if (!isOpen) return null; // Don't render the modal if it's not open

//    return (
//        <div className="modal-overlay" style={modalOverlayStyles}>
//            <div className="modal-content" style={modalContentStyles}>
//                <span onClick={onClose} style={closeButtonStyles}><i class="fa-solid fa-xmark"></i></span>
//                {children}
//            </div>
//        </div>
//    );
//};

//// Modal overlay style with transparent background
//const modalOverlayStyles = {
//    position: 'fixed',
//    top: '0',
//    left: '0',
//    width: '100%',
//    height: '100%',
//    backgroundColor: 'rgba(0, 128, 0, 0.0)', // Fully transparent green background
//    display: 'flex',
//    justifyContent: 'center',
//    alignItems: 'center',
//    zIndex: '1000',
//};

//// Modal content style
//const modalContentStyles = {
//    backgroundColor: 'white',
//    padding: '20px',
//    borderRadius: '8px',
//    minWidth: '300px',
//    maxWidth: '600px',
//    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//    position: 'relative',
//};

//// Close button style
//const closeButtonStyles = {
//    position: 'absolute',
//    top: '10px',
//    right: '10px',
//    fontSize: '30px',
//    cursor: 'pointer',
//    color: '#347960', // Apply the green color to the close button

//};


//export default Modal;

import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="modal-overlay" style={modalOverlayStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <span onClick={onClose} style={closeButtonStyles}><i className="fa-solid fa-xmark"></i></span>
                {children}
            </div>
        </div>
    );
};

// Modal overlay style with a mix of black and transparency
const modalOverlayStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Mix of black and transparency (30% opacity)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000', // Ensure the modal is on top
};

// Modal content style
const modalContentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
};

// Close button style
const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '30px',
    cursor: 'pointer',
    color: '#347960', // Apply the green color to the close button
};

export default Modal;
