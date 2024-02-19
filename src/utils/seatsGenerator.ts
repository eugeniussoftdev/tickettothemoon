import { seatPerRow } from "../constants";

export type SeatsType = ReturnType<typeof seatsGenerator>;

const zones = ["blue", "green", "red", "black"];

export const seatsGenerator = () =>
  Array.from({ length: 80 }).map((_, i) => {
    function zoneHelper(position: number) {
      if (position % seatPerRow < 9 && position % seatPerRow > 4) {
        return zones[1];
      }
      if (position % seatPerRow < 13 && position % seatPerRow > 8) {
        return zones[2];
      }
      if (
        (position % seatPerRow < 17 && position % seatPerRow > 12) ||
        position % seatPerRow === 0
      ) {
        return zones[3];
      }
      if (position % seatPerRow < 5) {
        return zones[0];
      }

      return "grey";
    }
    return {
      title: "Ticket " + (i + 1),
      number: i + 1,
      zone: zoneHelper(i + 1),
    };
  });
