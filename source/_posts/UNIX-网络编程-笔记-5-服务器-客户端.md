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