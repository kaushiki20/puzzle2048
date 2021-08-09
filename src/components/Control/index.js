import React from "react";
import PropTypes from "prop-types";
import { startNewGame } from "../../actions";
import { gameUndo, gameRedo, gameReplay } from "../../actions/tiles";
import { connect } from "react-redux";
import RedoImg from "./assets/redo.png";
import ReplayImg from "./assets/replay.png";
import ResetImg from "./assets/reset.png";
import UndoImg from "./assets/undo.png";
import "./control.css";

const Control = (props) => {
  let undoCondition =
    props.gameStep.length < 2 ||
    props.mode === "replay" ||
    props.gameStatus === "over";

  let replayCondition =
    props.gameStep.length < 2 ||
    props.mode === "replay" ||
    props.gameStatus === "over";

  let redoCondition = props.mode !== "undo" || props.mode === "replay";

  const handleUndo = () => {
    props.gameUndo();
  };
  const handleRedo = () => {
    props.gameRedo();
  };
  const handleReplay = () => {
    props.gameReplay();
  };

  return (
    <div className="control-box">
      <div className="controls">
        <button
          disabled={undoCondition}
          onClick={handleUndo}
          className="control"
        >
          <img src={UndoImg} alt="Undo" className="button-icon" />
          <div className="button-label">Undo</div>
        </button>
        <button
          disabled={replayCondition}
          onClick={handleReplay}
          className="control"
        >
          <img src={ReplayImg} alt="Replay" className="button-icon" />
          <div className="button-label">Replay</div>
        </button>
        <button
          disabled={redoCondition}
          onClick={handleRedo}
          className="control"
        >
          <img src={RedoImg} alt="Redo" className="button-icon" />
          <div className="button-label">Redo</div>
        </button>
        <button onClick={props.startNewGame} className="control">
          <img src={ResetImg} alt="Reset" className="button-icon" />
          <div className="button-label">Reset</div>
        </button>
      </div>
    </div>
  );
};

Control.propTypes = {
  gameStep: PropTypes.array.isRequired,
  gameStatus: PropTypes.string.isRequired,
  startNewGame: PropTypes.func.isRequired,
  gameUndo: PropTypes.func.isRequired,
  gameRedo: PropTypes.func.isRequired,
  gameReplay: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameStep: state.gameStep,
    mode: state.mode,
    gameStatus: state.gameStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => dispatch(startNewGame()),
    gameUndo: () => dispatch(gameUndo()),
    gameRedo: () => dispatch(gameRedo()),
    gameReplay: () => dispatch(gameReplay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
