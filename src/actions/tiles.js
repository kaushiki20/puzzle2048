import * as ActionTypes from "./action-types";
import { v4 } from "node-uuid";
import flatten from "lodash.flatten";
import { delayPromise } from "../utils";

const getRandomCoordinate = (tiles) => {
  let emptyTiles = flatten(
    tiles.map((rows, i) =>
      rows.map((tile, j) => {
        if (tile) return null;
        return [i, j];
      })
    )
  ).filter((tile) => !!tile);

  if (emptyTiles.length) {
    let index = Math.floor(Math.random() * emptyTiles.length);
    let [row, col] = emptyTiles[index];
    return { row, col };
  }
  return null;
};

export const trackGame = (tile) => (dispatch, getState) => {
  const { tiles } = getState();

  const getTileAsParam = tile ? tile : tiles;
  dispatch({
    type: ActionTypes.TRACK_GAME,
    tile: getTileAsParam,
  });
};

export const gameRedo = () => (dispatch, getState) => {
  const { gameStep } = getState();

  dispatch({
    type: ActionTypes.REDO_MODE,
    redo: gameStep[gameStep.length - 1],
  });
};

export const newMove = () => (dispatch, getState) => {
  const { gameStep, scores } = getState();
  const { recentAddedScores } = scores;

  dispatch({
    type: ActionTypes.NEW_MOVE,
    newGameStep: gameStep.splice(0, gameStep.length - 1),
    recentAddedScores: recentAddedScores.splice(
      0,
      recentAddedScores.length - 1
    ),
  });
};

export const gameUndo = () => (dispatch, getState) => {
  const { gameStep } = getState();

  dispatch({
    type: ActionTypes.UNDO_MODE,
    undo: gameStep[gameStep.length - 2],
  });
};

export const ReplayEnd = () => (dispatch) => {
  dispatch({
    type: ActionTypes.REPLAY_MODE_END,
  });
};

export const gameReplay = () => (dispatch, getState) => {
  const { gameStep } = getState();
  if (gameStep.length > 1) {
    for (let i = 0; i < gameStep.length; i++) {
      setTimeout(() => {
        dispatch({
          type: ActionTypes.REPLAY_MODE,
          replay: gameStep[i],
        });
        if (gameStep.length - 1 === i) {
          dispatch(ReplayEnd());
        }
      }, i * 2000);
    }
  }
};

export const generateNewTile = () => (dispatch, getState) => {
  let { tiles } = getState();
  let coord = getRandomCoordinate(tiles);

  if (coord) {
    dispatch({
      type: ActionTypes.GENERATE_NEW_TILE,
      number: Math.random() > 0.8 ? 4 : 2,
      uuid: v4(),
      tiles,
      ...coord,
    });
    return true;
  }
  return false;
};

export const moveTile = (payload) => (dispatch) => {
  dispatch({
    type: ActionTypes.MOVE_TILE,
    ...payload,
  });
  return delayPromise(80).then(() => payload);
};

export const preMergeTile = (payload) => {
  return {
    type: ActionTypes.PRE_MERGE_TILE,
    ...payload,
  };
};

export const mergeTile = ({ row, col }) => {
  return {
    type: ActionTypes.MERGE_TILE,
    row,
    col,
  };
};

export const resetNewMergedTileTag = ({ row, col }) => {
  return {
    type: ActionTypes.RESET_NEW_MERGED_TILE_TAG,
    row,
    col,
  };
};

export const resetNewGeneratedTileTag = ({ row, col }) => {
  return {
    type: ActionTypes.RESET_NEW_GENERATED_TILE_TAG,
    row,
    col,
  };
};
