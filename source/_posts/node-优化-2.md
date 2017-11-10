---
title: node 优化 2
date: 2017-11-08 18:01:52
tags: [node.js, optimize, wrk, perf, benchmark]
---

参考

《Node Cookbook 3rd Edition》

<!--more-->

```
mkdir sync-opt
cd sync-opt
npm init -y
npm install --save-dev benchmark
```

cat slow.js

```
function divideByAndSum(num, array) {
  try {
    array.map(function (item) {
      return item / num;
    }).reduce(function (acc, item) {
      return acc + item;
    }, 0);
  } catch (err) {
    // to guard for division by zero
    return 0;
  }
}

module.exports = divideByAndSum;
```

cat initial-bench.js

```
const benchmark = require('benchmark');
const slow = require('./slow');
const suite = new benchmark.Suite();

const numbers = [];

for (let i = 0; i < 1000; i++) {
  numbers.push(Math.random() * i);
}

suite.add('slow', function () {
  slow(12, numbers);
});

suite.on('complete', print);

suite.run();

function print() {
  for (var i = 0; i < this.length; i++) {
    console.log(this[i].toString());
  }

  console.log('Fastest is', this.filter('fastest').map('name')[0]);
}
```

`node initial-bench.js`

`node --trace-inlining initial-bench.js`

`/usr/bin/sudo /home/nodeuser/.nvm/versions/node/v6.2.2/bin/0x initial-bench.js`




cat no-collections.js

```
function divideByAndSum(num, array) {
  var result = 0;
  try {
    for (var i = 0; i < array.length; i++) {
      result += array[i] / num;
    }
  } catch (err) {
    // to guard for division by zero
    return 0;
  }
}
module.exports = divideByAndSum;
```


cat bench.js

```
const benchmark = require('benchmark');
const slow = require('./slow');
const noCollection = require('./no-collections');
const suite = new benchmark.Suite();

const numbers = [];

for (let i = 0; i < 1000; i++) {
  numbers.push(Math.random() * i);
}

suite.add('slow', function () {
  slow(12, numbers);
});

suite.add('no-collections', function () {
  noCollection(12, numbers);
});

suite.on('complete', print);

suite.run();

function print() {
  for (var i = 0; i < this.length; i++) {
    console.log(this[i].toString());
  }
  console.log('Fastest is', this.filter('fastest').map('name')[0]);
}
```

`node bench.js`