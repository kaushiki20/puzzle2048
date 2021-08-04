import * as ActionTypes from "./action-types";
import { v4 } from "node-uuid";

export const addScore = (score) => {
  return {
    type: ActionTypes.ADD_SCORE,
    id: v4(),
    score,
  };
};

export const undoScore = () => (dispatch, getState) => {
  const { scores } = getState();
  const { recentAddedScores } = scores;
  dispatch({
    type: ActionTypes.UNDO_SCORE,
    score: recentAddedScores[recentAddedScores.length - 1].score,
  });
};

export const redoScore = () => (dispatch, getState) => {
  const { scores } = getState();
  const { recentAddedScores } = scores;

  dispatch({
    type: ActionTypes.REDO_SCORE,
    score: recentAddedScores[recentAddedScores.length - 1].score,
  });
};

export const replayScore = () => (dispatch, getState) => {
  const { scores } = getState();
  const { recentAddedScores } = scores;
  if (recentAddedScores.length > 1) {
    for (let i = 0; i < recentAddedScores.length; i++) {
      setTimeout(() => {
        dispatch({
          type: ActionTypes.REPLAY_SCORE,
          index: i,
          score: recentAddedScores[i].score,
        });
      }, i * 2000);
    }
  }
};

export const cleanRecentAddedScore = (id) => {
  return {
    type: ActionTypes.CLEAN_RECENT_ADDED_SCORE,
    id,
  };
};

export const updateBestScore = (score) => (dispatch, getState) => {
  let {
    scores: { bestScore },
  } = getState();
  bestScore = Math.max(bestScore, score);
  localStorage.setItem("bestScore", bestScore);

  dispatch({
    type: ActionTypes.UPDATE_BEST_SCORE,
    bestScore,
  });
};
