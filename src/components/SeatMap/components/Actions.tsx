import React from "react";

import "./actions.css";

type ActionsProps = {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
};
export const Actions: React.FC<ActionsProps> = ({
  handleZoomIn,
  handleZoomOut,
}) => {
  return (
    <div className="zoom-controls">
      <button className="zoom-button zoom-in" onClick={handleZoomIn}>
        +
      </button>
      <button className="zoom-button zoom-out" onClick={handleZoomOut}>
        -
      </button>
    </div>
  );
};
