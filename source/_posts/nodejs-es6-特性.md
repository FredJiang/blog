---
title: nodejs es6 特性
date: 2016-04-22 16:01:15
tags: [node.js, es, V8, javascript]
---

Node.js 是在 [V8](https://developers.google.com/v8/) 的基础上建立的。所以 V8 支持的 ES 特性，Node.js 的最新版一般都支持。

ECMAScript 2015 (ES6) 特性被分为 3 类，分别为 shipping、staged 和 in progress

* shipping：稳定的，在 Node.js 里面默认打开，不需要加任何的 runtime flag
* staged：基本已完成，还不够稳定，需要 runtime flag `--es_staging` 或 `--harmony` 来开启
* in progress：用 `--harmony_destructuring` 打开，不推荐使用

<!--more-->

ES6 中的哪些特性在 Node.js 是 shipping 的呢？

* Block scoping
	* [let (strict mode only)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
	* [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
	* function-in-blocks (strict mode only [1])
* Classes (strict mode only)
* Collections
	* Map
	* WeakMap
	* Set
	* WeakSet
* Typed arrays
* Generators
* Binary and Octal literals
* Object literal extensions (shorthand properties and methods)
* [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* New String methods
* Symbols
* Template strings
* Arrow Functions
* new.target [2]
* Object.assign
* Spread operator [2]


上面的特性的具体用法可到 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference> 查询


更详细的列表可以查看 <https://kangax.github.io/compat-table/es6/>


查看 Node.js 的 V8 版本

```
node -p process.versions.v8
```

[参考](https://nodejs.org/en/docs/es6/)