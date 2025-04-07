import React from "react";

const LocationMap = ({ lat, lng, zoom = 15 }) => {
  const apiKey = "YOUR_API_KEY"; // Replace with your Google Maps API Key
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div
      className="global-border-radius border"
      style={{ width: "100%", height: "300px" }}
    >
      <iframe
        className="global-border-radius border"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapSrc}
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default LocationMap;
