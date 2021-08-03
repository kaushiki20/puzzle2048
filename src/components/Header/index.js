import React from "react";
import { connect } from "react-redux";
import { cleanRecentAddedScore, startNewGame } from "../../actions";
import { gameUndo, gameRedo } from "../../actions/tiles";
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
  return (
    <div className="header-box">
      <h1 className="title">2048</h1>
      <ScoreBox score={props.score} label="SCORE">
        {/* {props.recentAddedScores.map((score) => (
          <div
            className="addition-score"
            key={score.id}
            onAnimationEnd={(e) => props.onAnimationEnd(score.id)}
          >
            +{score.score}
          </div>
        ))} */}
      </ScoreBox>
      <ScoreBox score={props.bestScore} label="BEST" />
      <div className="desc-txt">
        <br />
        Join the numbers and get to the <span className="bold">2048 tile!</span>
      </div>
      <button onClick={props.gameUndo}>UNDO</button>
      <button onClick={props.gameRedo}>REDO</button>
    </div>
  );
};

const mapStateToProps = ({ scores }) => scores;

const mapDispatchToProps = (dispatch) => {
  return {
    // onAnimationEnd: (id) => dispatch(cleanRecentAddedScore(id)),
    startNewGame: () => dispatch(startNewGame()),
    gameUndo: () => dispatch(gameUndo()),
    gameRedo: () => dispatch(gameRedo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBox);
