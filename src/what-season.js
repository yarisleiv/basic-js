const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {
  'use strict';

  if (!date) {
    return 'Unable to determine the time of year!';
  }

  if (Object.prototype.toString.call(date) !== "[object Date]" || isNaN(date)) {
    throw new Error('date argument is invalid');
  }

  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return 'spring';
  } else if (month >= 5 && month <= 7) {
    return 'summer';
  } else if (month >= 8 && month <= 10) {
    return 'autumn';
  } else {
    return 'winter';
  }
};
