import React from "react";

import { SeatsType } from "../../utils/seatsGenerator";

import "./tickets.css";

type TicketListProps = {
  seats: SeatsType;
  setSelectedSeats: (seatId: number) => void;
  selectedSeats: Map<number, boolean>;
};

export const TicketList: React.FC<TicketListProps> = ({
  seats,
  setSelectedSeats,
  selectedSeats,
}) => {
  return (
    <div className="tickets-list-wrapper">
      <h2>Ticket List</h2>
      <ul className="tickets-list">
        {seats.map((ticket) => (
          <li
            key={ticket.title}
            className={selectedSeats.get(ticket.number) ? "selected" : ""}
            onClick={() => setSelectedSeats(ticket.number)}
          >
            <strong>{ticket.title}</strong> - Zone: {ticket.zone}
          </li>
        ))}
      </ul>
    </div>
  );
};
