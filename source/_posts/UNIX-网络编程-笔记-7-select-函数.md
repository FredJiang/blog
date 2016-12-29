---
title: UNIX 网络编程 笔记 7 -- select 函数
date: 2016-12-24 23:06:38
tags: [socket, unix, network, UNIX 网络编程]
---

该函数允许进程指示内核等待多个事件中的任何一个发生，并只在有一个或多个事件发生或经历一段指定的时间后才唤醒它。

<!--more-->

```
#include <sys/select.h>
#include <sys/time.h>

int select(int maxfdp1, fd_set *readset, fd_set *writeset, fd_set *exceptset, const struct timeval *timeout);

返回：若有就绪描述符则为其数目，若超时则为 0，若出错则为 -1
```

该函数的最后一个参数 timeout 告知内核等待所指定描述符的任何一个就绪可花多长时间。

select 使用描述符集，通常是一个整数数组，其中每个数组中的每一位对应一个描述符。举例来说，假设使用 32 位整数，那么该数组的第一个元素对应于描述符 0~31，第二个元素对应于描述符 32~63。

maxfdp1 参数指定待测试的描述符个数，它的值是待测试的最大描述符加 1。

调用该函数时，我们指定所关心的描述符的值，该函数返回时，结果将指示哪些描述符已就绪。该函数返回后，我们使用 FD_ISSET 宏来测试 fd_set 数据类型中的描述符。描述符集内任何与未就绪描述符对应的位返回时均清成 0。为此，每次重新调用 select 函数时，我们都得再次把所有描述符集内所关心的位均置为 1。
