// TicketCard.js

import React from "react";
import "./TicketCard.scss";

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
    checkInTime,
    checkOutTime,
  } = ticket;
  ticket.status = ticket.status.toLowerCase();

  console.log("card ", ticket);

  return (
    <div className={`ticket-container ${status}`}>
      <div className="ticket-content">
        <h3 className="ticketId">Ticket ID: {id}</h3>
        <p className={`status ${status}`}>Status: {status}</p>
        <div className="timings">
          <p>Start Time: {`${startDate}  ${checkInTime}`}</p>
          <p>End Time: {`${endDate}  ${checkOutTime}`}</p>
        </div>
        <div className="info user">
          <p>User ID: {userId}</p>
          <p>Car Number: {carNumber}</p>
        </div>
        <div className="info service">
          <p>Parking Space ID: {parkingSpaceId}</p>
          <p>Service ID: {serviceId}</p>
        </div>

        <p className="price">Price: &#8377;{price}</p>
      </div>
    </div>
  );
};

export default TicketCard;
