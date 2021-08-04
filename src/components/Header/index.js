import React from "react";
import { connect } from "react-redux";
import { startNewGame } from "../../actions";
import { undoScore, redoScore } from "../../actions/scores";
import { gameUndo, gameRedo, gameReplay } from "../../actions/tiles";
import "./header.css";

const ScoreBox = ({ label, score, children }) => {
  return (
    <div className="score-box">
      <div className="score-label">{label}</div>
      <div className="score-content">{score}</div>
      {children}
    </div>
  );
};

const HeaderBox = (props) => {
  const handleUndo = () => {
    props.undoScore();
    props.gameUndo();
  };
  const handleRedo = () => {
    props.redoScore();
    props.gameRedo();
  };
  return (
    <div className="header-box">
      <h1 className="title">2048</h1>
      <ScoreBox score={props.score} label="SCORE"></ScoreBox>
      <ScoreBox score={props.bestScore} label="BEST" />
      <div className="desc-txt">
        <br />
        Join the numbers and get to the <span className="bold">2048 tile!</span>
      </div>
      <button onClick={handleUndo}>UNDO</button>
      <button onClick={handleRedo}>REDO</button>
      <button onClick={props.gameReplay}> REPLAY</button>
    </div>
  );
};

const mapStateToProps = ({ scores }) => scores;

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => dispatch(startNewGame()),
    gameUndo: () => dispatch(gameUndo()),
    gameRedo: () => dispatch(gameRedo()),
    gameReplay: () => dispatch(gameReplay()),
    undoScore: () => dispatch(undoScore()),
    redoScore: () => dispatch(redoScore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBox);
