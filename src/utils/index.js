import Promise from "promise";

export const delayPromise = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const deepEach = (arr, fn) => arr.forEach((row) => row.forEach(fn));
