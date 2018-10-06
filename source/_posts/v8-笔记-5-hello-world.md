---
title: v8 笔记 5 -- hello world
date: 2017-02-10 23:37:53
tags: [v8, node.js, google]
---


接上篇 [v8 笔记 4 -- C++ 使用 v8](../../../../2017/02/01/v8-笔记-4-C-使用-v8/)

在把 `hello_world.cpp` 运行起来后，接着来看下具体的代码是什么意思。

<!--more-->

可以参考以下三篇文章，了解 v8 的大致使用流程，但不完全适用新版本的 API。

* [Google V8编程详解（三）Handle & HandleScope](https://yq.aliyun.com/articles/5633)
* [Google V8编程详解（四）Context](https://yq.aliyun.com/articles/5631)
* [Google V8编程详解（五）JS 调用 C++](https://yq.aliyun.com/articles/5630)


接着参考

* [V8世界探险 (1) - v8 API概览](https://yq.aliyun.com/articles/62854)