---
title: node 内存优化笔记(一)
date: 2016-03-18 13:48:15
tags: [node, memerory]
---

[Deploying Node.js](http://www.amazon.cn/Deploying-Node-js-Pasquali-Sandro/dp/1783981407/ref=sr_1_1?s=books&ie=UTF8&qid=1458280419&sr=1-1&keywords=9781783981403)

The design and implementation of Node.js native modules follow a simple directive: keep everything asynchronous. This design ethic, by convention, informs the design of modules contributed by the Node community.

<!--more-->
When a process operates synchronously, it holds, or locks, the total amount of memory it needs to fully complete, at which point the memory it has held is flushed, usually returning this result to the calling method or process. For example, the following operation will load the entirety of a file into the memory prior to returning it:
```var http = require('http')var fs = require('fs')http.createServer(function(req, res) {  fs.readFile('./somefile.js', function(err, data) {    res.writeHead(200);    res.end(data)  })}).listen(8000)```
When a request is made to localhost:8000, the somefile.js file is read off the filesystem in its entirety and returned to the client. That is the desired effect—but there is a slight problem. Because the entire file is being pushed into a buffer prior to being returned, an amount of memory equal to the byte size of the file must be allocated on each request. While the operation is itself asynchronous (allowing other operations to proceed), just a few requests for a very large file (of several MB, for example) can over ow the memory and take down the Node process.Node excels at creating scalable web services. One of the reasons for this is the focus on providing robust Stream interfaces.
A better strategy is to stream the file directly to the HTTP response object (which is a writable stream):
```http.createServer(function(req, res) {  fs.createReadStream('./static_buffered.js').pipe(res);}).listen(8000)
```In addition to requiring less code, data is sent (piped) directly to the out stream, using very little memory.