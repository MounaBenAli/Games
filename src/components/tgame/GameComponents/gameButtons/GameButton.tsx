import React from "react";
import "./gamebutton.css";

const GameButton = ({ value, clickFn }) => {
  return (
    <div className="gameButton" onClick={clickFn}>
      {value}
    </div>
  );
};
GameButton.displayName = "GameButton";
export default GameButton;
