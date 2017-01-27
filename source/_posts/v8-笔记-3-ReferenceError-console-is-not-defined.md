---
title: 'v8 笔记 3 -- ReferenceError: console is not defined'
date: 2017-01-27 00:02:04
tags: [v8]
---

先看一段代码

```
d8> console.log("hello");
(d8):1: ReferenceError: console is not defined
console.log("hello");
^
ReferenceError: console is not defined
    at (d8):1:1

d8> print("hello");
hello
undefined
d8>
```

居然报了一个 `ReferenceError: console is not defined` 错。没有 console？

<!--more-->

答案在下面两个连接中

* <https://github.com/sameeri/JavaScript-WithLove/wiki/JavaScript-Shells>
* <https://github.com/sameeri/JavaScript-WithLove/wiki/d8>