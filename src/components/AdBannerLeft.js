import React from "react";


const AdBanner = () => {
    return (
        <div className="left-ad">
            <p>Advertisement</p>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXX" // Replace with your AdSense publisher ID
                data-ad-slot="XXXXXXX" // Replace with your AdSense ad slot
                data-ad-format="auto"
            ></ins>
            <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
        </div>
    );
};

export default AdBanner;
