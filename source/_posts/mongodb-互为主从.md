---
title: mongodb 互为主从
date: 2015-02-11 19:41:44
tags: [mongo, master, slave]
---

### 安装 mongodb
参考 <http://docs.mongodb.org/manual/installation/>



### 主从配置
在 master 和 slave 上分别修改配置文件 /etc/mongod.conf

master(192.168.10.3) 中添加

```
master = true
source = 192.168.10.2
```

slave(192.168.10.2) 中添加

```
slave = true
source = 192.168.10.3
```

启动数据库

```
service mongod start
```

测试

在 master 中 save 数据，能够在 slave 中查到

<!--more-->


### 互为主从

* 通过命令运行

在 192.168.10.2 上

```
mongod --dbpath=/var/lib/mongodb --port=27017 --master --slave --source=192.168.10.3:27017
```

在 192.168.10.3 上

```
mongod --dbpath=/var/lib/mongodb --port=27017 --master --slave --source=192.168.10.2:27017
```


在 192.168.10.3 上，报错

> 2015-01-28T13:16:38.139+0800 [replslave] repl: --source 192.168.10.2:27017 != 192.168.10.2 from local.sources collection



在 192.168.10.3

```
> use local
switched to db local
> db.sources.find()
{ "_id" : ObjectId("54c8783abb2fbde32644bead"), "host" : "192.168.10.2", "source" : "main", "syncedTo" : Timestamp(1422425470, 1) }
```

在 192.168.10.2

```
> use local
switched to db local
> db.sources.find()
{ "_id" : ObjectId("54c86eb72ad6c9c77ee0428b"), "host" : "192.168.10.3:27017", "source" : "main", "syncedTo" : Timestamp(1422425666, 1) }
```

两台机器的 host 不一样，在 192.168.10.3 上有端口号


改命令为

```
mongod --dbpath=/var/lib/mongodb --port=27017 --master --slave --source=192.168.10.2
mongod --dbpath=/var/lib/mongodb --port=27017 --master --slave --source=192.168.10.3:27017
```

正常运行，能够相互写数据并同步成功

如果报错
> 2015-01-28T13:35:18.603+0800 [replslave] all sources dead: data too stale halted replication, sleeping for 5 seconds

可以加参数 —autoresync，不过要注意备份数据，因为有如下日志

> 2015-01-28T13:36:26.059+0800 [replslave] resync: dropping database xxx
> 
> 2015-01-28T13:36:26.060+0800 [replslave] removeJournalFiles

```
mongod --dbpath=/var/lib/mongodb --port=27017 --master --slave --source=192.168.10.3:27017 --autoresync
```



* 通过 service 运行

在 192.168.10.3 上，修改 /etc/mongod.conf

```
master = true
slave = true
source = 192.168.10.2
```

在 192.168.10.3 上，修改 /etc/mongod.conf

```
master = true
slave = true
source = 192.168.10.3
```

启动数据库

```
service mongod start
```

由于数据库的版本不一样，有的 bind_ip = 127.0.0.1 默认是注释掉的，有的是打开的

```
# Listen to local interface only. Comment out to listen on all interfaces. 
# bind_ip = 127.0.0.1
```
