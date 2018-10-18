const numberToCodeString = require('./lib/numberString.js').numberToCodeString;
const items = require('./lib/numberString.js').items;
const itemsLength = items.length;
const swap = require('./lib/swap.js').swap;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInviteCodeString(number, disableRandomChar) {
  let codeString = numberToCodeString(swap(number));
  if (!disableRandomChar) {
    let randomChar = items[getRandomInt(0, itemsLength)];
    codeString = randomChar + '' + codeString;
  }
  return codeString.toUpperCase();
}

module.exports = {
  getInviteCodeString
};
