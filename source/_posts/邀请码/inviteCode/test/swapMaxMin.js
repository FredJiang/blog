const numberToCodeString = require('../lib/numberString.js').numberToCodeString;
const swap = require('../lib/swap.js').swap;

let swapResultMin = 9999999999;
let swapResultMax = 0;
for (let i = 0; i <= 10000 * 50000; i++) {
  let swapResult =  swap(i);
  swapResultMin = Math.min(swapResult, swapResultMin);
  swapResultMax = Math.max(swapResult, swapResultMax);
}
console.log(swapResultMax);
console.log(swapResultMax === 2147483647);
console.log(numberToCodeString(swapResultMax) === 'gytisyx');
console.log(swapResultMin);
console.log(swapResultMin === 536870913);
console.log(numberToCodeString(swapResultMin) === 'btevrth');
