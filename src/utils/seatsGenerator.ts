export type SeatsType = ReturnType<typeof seatsGenerator>;

const zones = ["blue", "green", "red", "black"];

export const seatsGenerator = () =>
  Array.from({ length: 80 }).map((_, i) => {
    function zoneHelper(position: number) {
      if (position % 16 < 9 && position % 16 > 4) {
        return zones[1];
      }
      if (position % 16 < 13 && position % 16 > 8) {
        return zones[2];
      }
      if ((position % 16 < 17 && position % 16 > 12) || position % 16 === 0) {
        return zones[3];
      }
      if (position % 16 < 5) {
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
