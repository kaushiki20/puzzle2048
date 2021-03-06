import React, { Component } from "react";
import GameBoard from "./GameBoard";
import Swipeable from "react-swipeable";
import { connect } from "react-redux";
import * as actions from "../actions";
import { deepEach } from "../utils";
import PropTypes from "prop-types";
class App extends Component {
  static propTypes = {
    startNewGame: PropTypes.func.isRequired,
    setGameOver: PropTypes.func.isRequired,
    generateNewTile: PropTypes.func.isRequired,
    moveChessBoard: PropTypes.func.isRequired,
    addScore: PropTypes.func.isRequired,
    updateBestScore: PropTypes.func.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    tiles: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    gameStep: PropTypes.array.isRequired,
    trackGame: PropTypes.func.isRequired,
    newMove: PropTypes.func.isRequired,
  };
  componentDidMount() {
    if (this.props.gameStep.length === 0) {
      this.props.startNewGame();
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSwiped = this.handleSwiped.bind(this);
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }
  componentDidUpdate(prevProps) {
    if (this.props.gameStep.length < 1) {
      this.props.trackGame(prevProps.tiles);
      this.props.addScore(0);
    }
  }
  handleKeyPress(ev) {
    let { key } = ev;

    if (!this.props.gameStarted) return;
    let match = key.toLowerCase().match(/arrow(up|right|down|left)/);
    if (match) {
      this.move(match[1]);
      if (this.props.mode === "undo") {
        this.props.newMove();
      }
      ev.preventDefault();
    }
  }

  handleSwiped(dir) {
    if (!this.props.gameStarted) return;

    this.move(dir);
    if (this.props.mode === "undo") {
      this.props.newMove();
    }
    return false;
  }

  move(dir) {
    if (this.isMoving) return;
    let { movingPromise, score } = this.props.moveChessBoard(dir);
    if (movingPromise) {
      this.isMoving = true;
      movingPromise.then(() => {
        this.props.addScore(score);

        this.isMoving = false;
        this.props.generateNewTile();
        this.checkGameStatus();
        this.props.trackGame();
      });
    }
  }

  isMovable() {
    let movable = false;
    let { tiles, size } = this.props;
    // check each tile,
    // if there is any empty tile, sets movable to true
    // if there is any adjacent tile which has the same number, sets movable to true
    deepEach(tiles, (tile) => {
      if (movable) return; // break;
      if (!tile) {
        movable = true;
        return;
      }
      let { row: i, col: j } = tile;
      if (i < size - 1) {
        let bottomTile = tiles[i + 1][j];
        if (bottomTile && bottomTile.number === tile.number) {
          movable = true;
          return;
        }
      }

      if (j < size - 1) {
        let rightTile = tiles[i][j + 1];
        if (rightTile && rightTile.number === tile.number) {
          movable = true;
          return;
        }
      }
    });

    return movable;
  }

  checkGameStatus() {
    if (!this.isMovable()) {
      // game over
      this.props.updateBestScore(this.props.score);
      this.props.setGameOver();
    }
  }

  render() {
    let swipeOptions = ["up", "right", "down", "left"].reduce(
      (options, dir) => {
        let propName = `on-swiped-${dir}`.replace(/-(\w)/g, ($0, $1) =>
          $1.toUpperCase()
        );

        options[propName] = this.handleSwiped.bind(this, dir);
        return options;
      },
      {}
    );

    return (
      <Swipeable {...swipeOptions} preventDefaultTouchmoveEvent>
        <GameBoard />
      </Swipeable>
    );
  }
}

const mapStateToProps = (state, prevProps) => {
  return {
    size: state.size,
    tiles: state.tiles,
    score: state.scores.score,
    gameStarted: state.gameStatus === "playing",
    gameStep: state.gameStep,
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => dispatch(actions.startNewGame()),
    setGameOver: () => dispatch(actions.setGameOver()),
    generateNewTile: () => dispatch(actions.generateNewTile()),
    moveChessBoard: (dir) => dispatch(actions.moveChessBoard(dir)),
    addScore: (score) => dispatch(actions.addScore(score)),
    updateBestScore: (score) => dispatch(actions.updateBestScore(score)),
    trackGame: () => dispatch(actions.trackGame()),
    newMove: () => dispatch(actions.newMove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
