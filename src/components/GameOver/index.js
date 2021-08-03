import React from "react";

import { startNewGame } from "../../actions";
import { connect } from "react-redux";
import "./gameOver.css";

let GameOver = ({ dispatch }) => {
  return (
    <div className="game-over">
      <h1 className="title">Game Over!</h1>
      <button onClick={() => dispatch(startNewGame())}>Try Again</button>
    </div>
  );
};

export default connect()(GameOver);
