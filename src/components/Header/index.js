import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

ScoreBox.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const HeaderBox = (props) => {
  return (
    <div className="header-box">
      <h1 className="title">2048</h1>
      <ScoreBox score={props.score} label="SCORE"></ScoreBox>
      <ScoreBox score={props.bestScore} label="BEST" />
      <div className="desc-txt">
        <br />
        Join the numbers and get to the <span className="bold">2048 tile!</span>
      </div>
    </div>
  );
};

HeaderBox.propTypes = {
  bestScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ scores }) => scores;

export default connect(mapStateToProps, null)(HeaderBox);
