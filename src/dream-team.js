const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  'use strict';

  if (!Array.isArray(members)) {
    return false;
  }

  const stringArray = members.filter((member) => typeof(member) === 'string');

  let lettersArray = [];

  stringArray.forEach((member) => {
    lettersArray.push(member.match(/\b[a-zA-Z]/)[0].toUpperCase());
  });

  return lettersArray.sort().join('');
};
