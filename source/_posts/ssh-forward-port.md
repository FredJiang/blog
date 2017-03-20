---
title: ssh forward port
date: 2017-02-28 11:24:30
tags: [ssh]
---

```
ssh \
-R 25000:127.0.0.1:25000 \
-L 24002:127.0.0.1:24002 \
-L 26002:127.0.0.1:26002 \
fred@host
```

<!--more-->

-L port:host:hostport

将本地机(客户机)的某个端口转发到远端指定机器的指定端口。

工作原理是这样的, 本地机器上分配了一个 socket 侦听 port 端口, 一旦这个端口上有了连接, 该连接就经过安全通道转发出去, 同时远程主机和 host 的 hostport 端口建立连接。可以在配置文件中指定端口的转发。只有 root 才能转发特权端口。IPv6 地址用另一种格式 port/host/hostport

-R port:host:hostport

将远程主机(服务器)的某个端口转发到本地端指定机器的指定端口。

工作原理是这样的, 远程主机上分配了一个 socket 侦听 port 端口, 一旦这个端口上有了连接, 该连接就经过安全通道转向出去, 同时本地主机和 host 的 hostport 端口建立连接。可以在配置文件中指定端口的转发。只有用 root 登录远程主机才能转发特权端口。IPv6 地址用另一种格式 port/host/hostport
