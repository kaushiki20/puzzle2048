import * as ActionTypes from "../actions/action-types";
import { combineReducers } from "redux";
import scores from "./scores";
import { tiles, gameStep } from "./tiles";

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

const mode = (state = "null", action) => {
  switch (action.type) {
    case ActionTypes.REPLAY_MODE:
      return "replay";
    case ActionTypes.UNDO_MODE:
      return "undo";
    case ActionTypes.REDO_MODE:
      return "redo";
    case ActionTypes.NEW_MOVE:
      return null;
    case ActionTypes.REPLAY_MODE_END:
      return null;
    case ActionTypes.START_NEW_GAME:
    case ActionTypes.GAME_OVER:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  size: () => 4,
  scores,
  tiles,
  gameStep,
  gameStatus,
  mode,
});
