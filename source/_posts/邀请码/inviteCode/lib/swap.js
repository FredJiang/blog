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

const mask = 19; // 1 + 2 + 16

function swap(n) {
  n = parseInt(n, 10);
  let idx = n & mask;// 取出标志位
  let xor = base[idx] ^ n;// 根据标识为找到对应的base，异或n
  return ((xor | mask) ^ mask) | idx;// 覆盖标识位
}

module.exports = {
  swap
};
