import React, { useState } from "react";

const Accordion = ({ title, children, hasContent }) => {
  const [isOpen, setIsOpen] = useState(false);

    const click = (id) => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="accordion">
      
      <div
        className="accordion-header"
        onClick={() => click()}
        style={{
        cursor: "pointer",
        padding: "20px",
            /*backgroundColor: hasContent ? "#a8d5ba" : "white", // Change color if there's content*/
        backgroundColor: hasContent ? "white" : "white", 
        borderBottom: "1px solid #ddd",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: hasContent ? "#006D77" : "default", // Change color if there's content
              }}

              
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <div
          className="accordion-content"
          style={{ padding: "10px", backgroundColor: "#fff" }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;