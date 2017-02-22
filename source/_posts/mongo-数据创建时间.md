---
title: mongo 数据创建时间
date: 2017-02-22 14:33:09
tags: [mongo]
---

### 需求

将据库中记录的错误的创建时间改为正确的

<!--more-->

```
var countEffected = 0;
var myCursor = db.configrecords.find({ "gameId": "26" }, { createTime: 1, createTime_original: 1 }).sort({ "createTime": -1 })
while (myCursor.hasNext()) {
  countEffected++;

  var doc = myCursor.next();
  var createTimeOld = doc.createTime * 1;
  var createTime = doc._id.getTimestamp().getTime();

  // db.configrecords.update({ "_id": doc._id }, { $set: { "createTime": createTime, "createTimeOld": createTimeOld } })
  print(new Date(createTimeOld), " > ", new Date(createTime));
}
print(countEffected);
```

或

```
db.configrecords.find({
  "gameId": "26"
}, { createTime: 1, createTime_original: 1 }).sort({
  "createTime": -1
}).forEach(function (doc) {
  var createTimeOld = doc.createTime * 1;
  var createTime = doc._id.getTimestamp().getTime();

  // db.configrecords.update({ "_id": doc._id }, { $set: { "createTime": createTime, "createTimeOld": createTimeOld } })
  print(new Date(createTimeOld), " > ", new Date(createTime));
});
```