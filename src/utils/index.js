import Promise from "promise";
import flatten from "lodash.flatten";

export const delayPromise = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const deepEach = (arr, fn) => arr.forEach((row) => row.forEach(fn));

export const flattenTiles = (tiles) => {
  let flatTiles = [];
  flatten(tiles)
    .filter((tile) => !!tile)
    .forEach((tile) => {
      flatTiles.push(tile);
      if (tile.tileToMerge) {
        flatTiles.push(tile.tileToMerge);
      }
    });

  return flatTiles.sort((tile1, tile2) => (tile1.uuid > tile2.uuid ? 1 : -1));
};
