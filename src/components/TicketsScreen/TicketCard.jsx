// TicketCard.js

import React from "react";

const TicketCard = ({ ticket }) => {
  const {
    id,
    userId,
    parkingSpaceId,
    serviceId,
    carNumber,
    startDate,
    endDate,
    price,
    status,
  } = ticket;

  return (
    <div className="ticket-card">
      <h3>Ticket ID: {id}</h3>
      <p>User ID: {userId}</p>
      <p>Parking Space ID: {parkingSpaceId}</p>
      <p>Service ID: {serviceId}</p>
      <p>Car Number: {carNumber}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Price: {price}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default TicketCard;
