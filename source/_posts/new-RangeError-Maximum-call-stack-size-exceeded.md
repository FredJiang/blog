---
title: 'new RangeError: Maximum call stack size exceeded'
date: 2017-04-06 18:03:24
tags: [node.js]
---

以下代码


```
let count = 0;

function xxx() {
  console.log(count++)
  xxx()
}
xxx()
```

报错

`RangeError: Maximum call stack size exceeded`

<!--more-->

以下三种方式不报错

```
let count = 0;

function xxx() {
  setTimeout(function () {
    console.log(count++)
    xxx()
  }, 0)
}
xxx()
```


```
let count = 0;

function xxx() {
  console.log(count++)
  process.nextTick(xxx);
}
xxx()
```


```
let count = 0;

function xxx() {
  console.log(count++)
  setImmediate(xxx)
}
xxx()
```

参考

* <http://stackoverflow.com/questions/20936486/node-js-maximum-call-stack-size-exceeded>

You should wrap your recursive function call into a

* setTimeout
* setImmediate
* process.nextTick

function to give node.js the chance to clear the stack. If you don't do that and there are many loops without any real async function call or if you do not wait for the callback, your `RangeError: Maximum call stack size exceeded` will be inevitable.

* <https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/>


To achieve this, the JS call stack is allowed to unwind then immediately execute the provided callback which allows a person to make recursive calls to `process.nextTick()` without reaching a `RangeError: Maximum call stack size exceeded from v8.`


看下栈信息

```
let count = 0;

function xxx() {
  console.log(count++)
  console.log('show me the stack', new Error())
  if (count < 6) {
    xxx()
  }

}
xxx()
```


```
➜  Desktop node xxx.js
0
show me the stack Error
    at xxx (/Users/Fred/Desktop/xxx.js:5:36)
    at Object.<anonymous> (/Users/Fred/Desktop/xxx.js:11:1)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Module.runMain (module.js:575:10)
    at run (node.js:348:7)
    at startup (node.js:140:9)
1
show me the stack Error
    at xxx (/Users/Fred/Desktop/xxx.js:5:36)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at Object.<anonymous> (/Users/Fred/Desktop/xxx.js:11:1)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Module.runMain (module.js:575:10)
    at run (node.js:348:7)
2
show me the stack Error
    at xxx (/Users/Fred/Desktop/xxx.js:5:36)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at Object.<anonymous> (/Users/Fred/Desktop/xxx.js:11:1)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Module.runMain (module.js:575:10)
3
show me the stack Error
    at xxx (/Users/Fred/Desktop/xxx.js:5:36)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at Object.<anonymous> (/Users/Fred/Desktop/xxx.js:11:1)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
4
show me the stack Error
    at xxx (/Users/Fred/Desktop/xxx.js:5:36)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at Object.<anonymous> (/Users/Fred/Desktop/xxx.js:11:1)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
5
show me the stack Error
    at xxx (/Users/Fred/Desktop/xxx.js:5:36)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at xxx (/Users/Fred/Desktop/xxx.js:7:5)
    at Object.<anonymous> (/Users/Fred/Desktop/xxx.js:11:1)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
```


以上信息，重点看 `at xxx (/Users/Fred/Desktop/xxx.js:7:5)`，得出没有清栈


再运行以下代码，查看栈信息

```
let count = 0;

function xxx() {
  setTimeout(function () {
    console.log(count++)
    console.log('show me the stack', new Error())
    if (count < 6) {
      xxx()
    }
  }, 0)
}
xxx()
```

```
➜  Desktop node xxx.js
0
show me the stack Error
    at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
1
show me the stack Error
    at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
2
show me the stack Error
    at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
3
show me the stack Error
    at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
4
show me the stack Error
    at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
5
show me the stack Error
    at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)
    at tryOnTimeout (timers.js:224:11)
    at Timer.listOnTimeout (timers.js:198:5)
```

以上信息看 `at Timeout._onTimeout (/Users/Fred/Desktop/xxx.js:6:38)`，没有不断的压栈，所有可以重复调用


具体为什么，先看这里 <https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/>

```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```



