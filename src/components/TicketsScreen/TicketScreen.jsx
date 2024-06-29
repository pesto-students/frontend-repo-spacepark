// TicketScreen.js

import React, { useState, useEffect } from "react";
import { fetchTicketsByType } from "./fetchTickets";
import TicketCard from "./TicketCard";
import "./TicketScreen.scss";
import { useAtom } from "jotai";
import { Button } from "reactstrap";
import { parkingSpacesAtom } from "../SearchComponent";
import { useUser } from "../../context/userContext";
const TicketScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [, setParkingSpace] = useAtom(parkingSpacesAtom);
  const [selectedType, setSelectedType] = useState("present");

  const { user } = useUser();

  const userId = user.id;
  useEffect(() => {
    fetchTickets(selectedType, userId);
    // eslint-disable-next-line
  }, [selectedType]);

  useEffect(() => {
    setParkingSpace([]);
    // eslint-disable-next-line
  }, []);

  const fetchTickets = async (type, userId) => {
    const data = await fetchTicketsByType(type, userId);
    setTickets(data);
    console.log("......tkt...", tickets);
  };

  const handleTabClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="ticket-screen">
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
