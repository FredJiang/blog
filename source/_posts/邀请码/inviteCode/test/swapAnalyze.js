const getBinaryString = (n) => {
  let maxLength = 64;
  let componentLength = maxLength / 8;
  let binaryString = n.toString(2);
  binaryString = (new Array(maxLength - binaryString.length + 1).join('0') + binaryString);
  let binaryStringWithSpace = '';
  for (let i = 0; i < maxLength; i += componentLength) {
    binaryStringWithSpace = binaryStringWithSpace + (binaryStringWithSpace ? ' ' : '') + binaryString.substr(i, componentLength);
  }
  return binaryStringWithSpace;
};

// Math.random() * 0x7FFFFFFF
const base = {
  0  : 1893274973 | 0x20000000,
  1  : 778459911 | 0x20000000,
  2  : 1626806752 | 0x20000000,
  3  : 1267116246 | 0x20000000,
  16 : 109020924 | 0x20000000,
  17 : 1742652622 | 0x20000000,
  18 : 312356055 | 0x20000000,
  19 : 2094271335 | 0x20000000
};
console.log(getBinaryString(0x7FFFFFFF), 0x7FFFFFFF, '0x7FFFFFFF');
console.log(getBinaryString(base[0]), base[0], 'base[0]');
console.log(getBinaryString(base[1]), base[1], 'base[1]');
console.log(getBinaryString(base[2]), base[2], 'base[2]');
console.log(getBinaryString(base[3]), base[3], 'base[3]');
console.log(getBinaryString(base[16]), base[16], 'base[16]');
console.log(getBinaryString(base[17]), base[17], 'base[17]');
console.log(getBinaryString(base[18]), base[18], 'base[18]');
console.log(getBinaryString(base[19]), base[19], 'base[19]');
console.log('');

const mask = 19; // 1 + 2 + 16

function swap(n) {
  n = parseInt(n, 10);
  let idx = n & mask;// 取出标志位

  console.log(getBinaryString(n), n, 'n');
  console.log(getBinaryString(mask), mask, 'mask');
  console.log(getBinaryString(n & mask), n & mask, 'n & mask', '// 取出标志位', '>>> n & mask');
  console.log(getBinaryString(idx), idx, 'idx', '// 取出标志位', '>>> n & mask');
  console.log('');

  let xor = base[idx] ^ n;// 根据标识为找到对应的base，异或n

  console.log(getBinaryString(base[idx]), base[idx], 'base[idx]', `base[${idx}]`);
  console.log(getBinaryString(n), n, 'n');
  console.log(getBinaryString(xor), xor, 'xor', '// 根据标识为找到对应的base，异或n', '>>> base[idx] ^ n');
  console.log('');

  console.log(getBinaryString(mask), mask, 'mask');
  console.log(getBinaryString(xor), xor, 'xor');
  console.log(getBinaryString((xor | mask)), (xor | mask), '(xor | mask)', '// 覆盖标识位');
  console.log('');

  console.log(getBinaryString(mask), mask, 'mask');
  console.log(getBinaryString((xor | mask) ^ mask), (xor | mask) ^ mask, '(xor | mask) ^ mask', '// 覆盖标识位');
  console.log('');

  console.log(getBinaryString(idx), idx, 'idx');
  console.log(getBinaryString(((xor | mask) ^ mask) | idx), ((xor | mask) ^ mask) | idx, '((xor | mask) ^ mask) | idx', '// 覆盖标识位');

  console.log('');
  console.log(getBinaryString(n), n, 'n');
  console.log(getBinaryString(base[idx]), base[idx], 'base[idx]');
  console.log('');

  return ((xor | mask) ^ mask) | idx;// 覆盖标识位
}

console.log(swap(200011));
