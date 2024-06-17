// src/components/QRCodeScanner.js
import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";
import Modal from "react-modal";
import "./QRCodeScanner.scss";

const QRCodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [, setIsLeaving] = useState(false);

  const handleScan = async (data) => {
    if (data) {
      setLoading(true);
      setScannedData(data);
      setModalIsOpen(true);

      try {
        const response = await axios.get(`/api/tickets/active/${scannedData}`);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleStatusUpdate = async (ticket, status) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/tickets/update-status", {
        ticketId: ticket.id,
        status,
      });
      const updatedTicket = response.data;
      setTickets((prevTickets) =>
        prevTickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
      );
      setSelectedTicket(updatedTicket);
      setIsLeaving(status === "used");
    } catch (error) {
      console.error("Error updating ticket status:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTickets([]);
    setScannedData(null);
    setSelectedTicket(null);
  };

  return (
    <div className="qr-code-scanner">
      <h2>Scan QR Code</h2>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className="ticket-info">
            <h3>Ticket Information</h3>
            {selectedTicket ? (
              <div className="ticket-card">
                <p>User ID: {selectedTicket.userId}</p>
                <p>Parking Space ID: {selectedTicket.parkingSpaceId}</p>
                <p>Car Number: {selectedTicket.carNumber}</p>
                <p>Start Date: {selectedTicket.startDate}</p>
                <p>End Date: {selectedTicket.endDate}</p>
                <p>Status: {selectedTicket.status}</p>
                {selectedTicket.status === "onuse" && (
                  <button
                    onClick={() => handleStatusUpdate(selectedTicket, "used")}
                    className="action-button"
                  >
                    Exit Vehicle
                  </button>
                )}
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <p>User ID: {ticket.userId}</p>
                  <p>Parking Space ID: {ticket.parkingSpaceId}</p>
                  <p>Car Number: {ticket.carNumber}</p>
                  <p>Start Date: {ticket.startDate}</p>
                  <p>End Date: {ticket.endDate}</p>
                  <p>Status: {ticket.status}</p>
                  {ticket.status === "active" && (
                    <button
                      onClick={() => handleStatusUpdate(ticket, "onuse")}
                      className="action-button"
                    >
                      Entry Vehicle
                    </button>
                  )}
                </div>
              ))
            )}
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QRCodeScanner;
