const swap = require('../lib/swap.js').swap;

let swapMap  = {};
const swapMapLengthMax = 10000 * 1000;

for (let i = 0; i <= swapMapLengthMax; i++) {
  swapMap[swap(i)] = i;
}

const swapMapLength = Object.keys(swapMap).length;

if (swapMapLength <= 100) {
  console.log(swapMap);
}

console.log(swapMapLength);
console.log(swapMapLength === swapMapLengthMax + 1);
