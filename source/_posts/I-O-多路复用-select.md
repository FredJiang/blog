---
title: I/O 多路复用 -- select
date: 2017-09-19 14:52:37
tags: [select, c]
---


应用通常需要在多个文件描述符上阻塞：在键盘输入（stdin）、进程间通信以及很多文件之间协调 I/O。基于事件驱动的图形用户界面（GUI）应用可能会和成百上千个事件的主循环竞争。

<!--more-->

如果不使用线程，而是独立处理每个文件描述符，单个进程无法同时在多个文件描述符上阻塞。只要这些描述符已经有数据可读写，也可以采用多个文件描述符的方式。但是，要是有个文件描述符数据还没有准备角————比如发送了 read() 调用，但是还没有任何数据————进程会阻塞，而且无法对其他的文件描述符提供服务。该进程可能只是阻塞几秒钟，导致应用效率变低，影响用户体验。然而，如果该文件描述符一直没有数据，进程就会一直阻塞。因为文件描述符的 I/O 总是关联的（比如管道），很可能一个文件描述符依赖另一个文件描述符，在后者可用前，前者一直处于不可用状态。尤其是对于网络应用而言，可能同时会打开多个 socket，从而引发很多问题。

试想一下如下场景：当标准输入设备（stdin）挂起，没有数据输出，应用在和进程间通信（IPC）相关的文件描述符上阻塞。只有当阻塞的 IPC 文件描述符返回数据后，进程才知道键盘输入挂起————但是如果阻塞的操作一直没有返回，又会发生什么呢?



如前所述，非阻塞 I/O 是这种问题的一个解决方案。使用非阻塞 I/O，应用可以发送 I/O 请求，该请求返回特定错误，而不是阻塞。但是，该方案效率不高，主要有两个原因：首先，进程需要连续随机发送 I/O 操作，等待某个打开的文件描述符可以执行 I/O 操作。这种设计很糟糕。其次，如果进程睡眠则会更高效，睡眠可以释放 CPU 资源，使得 CPU 可以处理其他任务，直到一个或多个文件描述符可以执行I/O 时再唤醒进程。

下面我们一起来探讨 I/O 多路复用。

I/O 多路复用支持应用同时在多个文件描述符上阻塞，并在其中某个可以读写时收到通知。因此，I/O 多路复用成为应用的关键所在，在设计上遵循以下原则。

1. I/O 多路复用：当任何一个文件描述符 I/O 就绪时进行通知。
2. 都不可用？在有可用的文件描述符之前一直处于睡眠状态。
3. 唤醒：哪个文件描述符可用了？
4. 处理所有 I/O 就绪的文件描述符，没有阻塞。
5. 返回第 1 步，重新开始。


```
int select (int n,
            fd_set *readfds,
            fd_set *writefds,
            fd_set *exceptfds,
            struct timeval *timeout);

FD_CLR(int fd, fd_set *set) // 从指定集中删除一个文件描述符。

FD_ISSET(int fd, fd_set *set) // 检查一个文件描述符是否在给定集合中。

FD_SET(int fd, fd_set *set) // 向指定集中添加一个文件描述符。

FD_ZERO(fd_set *set) // 从指定集合中删除所有的文件描述符，每次调用 select() 之前，都应该调用该宏。
```


在给定的文件描述符 I/O 就绪之前并且还没有超出指定的时间限制，select() 调用就会阻塞。

监视的文件描述符可以分为 3 类，分别等待不同的事件。对于 readfds 集中的文件描述符，监视是否有数据可读（即某个读操作是否可以无阻塞完成）；对于 writefds集中的文件描述符，监视是否有某个写操作可以无阻塞完成；对于 exceptfds 中的文件描述符，监视是否发生异常，或者出现带外（out-of-band）数据（这些场景只适用于 socket）。指定的集合可能是 NULL，在这种情况下，select() 不会监视该事件。

成功返回时，每个集合都修改成只包含相应类型的 I/O 就绪的文件描述符。举个例子，假定 readfds 集中有两个文件描述符 7 和 9。当调用返回时，如果描述符 7 还在集合中，它在 I/O 读取时不会阻塞。如果描述符 9 不在集合中，它在读取时很可能会发生阻塞。（这里说的是 “很可能” 是因为在调用完成后，数据可能已经就绪了。在这种场景下，下一次调用 select() 就会返回描述符可用。）

第一个参数 n，其值等于所有集合中文件描述符的最大值加 1。因此，select() 调用负责检查哪个文件描述符值最大，将该最大值加 1 后传给第一个参数。

参数 timeout 是指向 timeval 结构体的指针。

如果该参数不是 NULL,在 tv_sec 秒 tv_usec 微秒后。select() 调用会返回，即使没有一个文件描述符处于 I/O 就绪状态。返回时，在不同的 UNIX 系统中，该结构体是未定义的，因此每次调用必须（和文件描述符集一起）重新初始化。实际上，当前 Linux 版本会自动修改该参数，把值修改成剩余的时间。因此，如果超时设置是5 秒，在文件描述符可用之前已逝去了 3 秒，那么在调用返回时，tv.tv_sec 的值就是 2。

如果超时值都是设置成 0，调用会立即返回，调用时报告所有事件都挂起，而不会等待任何后续事件。


由于文件描述符集是静态建立的，所以文件描述符数存在上限值，而且存在最大文件描述符值，这两个值都是由 FD_SETSIZE 设置。



select() 调用成功时，返回三个集合中 I/O 就绪的文件描述符总数。如果给出了超时设置，返回值可能是 0。出错时，返回 -1，并把 error 值设置成如下值之一：

| 错误码 |                  说明                  |
|--------|----------------------------------------|
| EBADF  | 某个集合中存在非法文件描述符           |
| EINTR  | 等待时捕获了一个信号，可以重新发起调用 |
| EINVAL | 参数 n 是负数，或者设置的超时时间非法  |
| ENOMEM | 没有足够的内存来完成该请求             |



示例代码


```
#include <stdio.h>
#include <sys/time.h>
#include <time.h>
#include <sys/types.h>
#include <unistd.h>

#define TIMEOUT 5
#define BUF_LEN 1024

int main(void) {
  // timeval
  // C-c j 跳不过去，(global-set-key (kbd "C-c j") 'semantic-ia-fast-jump)
  // 通过
  // find /usr/include -name '*h' -type f -exec grep -nH -A 3 'struct timeval' {} \;
  // 发现
  // timeval 没在 #include <sys/time.h>  里面
  // timeval   在 #include <bits/time.h> 里面
  // 可以在项目的根目录下运行
  // cscope-indexer -r
  // 然后再 C-c s g
  // 或者通过菜单中的 Cscope 来操作
  // 另外C-c s C-h 能找到更多 cscope 命令
  // 此外还有 etags gtags ctags 等工具可以用于代码跳转
  struct timeval tv;
  fd_set readfds;
  int ret;

  FD_ZERO(&readfds);
  FD_SET(STDIN_FILENO, &readfds);
  tv.tv_sec = TIMEOUT;
  tv.tv_usec = 0;

  ret = select(STDIN_FILENO + 1, &readfds, NULL, NULL, &tv);

  printf("blocked until TIMEOUT\n");

  if (ret == -1) {
    perror("select");
    return 1;
  } else if (!ret) {
    printf("%d seconds elapsed.\n", TIMEOUT);
    return 0;
  }

  if (FD_ISSET(STDIN_FILENO, &readfds)) {
    char buf[BUF_LEN + 1];
    int len;

    len = read(STDIN_FILENO, buf, BUF_LEN);
    printf("length of buf is %d\n", len);
    if (len == -1) {
      perror("read");
      return 1;
    }

    if (len) {
      buf[len] = '\0';
      printf("read: %s\n", buf);
    }

    return 0;
  }

  fprintf(stderr, "This should not happen!\n");
  return 1;
}
```


编译

```
gcc select.c -o select
```

运行

```
./select
```

输入 in + 回车

```
blocked until TIMEOUT
length of buf is 3
read: in
```


运行

```
./select
```

什么也不输入

```
blocked until TIMEOUT
5 seconds elapsed.
```

