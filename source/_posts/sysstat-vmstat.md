---
title: sysstat vmstat
date: 2019-07-10 16:25:16
tags: [linux, sysstat, vmstat]
---

vmstat 是 Virtual Meomory Statistics 的缩写，可对操作系统的虚拟内存、进程、CPU 活动进行监控

<!--more-->

```shell
# delay：刷新时间间隔，如果不指定，只显示一条结果
# count：刷新次数。如果不指定刷新次数，但指定了刷新时间间隔，这时刷新次数为无穷
# vmstat delay count
vmstat -S M 1 3
```

字段说明：

procs

|   |         说明         |
|---|----------------------|
| r | 运行队列中的进程数量 |
| b | 等待 IO 的进程数量   |


memory

|       |         说明         |
|-------|----------------------|
| swpd  | 使用中的虚拟内存大小 |
| free  | 可用物理内存大小     |
| buff  | 用作缓冲的内存大小   |
| cache | 用作缓存的内存大小   |


swap：

|    |                  说明                  |
|----|----------------------------------------|
| si | 每秒从交换区写到内存  的大小           |
| so | 每秒从内存  写到交换区的大小           |


IO （现在的 Linux 版本块的大小为 1024 bytes）

|    |      说明      |
|----|----------------|
| bi | 每秒读取的块数 |
| bo | 每秒写入的块数 |


system：

|    |           说明           |
|----|--------------------------|
| in | 每秒中断数，包括时钟中断 |
| cs | 每秒上下文切换数         |


cpu（以百分比表示）：

|    |                               说明                               |
|----|------------------------------------------------------------------|
| us | 用户进程执行时间（user time）                                    |
| sy | 系统进程执行时间（system time）                                  |
| id | 空闲时间（包括 IO 等待时间），中央处理器的空闲时间，以百分比表示 |
| wa | 等待 IO 时间                                                     |
