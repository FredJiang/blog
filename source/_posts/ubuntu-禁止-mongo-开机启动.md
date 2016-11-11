---
title: ubuntu 禁止 mongo 开机启动
date: 2016-06-03 16:10:33
tags: [ubuntu, server, startup, init, mongo]
---


##### 检查开机启动的程序

输入

`initctl list | grep mongo`

输出

```
mongod start/running, process 1089
```

<!--more-->

##### 禁止 mongo 开机启动

```
jiangpeng@xxx:/etc/init$ pwd
/etc/init
jiangpeng@xxx:/etc/init$ ls | grep mongo
mongod.conf
jiangpeng@xxx:/etc/init$ echo manual | sudo tee /etc/init/mongod.override
jiangpeng@xxx:/etc/init$ ls | grep mongo
mongod.conf
mongod.override
```

参考

* <http://askubuntu.com/questions/19320/how-to-enable-or-disable-services>