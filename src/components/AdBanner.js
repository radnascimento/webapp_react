import React from "react";

const AdBanner = () => {
    return (
        <div className="text-center bg-light border p-3 mt-4">
            <p className="mb-1 text-muted">Sponsored Ad</p>
            <div className="border p-2 bg-white shadow-sm">
                <p className="fw-bold">Your Ad Here</p>
                <p>Boost your business with targeted ads.</p>
                <button className="btn btn-primary btn-sm">Learn More</button>
            </div>
        </div>
    );
};

export default AdBanner;
