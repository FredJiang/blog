const getInviteCodeString = require('../inviteCode.js').getInviteCodeString;

console.log(getInviteCodeString(0));
console.log(getInviteCodeString(1));

// let getInviteCodeStringMap  = {};
// const getInviteCodeStringMapLengthMax = 10000 * 1000;

// for (let i = 0; i <= getInviteCodeStringMapLengthMax; i++) {
//   let inviteCodeString = getInviteCodeString(i, true);
//   getInviteCodeStringMap[inviteCodeString] = i;
//   if (inviteCodeString.length !== 7) {
//     console.log(i, '!== 7');
//   }
// }

// const getInviteCodeStringMapLength = Object.keys(getInviteCodeStringMap).length;

// if (getInviteCodeStringMapLength <= 100) {
//   console.log(getInviteCodeStringMap);
// }

// console.log(getInviteCodeStringMapLength);
// console.log(getInviteCodeStringMapLength === getInviteCodeStringMapLengthMax + 1);
