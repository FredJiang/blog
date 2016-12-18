---
title: UNIX 网络编程 笔记 4 -- connect 函数
date: 2016-12-12 22:58:41
tags: [socket, unix, network, UNIX 网络编程]
---

以下内容为 《UNIX 网络编程 卷 1：套接字联网 API》中的 `4.3 connnet 函数` 一节的内容

<!--more-->

#### 4.3 connect 函数

TCP 客户用 connect 函数来建立与 TCP 服务器的连接。

```
#include <sys/socket.h>
int connect(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen);
返回：若成功则为 0，若出错则为 -1
```

sockfd 是由 socket 函数返回的套接字描述符，第二个、第三个参数分别是一个指向套接字地址结构的指针和该结构的大小。套接字地址结构必须含有服务器的 IP 地址和端口号。

客户在调用函数 connect 前不必非得调用 bind 函数，因为如果需要的话，内核会确定源 IP 地址，并选择一个临时端口作为源端口。

如果是 TCP 套接字，调用 connect 函数将激发 TCP 的三路握手过程，而且仅在连接建立成功或出错时才返回，其中出错返回可能有以下几种情况。

1. 若 TCP 客户没有收到 SYN 分节的响应，则返回 ETIMEDOUT 错误。举例来说，调用 connect 函数时， 4.4 BSD 内核发送一个 SYN，若无响应则等待 6s 后再发一个，若仍无响应则等待 24s 后再发送一个。若总共等了 75s 后仍未收到响应则返回本错误。
2. 若对客户的 SYN 响应是 RST（表示复位），则表明该服务器主机在我们指定的端口上没有进程在等待与之连接（例如服务器进程也许没在运行）。这是 hard error，客户一接收到 RST 就马上返回 ECONNREFUSED 错误。
	
	RST 是 TCP 在发生错误时发送的一种 TCP 分节。产生 RST 是三个条件是：目的地为某端口的 SYN 到达，然而该端口上没有正在监听的服务器；TCP 想取消一个已有连接；TCP 接收到一个根本不存在的连接上的分节。
3. 若客户发出的 SYN 在中间的某个路由器上引发了一个 destination unreachable ICMP 错误，则认为是一种 soft error。客户主机内核保存该消息，并按第一种情况所述的时间间隔继续发送 SYN。若在某个规定的时间后仍未收到响应，则把保存的消息作为 EHOSTUNREACH 或 ENETUNREACH 错误返回给进程。以下两种情形也是有可能的：一是按照本地系统的转发表，根本没有到达远程系统的路径；二是 connect 调用根本不等待就返回。