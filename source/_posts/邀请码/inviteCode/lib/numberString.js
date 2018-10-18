const items = [
  // '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd',
  'e', 'f', 'g',
  'h', 'i', 'j', 'k',
  'l', 'm', 'n',
  'o', 'p', 'q',
  'r', 's', 't',
  'u', 'v', 'w',
  'x', 'y', 'z'
];
function checkItemsUniq(items) {
  if ((new Set(items)).size !== items.length) {
    throw new Error('item duplicate');
  }
}
checkItemsUniq(items);

const itemLength = items.length;

function codeStringToNumber(codeString) {
  codeString = codeString + '';
  let number = 0;
  let codeStringReverseComp = codeString.split('').reverse();
  for (let i = 0; i < codeStringReverseComp.length; i++) {
    let item = codeStringReverseComp[i];
    let itemIndex = items.indexOf(item);
    number = number + itemIndex * Math.pow(itemLength, i);
    // console.log({item, itemIndex, number});
  }
  return number;
}

function numberToCodeString(codeNumber) {
  codeNumber = codeNumber * 1;
  if (codeNumber === 0) {
    return items[0];
  }
  let finalArray = [];
  for (let i = 0; codeNumber > 0; i++) {
    let itemIndex  = (codeNumber % Math.pow(itemLength, i + 1)) / Math.pow(itemLength, i);
    let item = items[itemIndex];
    finalArray[i] = item;
    codeNumber = codeNumber - itemIndex * Math.pow(itemLength, i);
    // console.log({item, itemIndex, codeNumber});
  }
  return finalArray.reverse().join('');
}

module.exports = {
  items,
  numberToCodeString,
  codeStringToNumber
};
