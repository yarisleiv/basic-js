const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  'use strict';

  if (!matrix || !matrix[0]) {
    return 0;
  }

  const x = matrix[0].length;
  const y = matrix.length;

  let result = 0;

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (matrix[i][j] === '^^') {
        result++;
      }
    }
  }

  return result;
};
