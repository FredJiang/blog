---
title: UNIX 网络编程 笔记 5 -- 服务器 客户端
date: 2016-12-15 08:23:59
tags: [socket, unix, network, UNIX 网络编程]
---

{% asset_img "servcli.png" "" %}

<!--more-->

以下为 《UNIX 网络编程 卷 1：套接字联网 API》第五章中的内容

### 5.6 正常启动

启动服务器

```
[fred@iZ28zknjosgZ tcpcliserv]$ ./tcpserv01 &
[2] 9494
[1]   Terminated              ./tcpserv01
```
服务器启动后，它调用 socket、bind、listen 和 accept，并阻塞于 accept 调用。


查看网络状态

```
[fred@iZ28zknjosgZ tcpcliserv]$ netstat -a | grep 9877
tcp        0      0 0.0.0.0:9877            0.0.0.0:*               LISTEN  
```

同一机器上启动客户端

```
[fred@iZ28zknjosgZ tcpcliserv]$ ./tcpcli01 127.0.0.1
```

客户调用 socket 和 connect，后者引起 TCP 的三路握手过程。当三路握手过程完成后，客户中的 connect 和服务器中的 accept 均返回，连接于是建立。接着发生的步骤如下：

1. 客户调用 str_cli 函数，该函数将阻塞于 fgets 调用。
2. 当服务器中的 accept 返回时，服务器调用 fork，再由子进程调用 str_echo。该函数调用 readline，readline 调用 read，而 read 在等待客户送入一行文本期间阻塞。
3. 服务器父进程再次调用 accept 并阻塞，等待下一个客户连接。

至此，我们有 3 个都在睡眠（即已阻塞）的进程：客户进程、服务器父进程和服务器子进程。

查看网络状态

```
[fred@iZ28zknjosgZ ~]$ netstat -a | grep 9877
tcp        0      0 0.0.0.0:9877            0.0.0.0:*               LISTEN     
tcp        0      0 localhost:9877          localhost:52506         ESTABLISHED
tcp        0      0 localhost:52506         localhost:9877          ESTABLISHED
```

用 ps 命令来检查这些进程的状态和关系

```
[fred@iZ28zknjosgZ tcpcliserv]$ ps -a -o pid,ppid,tty,stat,args,wchan
  PID  PPID TT       STAT COMMAND                     WCHAN
 9494  8669 pts/1    S    ./tcpserv01                 inet_csk_accept
 9496  9494 pts/1    Z    [tcpserv01] <defunct>       exit
 9513  9494 pts/1    Z    [tcpserv01] <defunct>       exit
 9514  8869 pts/2    S+   ./tcpcli01 127.0.0.1        n_tty_read
 9515  9494 pts/1    S    ./tcpserv01                 sk_wait_data
 9850  8669 pts/1    R+   ps -a -o pid,ppid,tty,stat, -
```

从输出中可见客户和服务器运行在不同窗口中（pts/2 和 pts/1），PID 和 PPID 列给出了进程间的父子关系。进程的 STAT 为 S 表明进程在为等待某些资源而睡眠。进程处于睡眠状态时 WCHAN 列指出相应的条件。

### 5.7 正常终止

至此连接已经建立，我们接着输入终端 EOF 字符（Control-D）以终止客户，接着查看网络状态

```
[fred@iZ28zknjosgZ tcpcliserv]$ netstat -a | grep 9877
tcp        0      0 0.0.0.0:9877            0.0.0.0:*               LISTEN     
tcp        0      0 localhost:53078         localhost:9877          TIME_WAIT  
```
当前连接的客户端进入了 TIME_WAIT 状态。

正常终止客户和服务器的步骤

1. 当我们键入 EOF 字符时，fgets 返回一个空指针，于是 str_cli 函数返回。
2. 当 str_cli 返回到客户的 main 函数时，main 通过调用 exit 终止。
3. 进程终止处理的部分工作是关闭所有打开的描述符，因此客户打开的套接字由内核关闭。这导致客户 TCP 发送一个 FIN 给服务器，服务器 TCP 则以 ACK 响应，这就是 TCP 连接终止序列的前半部分。至此，服务器套接字处于 CLOSE_WAIT 状态，客户套接字则处于 FIN_WAIT_2 状态。
4. 当服务器 TCP 接收 FIN 时，服务器子进程阻塞于 readline 调用，于是 readline 返回 0。这导致 str_echo 函数返回服务器子进程的 main 函数。
5. 服务器子进程通过调用 exit 来终止。
6. 服务器子进程中打开的所有描述符随之关闭。由子进程来关闭已连接套接字会引发 TCP 连接终止序列的最后两个分节：一个服务器到客户的 FIN 和一个从客户到服务器的 ACK。至此，连接完全终止，客户套接字进入 TIME_WAIT 状态。
7. 进程终止处理的另一部分内容是：在服务器子进程终止时，给父进程发送一个 SIGCHLD 信号。在以上代码中，父进程未处理该信号，子进程于是进入僵死状态。

```
[fred@iZ28zknjosgZ tcpcliserv]$ ps -a -o pid,ppid,tty,stat,args,wchan
  PID  PPID TT       STAT COMMAND                     WCHAN
16376 15914 pts/0    S    ./tcpserv01                 inet_csk_accept
16382 16376 pts/0    Z    [tcpserv01] <defunct>       exit
```

子进程现在的状态是 Z（表示僵死）。

### 5.12 服务器进程终止

* 我们在同一个主机上启动服务器和客户，并在客户上键入一行文本，以验证一切正常，正常情况下该行文本由服务器回射给客户。
* 找到服务器子进程的进程 ID，并执行 kill 命令杀死它。作为进程终止处理的部分工作，子进程中所有打开的描述符都被关闭。这就导致向客户发送一个 FIN，而客户 TCP 则响应以一个 ACK。这就是 TCP 连接终止工作的前半部分。
* SIGCHLD 信号被发送给服务器父进程，并得到正确处理。
* 客户上没有发生任何特殊之事。客户 TCP 接收来自服务器 TCP 的 FIN 并响应以一个 ACK，然而问题是客户进程阻塞在 fgets 调用上，等待从终端接收一行文本。
* 此时，通过 netstat 命令，发现套接字的状态是
	* 服务器父进程 LISTEN
	* 服务器子进程 FIN_WAIT2
	* 客户 CLOSE_WAIT
* 在客户上再键入一行文本时，str_cli 调用 writen，客户 TCP 接着把数据发送给服务器。TCP 允许这么做，因为客户 TCP 接收到 FIN 只是表示服务器进程已关闭了连接的服务器端，从而不再往其中发送任何数据而已。FIN 的接收并没有告知客户 TCP 服务器进程已经终止。当服务器 TCP 接收到来自客户的数据时，既然先前打开那个套接字的进程已经终止，于是响应一个 RST。
* 然而客户进程看不到这个 RST，因为它在调用 writen 后立即调用 readline，并且由于之前接收的 FIN，所调用的 readline 立即返回 0。我们的客户此时并未预期收到 EOF，于是以出错信息 “server terminated prematurely” 退出。
* 当客户终止时，它所有打开着的描述符都被关闭。

本例子的问题在于：当 FIN 到达套接字时，客户正阻塞在 fgets 调用上。客户实际上在应对两个描述符 -- 套接字和用户输入，它不能单纯阻塞在这两个源中某个特定源的输入上，而是应该阻塞在其中任何一个源的输入上。事实上这正是 select 和 poll 这里哪个函数的目的之一。通过 select 和 poll，一旦杀死服务器子进程，客户会立即被告知已收到 FIN。


### 5.14 服务器主机崩溃

我们接着查看当服务器主机崩溃时会发生什么。为了模拟这种情形，我们必须在不同的主机上运行客户和服务器。我们先启动服务器，再启动客户，接着在客户上键入一行文本以确认连接工作正常，然后从网络上断开服务器主机，并在客户上键入另一行文本。这样同时也模拟了当客户发送数据时服务器主机不可达的情形。

* 当服务器主机崩溃时，已有的网络连接上不发出任何东西。这里我们假设的是主机崩溃，而不是由操作员执行命令关机。
* 我们在客户上键入一行文本，它由 writen 写入内核，再由客户 TCP 作为一个数据分节送出。客户随后阻塞于 readline 调用，等待回射的应答。
* 如果我们用 tcpdump 观察网络就会发现，客户 TCP 持续重传数据分节，试图从服务器上接收一个 ACK。当客户 TCP 最后终于放弃时，给客户进程返回一个错误。既然客户阻塞在 readline 调用上，该调用将返回一个错误。假设服务器主机已崩溃，从而对客户的数据分节根本没有响应，那么所返回的错误是 ETIMEDOUT。然而如果某个中间路由器判定服务器主机已不可达，从而响应以一个 “destination unreachable” ICMP 消息，那么所返回的错误时 EHOSTUNREACH 或 ENETUNREACH。尽管我们的客户最终还是会发现对端主机已崩溃或不可达，不过有时候我们需要比不得不等待 9 分钟更快地检测出这种情况。

### 5.15 服务器主机崩溃后重启

在这种情形中，我们先在客户与服务器之间建立连接，然后假设服务器主机崩溃并重启。前一节中，当我们发送数据时，服务器主机仍然处于崩溃状态；本节中，我们将在发送数据前重新启动已经崩溃的服务器主机。模拟这总情形的最简单的方法就是：先建立连接，再从网络上断开服务器主机，将它关机后再重新启动，最后把它重新连接到网络中。我们不想客户知道服务器主机的关机。

如果在服务器主机崩溃时客户不主动给服务器发送数据，那么客户将不会知道服务器主机已经崩溃（这里假设没有使用 SO_KEEPALIVE 套接字选项）。所发生的步骤如下所述。

* 我们启动服务器和客户，并在客户键入一行文本以确认连接已经建立。
* 服务器主机崩溃并重启。
* 在客户上键入一行文本，它将作为一个 TCP 数据分节发送到服务器主机。
* 当服务器主机崩溃后重启时，它的 TCP 丢失了崩溃前的所有连接信息，因此服务器 TCP 对于所收到的来自客户的数据分节响应一个 RST。
* 当客户 TCP 收到该 RST 时，客户正阻塞在 readline 调用，导致该调用返回 ECONNERESET 错误。

如果对客户而言检测服务器主机崩溃与否很重要，即使客户不主动发送数据也要能检测出来，就需要采用其他某种技术（诸如 SO_KEEPALIVE 套接字选项或某些客户/服务器心搏函数）。
