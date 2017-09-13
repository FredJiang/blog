---
title: node 事件驱动机制
date: 2016-03-11 22:58:12
tags: [node.js, event]
---



以下面代码执行为例

```
var fs = require('fs');
fs.readFile('foo.js', {encoding:'utf8'}, function(err,
  fileContents) {
  console.log('Then the contents are available', fileContents);
});
console.log('This happens first');
```

<!--more-->

输出结果为：

```
This happens first
Then the contents are available, [file contents shown]
```

执行逻辑

* 加载 fs 模块。获取到 fs.binding，fs.binding 用来连接 C++ 和 JS 代码
* 调用 fs.readFile。通过 fs.binding，[libuv](http://nikhilm.github.io/uvbook/basics.html) 接收到一个读文件的请求和一个回调函数
* libuv 在自己的线程里调用系统级别的相关方法来读取文件
* JavaScript 程序继续执行，打印出 "This happens first"
* 因为还有一个 callback，event loop 继续执行
* 当 OS 读完文件描述符后，libuv 得到通知并且调用回调函数，为 JavaScript 的 callback 重新进入 V8 线程做准备
* JavaScript 的 callback 被放到 event loop 队列里面并在下一个 tick 中执行
* 打印 "Then the contents are available "
* 没有 callback 了，进程结束



参考

* <https://www.youtube.com/watch?v=8aGhZQkoFbQ>
* [http://latentflip.com/loupe/](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
* 