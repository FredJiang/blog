---
title: node cpu 优化 1 - tick
date: 2016-12-27 09:28:20
tags: [node, cpu, profile, tick]
---

### 收集数据

测试代码 `test.js`

```
function slow10k(argument) {
    for (var i = 0; i < 10000; i++) {

    }
}

function slow100k(argument) {
    for (var i = 0; i < 100000; i++) {

    }
}

slow10k()
slow100k()
```

<!--more-->

运行测试代码 `node --prof test.js`

在当前目录下生成文件 `isolate-0x3563db0-v8.log`

### [查看数据](https://nodejs.org/en/docs/guides/simple-profiling/)

`node --prof-process isolate-0x36cc780-v8.log`

输出分为六段：[Shared libraries]、[JavaScript], [C++]、[Summary]、[C++ entry points]、[Bottom up (heavy) profile]。

一般需要优化的是 [Bottom up (heavy) profile]。

### 字段说明

。| 。
------------- | -------------
LazyCompile  | If you are using V8's tick processors keep in mind that LazyCompile: prefix does not mean that this time was spent in compiler, it just means that the function itself was compiled lazily.
asterisk  | An asterisk before a function name means that time is being spent in optimized function, tilde -- not optimized.
Stub| Stub prefix to the best of my understanding means the execution was inside a C-Stub, which is a part of runtime and gets compiled along with other parts of the engine (i.e. it is not JIT-compiled JS code).


### 实际项目测试

在 pm2 的启动文件中添加

`"node_args": "--prof"`

模拟高并发，复现问题

`ab -n 10000 -c 100 "http://xxx/"`

分析数据


### 参考

* <http://stackoverflow.com/questions/23934451/how-to-read-nodejs-internal-profiler-tick-processor-output>
* <http://mrale.ph/blog/2011/12/18/v8-optimization-checklist.html>