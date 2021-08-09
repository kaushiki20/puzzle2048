import React from "react";
import Header from "../Header";
import PropTypes from "prop-types";
import GameOver from "../GameOver";
import Tiles from "../Tiles";
import { connect } from "react-redux";
import Control from "../Control";
import "./gameBoard.css";

const BackgroundGrids = ({ size }) => {
  let row = (i) => {
    return new Array(size)
      .fill()
      .map((_, j) => (
        <div className="grid-cell" key={`grid-cell-${i * size + j}`}></div>
      ));
  };
  let grids = new Array(size).fill().map((_, i) => row(i));

  return <div className="grid-container">{grids}</div>;
};
BackgroundGrids.propTypes = {
  size: PropTypes.number.isRequired,
};

const GameBoard = (props) => (
  <div className="game-board">
    <Header />

    <div className="game-box">
      <BackgroundGrids size={props.size} />

      <Tiles />
      {props.gameOver && <GameOver />}
    </div>
    <Control />
  </div>
);

GameBoard.propTypes = {
  size: PropTypes.number.isRequired,
  gameOver: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
  return {
    size: state.size,
    gameOver: state.gameStatus === "over",
  };
};

export default connect(mapStateToProps)(GameBoard);
