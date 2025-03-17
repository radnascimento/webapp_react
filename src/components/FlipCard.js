import { useState } from "react";


const FlipCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCardStyle = {
        width: "200px",
        height: "120px",
        perspective: "1000px", /* Adds 3D effect */
        cursor: "pointer",
    };

    const flipCardInnerStyle = {
        width: "100%",
        height: "100%",
        position: "relative",
        transition: "transform 0.6s", /* Smooth flip animation */
        transformStyle: "preserve-3d",
    };

    const flippedStyle = {
        transform: "rotateY(180deg)", /* Rotate the card 180° */
    };

    const flipCardFrontStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        backfaceVisibility: "hidden", /* Hides the back side when flipped */
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        background: "#007bff", /* Bootstrap primary color */
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const flipCardBackStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        backfaceVisibility: "hidden", /* Hides the front side when flipped */
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        background: "#28a745", /* Bootstrap success color */
        color: "white",
        transform: "rotateY(180deg)", /* Rotate the back side 180° */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <div
                style={flipCardStyle}
                className={isFlipped ? "flipped" : ""}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div style={{ ...flipCardInnerStyle, ...(isFlipped ? flippedStyle : {}) }}>
                    {/* Front Side */}
                    <div style={flipCardFrontStyle}>
                        <h5>Front Side</h5>
                    </div>

                    {/* Back Side */}
                    <div style={flipCardBackStyle}>
                        <h5>Back Side</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
