const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  'use strict';

  const {repeatTimes = 0, separator = '+', addition = '', additionRepeatTimes = 0, additionSeparator = '|'} = options;
  let string = (typeof(str) === 'string' || str === null) ? str : str.toString();
  if (str === null) {
    string = 'null';
  }
  let additionStr = (typeof(addition === 'string') || addition === null) ? addition : addition.toString();
  if (addition === null) {
    additionStr = 'null';
  }

  let completeAddition = [];
  for (let i = 0; i < additionRepeatTimes; i++) {
    completeAddition.push(additionStr);
  }
  completeAddition = (additionRepeatTimes === 0) ? additionStr : completeAddition.join(additionSeparator);

  if (repeatTimes === 0) {
    return string + completeAddition;
  }

  let result = [];

  for (let i = 0; i < repeatTimes; i++) {
    result.push(string + completeAddition);
  }

  return result.join(separator);
};
