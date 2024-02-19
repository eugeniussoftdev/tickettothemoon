import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Actions } from "./components/Actions";
import { seatPerRow } from "../../constants";

import { SeatsType } from "../../utils/seatsGenerator";

export const isInViewpostFinder = () => {};

type SeatMapProps = {
  seats: SeatsType;
  selectedSeats: Map<number, boolean>;
  setTickets: Dispatch<SetStateAction<SeatsType>>;
  setSelectedSeats: (seatId: number) => void;
};

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeats,
  setTickets,
  setSelectedSeats,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(0);

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapPosition, setMapPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const handleDragStart = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    let startX = e.clientX - svgRect.left;
    let startY = e.clientY - svgRect.top;

    const handleDragMove = (e: MouseEvent) => {
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;
      const deltaX = mouseX - startX;
      const deltaY = mouseY - startY;

      setMapPosition((prevPosition) => ({
        x: prevPosition.x + deltaX / zoomLevel,
        y: prevPosition.y + deltaY / zoomLevel,
      }));

      startX = mouseX;
      startY = mouseY;
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const seatWidth = 40 * zoomLevel;
  const seatHeight = 40 * zoomLevel;
  const seatGap = 10 * zoomLevel;

  useEffect(() => {
    if (svgRef.current) {
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      setSvgWidth(width);
      setSvgHeight(height);
    }
  }, []);

  useEffect(() => {
    const filteredSeats = seats.filter((_, i) => {
      const rectX = (i % seatPerRow) * (seatWidth + seatGap);
      const rectY = Math.floor(i / seatPerRow) * (seatHeight + seatGap);
      const isInViewport =
        rectX >= mapPosition.x &&
        rectY >= mapPosition.y &&
        rectX + seatWidth <= svgWidth + mapPosition.x &&
        rectY + seatHeight <= svgHeight + mapPosition.y;

      return isInViewport;
    });

    setTickets(filteredSeats);
  }, [
    mapPosition,
    seatWidth,
    seatHeight,
    seatGap,
    seats,
    svgWidth,
    svgHeight,
    setTickets,
  ]);

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid black",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`${mapPosition.x} ${mapPosition.y} ${svgWidth} ${svgHeight}`}
        onMouseDown={handleDragStart}
        onWheel={(e) => e.preventDefault()}
      >
        {seats.map((seat, i) => {
          const rectX = (i % seatPerRow) * (seatWidth + seatGap);
          const rectY = Math.floor(i / seatPerRow) * (seatHeight + seatGap);

          const isInViewport =
            rectX >= mapPosition.x &&
            rectY >= mapPosition.y &&
            rectX + seatWidth <= svgWidth + mapPosition.x &&
            rectY + seatHeight <= svgHeight + mapPosition.y;

          if (isInViewport) {
            return (
              <g
                key={seat.title}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedSeats(seat.number);
                  console.log(`Clicked seat ${i + 1}`, seat);
                }}
              >
                <rect
                  key={i}
                  x={rectX}
                  y={rectY}
                  width={seatWidth}
                  height={seatHeight}
                  fill={selectedSeats.has(seat.number) ? "grey" : seat.zone}
                />
                <text
                  x={rectX + seatWidth / 2}
                  y={rectY + seatHeight / 2}
                  fill="white"
                  fontSize={12 * zoomLevel}
                >
                  {i + 1}
                </text>
              </g>
            );
          } else {
            return null;
          }
        })}
      </svg>
      <Actions handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />
    </div>
  );
};
