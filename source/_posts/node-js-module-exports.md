---
title: node.js module exports
date: 2017-04-16 10:01:01
tags: [node.js, module, exports]
---


calculator.js

```
//(function(exports, require, module, __filename, __dirname) {

console.log('----------calculator.js');
console.log(exports)
console.log(module)

//})
```


app-use-calculator.js


```
const calculator = require("./calculator.js");

console.log('----------app-use-calculator.js');
console.log(calculator)
```

<!--more-->



```
➜  moduletest node app-use-calculator.js
----------calculator.js
{}
Module {
  id: '/home/fred/moduletest/calculator.js',
  exports: {},
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/fred/moduletest/app-use-calculator.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/home/fred/moduletest/node_modules',
        '/home/fred/node_modules',
        '/home/node_modules' ] },
  filename: '/home/fred/moduletest/calculator.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/fred/moduletest/node_modules',
     '/home/fred/node_modules',
     '/home/node_modules' ] }
----------app-use-calculator.js
{}
```

注意上面的 `exports` 和 `module.exports` 以及 `app-use-calculator.js` 打印的内容


修改 calculator.js

```
//(function(exports, require, module, __filename, __dirname) {

exports.add = (a, b) => a + b;
console.log('----------calculator.js');
console.log(exports)
console.log(module)

//})
```

```
➜  moduletest node app-use-calculator.js
----------calculator.js
{ add: [Function] }
Module {
  id: '/home/fred/moduletest/calculator.js',
  exports: { add: [Function] },
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/fred/moduletest/app-use-calculator.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/home/fred/moduletest/node_modules',
        '/home/fred/node_modules',
        '/home/node_modules' ] },
  filename: '/home/fred/moduletest/calculator.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/fred/moduletest/node_modules',
     '/home/fred/node_modules',
     '/home/node_modules' ] }
----------app-use-calculator.js
{ add: [Function] }
```


修改 calculator.js

```
//(function(exports, require, module, __filename, __dirname) {

module.exports.sub = (a, b) => a - b;
console.log('----------calculator.js');
console.log(exports)
console.log(module)

//})
```

```
➜  moduletest node app-use-calculator.js
----------calculator.js
{ sub: [Function] }
Module {
  id: '/home/fred/moduletest/calculator.js',
  exports: { sub: [Function] },
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/fred/moduletest/app-use-calculator.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/home/fred/moduletest/node_modules',
        '/home/fred/node_modules',
        '/home/node_modules' ] },
  filename: '/home/fred/moduletest/calculator.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/fred/moduletest/node_modules',
     '/home/fred/node_modules',
     '/home/node_modules' ] }
----------app-use-calculator.js
{ sub: [Function] }
```





修改 calculator.js

```
//(function(exports, require, module, __filename, __dirname) {

module.exports.sub = (a, b) => a - b;
exports.add = (a, b) => a + b;
console.log('----------calculator.js');
console.log(exports)
console.log(module)

//})
```

```
➜  moduletest node app-use-calculator.js
----------calculator.js
{ sub: [Function], add: [Function] }
Module {
  id: '/home/fred/moduletest/calculator.js',
  exports: { sub: [Function], add: [Function] },
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/fred/moduletest/app-use-calculator.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/home/fred/moduletest/node_modules',
        '/home/fred/node_modules',
        '/home/node_modules' ] },
  filename: '/home/fred/moduletest/calculator.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/fred/moduletest/node_modules',
     '/home/fred/node_modules',
     '/home/node_modules' ] }
----------app-use-calculator.js
{ sub: [Function], add: [Function] }
```


结论：

* exports 和 module.exports 一样
* require 得到的是 module.exports（嗯，不是 exports，后面给出实验）

修改 calculator.js

```
//(function(exports, require, module, __filename, __dirname) {

exports = {
    "replaced": "exports"
}

console.log('----------calculator.js');
console.log(exports)
console.log(module)

//})
```


```
➜  moduletest node app-use-calculator.js
----------calculator.js
{ replaced: 'exports' }
Module {
  id: '/home/fred/moduletest/calculator.js',
  exports: {},
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/fred/moduletest/app-use-calculator.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/home/fred/moduletest/node_modules',
        '/home/fred/node_modules',
        '/home/node_modules' ] },
  filename: '/home/fred/moduletest/calculator.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/fred/moduletest/node_modules',
     '/home/fred/node_modules',
     '/home/node_modules' ] }
----------app-use-calculator.js
{}
```

修改 calculator.js

```
//(function(exports, require, module, __filename, __dirname) {

module.exports = {
    "replaced": "module.exports"
}

console.log('----------calculator.js');
console.log(exports)
console.log(module)

//})
```

```
➜  moduletest node app-use-calculator.js
----------calculator.js
{}
Module {
  id: '/home/fred/moduletest/calculator.js',
  exports: { replaced: 'module.exports' },
  parent:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/home/fred/moduletest/app-use-calculator.js',
     loaded: false,
     children: [ [Circular] ],
     paths:
      [ '/home/fred/moduletest/node_modules',
        '/home/fred/node_modules',
        '/home/node_modules' ] },
  filename: '/home/fred/moduletest/calculator.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/fred/moduletest/node_modules',
     '/home/fred/node_modules',
     '/home/node_modules' ] }
----------app-use-calculator.js
{ replaced: 'module.exports' }
```


参考

* <https://blog.tableflip.io/the-difference-between-module-exports-and-exports/>
* <https://www.hacksparrow.com/node-js-exports-vs-module-exports.html>