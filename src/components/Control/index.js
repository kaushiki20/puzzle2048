import React from "react";
import { startNewGame } from "../../actions";
import { undoScore, redoScore, replayScore } from "../../actions/scores";
import { gameUndo, gameRedo, gameReplay } from "../../actions/tiles";
import { connect } from "react-redux";
import RedoImg from "./assets/redo.png";
import ReplayImg from "./assets/replay.png";
import ResetImg from "./assets/reset.png";
import UndoImg from "./assets/undo.png";
import "./control.css";
import usePrevious from "../../utils/UsePrevious";
const Control = (props) => {
  const prevMode = usePrevious(props.mode);

  const handleUndo = () => {
    props.undoScore();
    props.gameUndo();
  };
  const handleRedo = () => {
    props.redoScore();
    props.gameRedo();
  };
  const handleReplay = () => {
    props.replayScore();
    props.gameReplay();
  };

  return (
    <div className="control-box">
      <div className="controls">
        <button
          disabled={props.gameStep.length < 1}
          onClick={handleUndo}
          className="control"
        >
          <img src={UndoImg} alt="Undo" className="button-icon" />
          <div className="button-label">Undo</div>
        </button>
        <button
          disabled={props.gameStep.length < 1}
          onClick={handleReplay}
          className="control"
        >
          <img src={ReplayImg} alt="Replay" className="button-icon" />
          <div className="button-label">Replay</div>
        </button>
        <button
          disabled={!!props.gameStep.length < 1 && prevMode !== "undo"}
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

const mapStateToProps = (state) => {
  return {
    gameStep: state.gameStep,
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => dispatch(startNewGame()),
    gameUndo: () => dispatch(gameUndo()),
    gameRedo: () => dispatch(gameRedo()),
    gameReplay: () => dispatch(gameReplay()),
    undoScore: () => dispatch(undoScore()),
    redoScore: () => dispatch(redoScore()),
    replayScore: () => dispatch(replayScore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
