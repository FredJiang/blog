---
title: mongo Replica Set 笔记
date: 2015-02-28 14:53:10
tags: [mongo, replication]
---

笔记：MongoDB - The Definitive Guide

###### Replica Sets

> A replica set is basically a master-slave cluster with automatic failover. The biggest difference between a master-slave cluster and a replica set is that a replica set does not have a single master: one is elected by the cluster and may change to another node if the current master goes down. However, they look very similar: a replica set always has a single master node (called a primary) and one or more slaves (called secondaries). 

<!--more-->

###### 创建数据库目录

```
mkdir -p /Users/Fred/Desktop/mongoSetTest/dbs/node1
mkdir -p /Users/Fred/Desktop/mongoSetTest/dbs/node2
mkdir -p /Users/Fred/Desktop/mongoSetTest/dbs/node3
```

###### 运行 mongod

```
mongod --dbpath /Users/Fred/Desktop/mongoSetTest/dbs/node1 --port 10001 --replSet blort/Fred:10002
mongod --dbpath /Users/Fred/Desktop/mongoSetTest/dbs/node2 --port 10002 --replSet blort/Fred:10001
mongod --dbpath /Users/Fred/Desktop/mongoSetTest/dbs/node3 --port 10003 --replSet blort/Fred:10001
```

> Once you have a few servers up, you’ll notice that the server logs are complaining about the replica set not being initialized. This is because there’s one more step: initializing the set in the shell



###### 初始化 replica set

```
mongo 127.0.0.1:10001

use admin

db.runCommand({
    "replSetInitiate": {
        "_id": "blort",
        "members": [{
            "_id": 1,
            "host": "10.8.6.229:10001"
        }, {
            "_id": 2,
            "host": "10.8.6.229:10002"
        }, {
            "_id": 3,
            "host": "10.8.6.229:10003"
        }]
    }
})
```

再分别连接 mongo 的 shell，node1 为 PRIMARY，其他为 SECONDARY


node1

> Fred:dbs Fred$ mongo 127.0.0.1:10001
> 
> MongoDB shell version: 2.6.5
> 
> connecting to: 127.0.0.1:10001/test
>  
> blort:PRIMARY

node2

> Fred:dbs Fred$ mongo 127.0.0.1:10002
> 
> MongoDB shell version: 2.6.5
> 
> connecting to: 127.0.0.1:10002/test
> 
> blort:SECONDARY>

node3

> Fred:dbs Fred$ mongo 127.0.0.1:10003
> 
> MongoDB shell version: 2.6.5
> 
> connecting to: 127.0.0.1:10003/test
> 
> blort:SECONDARY>


停掉 node1，过一会再启动，node1 由 PRIMARY 变为 SECONDARY

> If the current primary fails, the rest of the nodes in the set will attempt to elect a new primary node. This election process will be initiated by any node that cannot reach the primary.

```
mongod --dbpath /Users/Fred/Desktop/mongoSetTest/dbs/node1 --port 10001 --replSet blort/Fred:10002
```

> Fred:dbs Fred$ mongo 127.0.0.1:10001
> 
> MongoDB shell version: 2.6.5
> 
> connecting to: 127.0.0.1:10001/test
> 
> blort:SECONDARY>

在 SECONDARY node 上，不能 save 数据，不能 show collections

> There is a special query option to tell a slave server that it is allowed to handle a query. (By default, queries will not be executed on a slave.) This option is called slaveOkay, and all MongoDB drivers provide a mechanism for setting it.

```
blort:SECONDARY> use testDB
switched to db testDB
blort:SECONDARY> show collections
2015-02-28T14:26:12.305+0800 error: { "$err" : "not master and slaveOk=false", "code" : 13435 } at src/mongo/shell/query.js:131
blort:SECONDARY> db.users.save({name:"fred"})
WriteResult({ "writeError" : { "code" : undefined, "errmsg" : "not master" } })
blort:SECONDARY> show dbs
admin   (empty)
local   0.328GB
testDB  0.078GB
blort:SECONDARY>
```