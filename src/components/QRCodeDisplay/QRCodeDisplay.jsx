import React, { useState, useEffect } from "react";
import Loader from "./FramerMotion";
import "./QRCodeDisplay.scss";
import { useUser } from "../../context/userContext";

const QRCodeDisplay = ({ userId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
console.log(useUser(), 'User');
const data1 =  useUser();
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/qrcode?id=${data1.user.id}`);
        const data = await response.json();
        setQrCodeUrl(data.qrCodeUrl);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQRCode();
  }, [userId, data1]);

  return (
    <div className="qr-code-container">
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" />
      ) : (
        <Loader />
        // <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
