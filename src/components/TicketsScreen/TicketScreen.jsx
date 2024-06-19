// TicketScreen.js

import React, { useState, useEffect } from "react";
import { fetchTicketsByType } from "./fetchTickets";
import TicketCard from "./TicketCard";
import "./TicketScreen.scss";
import { Button } from "reactstrap";
const TicketScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedType, setSelectedType] = useState("present");

  useEffect(() => {
    fetchTickets(selectedType);
  }, [selectedType]);

  const fetchTickets = async (type) => {
    const data = await fetchTicketsByType(type);
    setTickets(data);
  };

  const handleTabClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="ticket-screen">
      <div className="bold fs-20 mt-2" onClick={() => { window.location.href = '/settings' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
      </svg>Book Ticket</div>
      <div className="tabs">
        <Button
          color={selectedType === "past" ? "info" : "secondary"}
          onClick={() => handleTabClick("past")}
          className="tab"
        >
          Past
        </Button>
        <Button
          color={selectedType === "present" ? "info" : "secondary"}
          onClick={() => handleTabClick("present")}
          className="tab"
        >
          Present
        </Button>
        <Button
          color={selectedType === "future" ? "info" : "secondary"}
          onClick={() => handleTabClick("future")}
          className="tab"
        >
          Future
        </Button>
      </div>
      <div className="ticket-cards">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketScreen;
