import * as ActionTypes from "../actions/action-types";
import { combineReducers } from "redux";
import scores from "./scores";
import tiles from "./tiles";

const gameStatus = (state = "over", action) => {
  switch (action.type) {
    case ActionTypes.START_NEW_GAME:
      return "playing";
    case ActionTypes.GAME_OVER:
      return "over";
    default:
      return state;
  }
};

const gameStep = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.TRACK_GAME:
      return [...state, action.tile];

    case ActionTypes.UNDO_MODE:
      return state.pop();
    default:
      return state;
  }
};

export default combineReducers({
  size: () => 4,
  scores,
  tiles,
  gameStatus,
  gameStep,
});
