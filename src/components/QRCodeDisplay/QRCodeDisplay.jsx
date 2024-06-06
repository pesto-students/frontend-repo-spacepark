import React, { useState, useEffect } from "react";
import "./QRCodeDisplay.scss";

const QRCodeDisplay = ({ userId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`/api/qrcode/${userId}`);
        const data = await response.json();
        setQrCodeUrl(data.qrCodeUrl);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQRCode();
  }, [userId]);

  return (
    <div className="qr-code-container">
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
