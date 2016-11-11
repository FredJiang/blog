---
title: shell 获取 mongo 表长度
date: 2016-06-17 15:09:52
tags: [mongo, mongodb, shell, count]
---

需求

获取 mongo 中的所有数据库中的所有表的长度

<!--more-->


```
// 显示所有数据库
mongo test --eval "printjson(db.adminCommand('listDatabases'))"

// 显示数据库 test 中的所有表
mongo test --eval "printjson(db.getCollectionNames())"

// 显示数据库 test 中的 collectionName 表的长度
mongo test --eval "db.collectionName.count()"
```


或者

```
// 显示数据库 test 中表长度大于 0 的
mongo test

db.getCollectionNames().map(function(name) {
    return {
        "name": name,
        "count": db[name].count()
    }
}).filter(function(data) {
    return data.count > 0
})
```

参考

* <https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/>