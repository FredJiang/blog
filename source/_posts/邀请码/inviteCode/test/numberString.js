const numberToCodeString = require('../lib/numberString.js').numberToCodeString;
const codeStringToNumber = require('../lib/numberString.js').codeStringToNumber;

console.log(numberToCodeString(0) === 'a');
console.log(codeStringToNumber('aaaaaaaa') === 0);
console.log(0x7FFFFFFF === 2147483647);
console.log(numberToCodeString(0x7FFFFFFF) === 'gytisyx');
console.log(codeStringToNumber('gytisyx') === 0x7FFFFFFF);

// // 将 items 换成 36 进制的，用系统自动的转换方法测
// console.log('codeStringToNumber');
// console.log(codeStringToNumber('1bj1'), parseInt('1bj1', 36));
// for (let i = 0; i <= 10000 * 5000; i++) {
//   let buildInString = parseInt(i).toString(36);
//   if (codeStringToNumber(buildInString) !== i) {
//     console.log(i, codeStringToNumber(i), buildInString);
//   }
// }

// // 将 items 换成 36 进制的，用系统自动的转换方法测
// console.log('numberToCodeString');
// console.log(numberToCodeString(1847), parseInt(1847).toString(36));
// for (let i = 0; i <= 10000 * 5000; i++) {
//   let buildInString = parseInt(i).toString(36);
//   if (numberToCodeString(i) !== buildInString) {
//     console.log(i, numberToCodeString(i), buildInString);
//   }
// }
