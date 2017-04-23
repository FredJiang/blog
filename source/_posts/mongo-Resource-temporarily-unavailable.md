---
title: mongo Resource temporarily unavailable
date: 2017-04-06 15:11:31
tags: [mongo]
---


报错

```
I NETWORK  [initandlisten] pthread_create failed: errno:11 Resource temporarily unavailable
```

原因：启动的程序比较多，导致创建的 mongo 连接比较多

<!--more-->

直接连上 mongo 可以看到一个警告 `soft rlimits too low. rlimits set to 1024 processes, 64000 files.`

```
mongo
MongoDB shell version: 3.2.12
connecting to: test
Server has startup warnings:
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten]
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten]
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten]
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. rlimits set to 1024 processes, 64000 files. Number of processes should be at least 32000 : 0.5 times number of files.
2017-04-06T14:13:17.609+0800 I CONTROL  [initandlisten]
>
```

修改文件

`/etc/security/limits.d/90-nproc.conf`

添加后面三行

```
*          soft    nproc     1024
root       soft    nproc     unlimited
mongod - nofile 21000
mongod     soft    nproc     62848
mongod     hard    nproc     62848
```

重启数据库

`sudo /etc/init.d/mongod restart`


```
MongoDB shell version: 3.2.12
connecting to: test
Server has startup warnings:
2017-04-06T15:08:09.179+0800 I CONTROL  [initandlisten]
2017-04-06T15:08:09.179+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
2017-04-06T15:08:09.179+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2017-04-06T15:08:09.179+0800 I CONTROL  [initandlisten]
2017-04-06T15:08:09.179+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.
2017-04-06T15:08:09.180+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2017-04-06T15:08:09.180+0800 I CONTROL  [initandlisten]
>
```