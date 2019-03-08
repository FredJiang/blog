---
title: nc
date: 2019-01-27 00:10:51
tags: [nc, tcp, network, netcat]
---

* <https://linux.cn/article-9190-1.html>

```sh
sudo yum install nc

brew     install netcat
```

<!--more-->

nc ncat

#### 检查端口

```sh
nc -zv 192.168.1.15 22 80 # 22 和 80 端口是否打开
nc -zv 192.168.1.15 20-80 # 22 到 80 端口是否打开
```

#### 传文件 

server2 -> server1

server1
```sh
nc -l port > abc.txt
```

server2
```sh
nc server1 port < abc.txt
```

#### 创建后门

`-e` 标志将一个 bash 与端口 10000 相连。现在客户端只要连接到服务器上的 10000 端口就能通过 bash 获取我们系统的完整访问权限。

```sh
ncat -l 10000 -e /bin/bash
```

```sh
ncat 192.168.1.100 10000
```

#### 端口转发

连接到 80 端口的连接都会转发到 8080 端口

```sh
ncat -u -l 80 -c 'ncat -u -l 8080'
```




