---
title: node http 系统调用
date: 2017-03-23 15:18:40
tags: [node.js, http, strace]
---

服务器代码 [example.js](https://nodejs.org/api/synopsis.html)

<!--more-->

```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

启动并追踪系统调用

`node example.js`

`ps aux | grep "node example.js"`

`strace -p pid`

或

`strace node example.js`


向服务器发起请求

`curl "http://127.0.0.1:3002?name=fred"`



系统调用结果

```
epoll_wait(5, {{EPOLLIN, {u32=10, u64=10}}}, 1024, 108760) = 1
accept4(10, 0, NULL, SOCK_CLOEXEC|SOCK_NONBLOCK) = 13
accept4(10, 0, NULL, SOCK_CLOEXEC|SOCK_NONBLOCK) = -1 EAGAIN (Resource temporarily unavailable)
epoll_ctl(5, EPOLL_CTL_ADD, 13, {EPOLLIN, {u32=13, u64=13}}) = 0
epoll_wait(5, {{EPOLLIN, {u32=13, u64=13}}}, 1024, 99925) = 1
read(13, "GET /?name=fred HTTP/1.1\r\nUser-A"..., 65536) = 185
write(13, "HTTP/1.1 200 OK\r\nContent-Type: t"..., 138) = 138
epoll_ctl(5, EPOLL_CTL_MOD, 13, {EPOLLIN, {u32=13, u64=13}}) = 0
epoll_wait(5, {{EPOLLIN, {u32=13, u64=13}}}, 1024, 0) = 1
read(13, "", 65536)                     = 0
epoll_ctl(5, EPOLL_CTL_DEL, 13, {0, {u32=0, u64=0}}) = 0
close(13)                               = 0
epoll_wait(5, {}, 1024, 160)            = 0
epoll_wait(5, {}, 1024, 0)              = 0
epoll_wait(5,
```


每一行都是一条系统调用，等号左边是系统调用的函数名及其参数，右边是该调用的返回值。

* [epoll_wait](https://linux.die.net/man/2/epoll_wait)
* [accept4](https://linux.die.net/man/2/accept4)
* [epoll_ctl](https://linux.die.net/man/2/epoll_ctl)
* [close](https://linux.die.net/man/3/close)


另外，库调用可以使用 `ltrace` 查看