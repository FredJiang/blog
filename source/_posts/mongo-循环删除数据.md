---
title: mongo 循环删除数据
date: 2016-06-19 09:53:45
tags: [mongo, shell, loop]
---

##### 需求

线上的业务逻辑处理变慢了，原因是 mongo 数据库的数据量太大，而且这些数据都是多余的日志数据，因此比较快的处理方法就是：删数据。。。

##### 一次性删除

```
db.collectionName.remove(conditions)
```

因为删除耗时太久，而且中间没有任何反馈，感觉像是卡死了

<!--more-->


##### 一条一条删除：

```
var startTime = new Date("2015-04-01").getTime();
var endTime = new Date("2016-04-01").getTime();
print(startTime);
print(new Date(startTime));
print(endTime);
print(new Date(endTime));

var count = 0;
var maxCount = 1000000;
var whereConditions = {
    $and: [{
        loginTime: {
            $gt: startTime
        }
    }, {
        loginTime: {
            $lt: endTime
        }
    }]
}
var myCursor = db.loginlogs.find(whereConditions);
while (myCursor.hasNext() && count < maxCount) {
    // print(tojson(myCursor.next()));
    var myDocument = myCursor.next();
    if (myDocument) {
        print(new Date(myDocument.loginTime));
        print(count);
        db.loginlogs.remove(myDocument);
    }
    count++;
}
```