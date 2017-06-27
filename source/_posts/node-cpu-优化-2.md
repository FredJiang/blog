---
title: node cpu 优化 2
date: 2017-06-12 16:23:00
tags: [node.js, cpu, strace, lsof]
---


服务器在跑 node 程序，cpu 有点出乎意料的高。。。


<!--more-->

我这 node 是用 pm2 启动的

首先用 `pm2 list`，找到对应的 `pid`，然后用


`strace -c -p pid`

追踪程序，一段时间后，ctrc + c，得到如下结果

```
strace -c -p 302
Process 302 attached
^CProcess 302 detached
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 37.35    0.198450          12     17059           epoll_wait
 33.11    0.175915           8     21062           write
 23.03    0.122384          12     10012           read
  4.59    0.024393           2     10210         6 epoll_ctl
  1.43    0.007619          29       260        37 futex
  0.38    0.001999         111        18           close
  0.08    0.000416           9        48           mmap
  0.04    0.000189          32         6         6 connect
  0.00    0.000000           0        12           open
  0.00    0.000000           0        26           stat
  0.00    0.000000           0         2           mprotect
  0.00    0.000000           0        21           munmap
  0.00    0.000000           0        12           ioctl
  0.00    0.000000           0         6           socket
  0.00    0.000000           0        18         6 setsockopt
  0.00    0.000000           0         6           getsockopt
------ ----------- ----------- --------- --------- ----------------
```


在这里 [epoll_wait](https://linux.die.net/man/2/epoll_wait) 比较耗时

从文档得出 epoll_wait 的作用如下

> epoll_wait, epoll_pwait - wait for an I/O event on an epoll file descriptor


接着看下该进程打开了多少个文件

```
lsof -p 302
```

发现有很多的 mongo 连接

我这一共连了 10 个 mongo 数据库，产生了 50 个连接

根据 mongoosejs 的文档，发现这个是正常现象

<http://mongoosejs.com/docs/connections.html>

> Each connection, whether created with mongoose.connect or mongoose.createConnection are all backed by an internal configurable connection pool defaulting to a size of 5.


另外用 mongo 的工具 `mongostat` 可以查看 mongo 的当前连接数


综上，epoll_wait 应该不是问题所在，接着查其他的原因

接着看系统调用 write


用命令 `lsof -p 302`，这次不用 `-c`


发现有大量的如下系统调用

```
write(60, "\264\0\0\0\207L\4\0\0\0\0\0\324\7\0\0\0\0\0\0tweoe.receip"..., 49) = 49
write(60, "\203\0\0\0\3orderby\0\26\0\0\0\20repairTimes\0\1\0"..., 131) = 131
```

上面的 `...` 说明 buffer 没显示全，可以用 `-s` 打印更多的 buffer 数据，如下

`lsof -p 302 -c 1024`

根据 tweoe.receip（项目中使用的一个 mongo 表） 和 repairTimes（表中的字段），查看程序代码，最终找到了问题。。。

