---
title: v8 hello-world.cc 分析
date: 2018-05-27 11:34:20
tags: [node.js, javascript, c++, v8]
---

* [v8 笔记 6 -- debug](../../../../2018/05/25/v8-笔记-6-debug/)
* <https://github.com/v8/v8/wiki/Getting-Started-with-Embedding>
* <https://github.com/v8/v8/wiki/Embedder%27s-Guide>

<!--more-->

代码位置 `samples/hello-world.cc`

先把代码跑起来

```
cd depot_tools/v8

# tools/dev/v8gen.py x64.debug # 跑一次

# gn args out.gn/x64.debug # 跑一次

ninja -C out.gn/x64.debug

./out.gn/x64.debug/v8_hello_world
```


然后看几个关键的术语

* An isolate is a VM instance with its own heap.
* A local handle is a pointer to an object. All V8 objects are accessed using handles. They are necessary because of the way the V8 garbage collector works.
* A handle scope can be thought of as a container for any number of handles. When you've finished with your handles, instead of deleting each one individually you can simply delete their scope.
* A context is an execution environment that allows separate, unrelated, JavaScript code to run in a single instance of V8. You must explicitly specify the context in which you want any JavaScript code to be run.


接着看 `samples/process.cc` 这个例子，运行方法如下

`./out.gn/x64.debug/v8_sample_process samples/count-hosts.js`

