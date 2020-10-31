const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  'use strict';

  if (!Array.isArray(arr)) {
    throw new Error('Not Array!');
  }

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '--discard-next') {
      if ((i + 1) < arr.length) {
        i++;
        continue;
      } else {
        break;
      }
    }

    if (arr[i] === '--discard-prev') {
      if ((i - 1) >= 0 && arr[i - 2] !== '--discard-next') {
        result.pop();
        continue;
      } else {
        continue;
      }
    }

    if (arr[i] === '--double-next') {
      if ((i + 1) < arr.length) {
        result.push(arr[i + 1]);
        continue;
      } else {
        break;
      }
    }

    if (arr[i] === '--double-prev') {
      if ((i - 1) >= 0 && arr[i - 2] !== '--discard-next') {
        result.push(arr[i - 1]);
        continue;
      } else {
        continue;
      }
    }

    result.push(arr[i]);
  }

  return result;
};