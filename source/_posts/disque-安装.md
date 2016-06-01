---
title: disque 安装
date: 2016-05-25 14:02:46
tags: [disque]
---

<https://github.com/antirez/disque>

<!--more-->

##### 安装

```
cd /opt/project/
git clone https://github.com/antirez/disque.git
cd disque
make
make test
```

##### 启动

`./src/disque-server`

##### 测试

```
cd /opt/project/disque
./src/disque
ping
exit
```

##### 远程连接

`./disque -h ip -p port`

##### 集群搭建

<http://marshal.ohtly.com/2016/01/11/disque-cluster/>

参考

* <http://marshal.ohtly.com/2016/01/09/getting-start-with-disque-and-node/>