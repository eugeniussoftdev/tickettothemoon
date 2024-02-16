import { useState } from "react";

import { SeatMap } from "./components/SeatMap/SeatMap";
import { TicketList } from "./components/Tickets/Tickets";
import { Content } from "./layouts/Content";
import { Sidebar } from "./layouts/Sidebar";

import { SeatsType, seatsGenerator } from "./utils/seatsGenerator";

import "./App.css";

function App() {
  const initialSeats = seatsGenerator();
  const [tickets, setTickets] = useState<SeatsType>([]);
  const [selectedSeats, setSelectedSeats] = useState<Map<number, boolean>>(
    new Map()
  );

  const handleToggleSeat = (seatId: number) => {
    const newSelectedSeats = new Map(selectedSeats);
    if (newSelectedSeats.get(seatId)) {
      newSelectedSeats.delete(seatId);
    } else {
      newSelectedSeats.set(seatId, true);
    }
    setSelectedSeats(newSelectedSeats);
  };

  return (
    <div className="App">
      <div className="container">
        <Sidebar>
          <TicketList
            seats={tickets}
            selectedSeats={selectedSeats}
            setSelectedSeats={handleToggleSeat}
          />
        </Sidebar>
        <Content>
          <SeatMap
            seats={initialSeats}
            selectedSeats={selectedSeats}
            setTickets={setTickets}
            setSelectedSeats={handleToggleSeat}
          />
        </Content>
      </div>
    </div>
  );
}

export default App;
