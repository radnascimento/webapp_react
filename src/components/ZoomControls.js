import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from 'react-icons/fa'; // Import icons

const ZoomControls = () => {
  // Load initial zoom level from localStorage or default to 100%
  const [zoomLevel, setZoomLevel] = useState(() => {
    return parseInt(localStorage.getItem("zoomLevel")) || 100;
  });

  // Apply zoom effect whenever zoomLevel changes
  useEffect(() => {
    document.body.style.zoom = `${zoomLevel}%`;
    localStorage.setItem("zoomLevel", zoomLevel); // Save zoom level
  }, [zoomLevel]);

  // Function to adjust zoom
  const adjustZoom = (zoomChange) => {
    let newZoom = zoomLevel + zoomChange;
    newZoom = Math.max(50, Math.min(200, newZoom)); // Limit zoom between 50% and 200%
    
    setZoomLevel(newZoom);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-secondary btn-sm" onClick={() => adjustZoom(-10)}>
        <FaMinus />
      </button>
      <span>{zoomLevel}%</span>
      <button className="btn btn-primary btn-sm" onClick={() => adjustZoom(10)}>
        <FaPlus />
      </button>
    </div>
  );
};

export default ZoomControls;
