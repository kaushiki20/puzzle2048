import React from "react";
import PropTypes from "prop-types";
import { startNewGame } from "../../actions";
import { connect } from "react-redux";
import "./gameOver.css";

let GameOver = ({ startNewGame }) => {
  return (
    <div className="game-over">
      <h1 className="title">Game Over!</h1>
      <button onClick={startNewGame}>Try Again</button>
    </div>
  );
};
GameOver.propTypes = {
  startNewGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => dispatch(startNewGame()),
  };
};
export default connect(null, mapDispatchToProps)(GameOver);
