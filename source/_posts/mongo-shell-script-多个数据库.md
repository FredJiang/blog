---
title: mongo shell script 多个数据库
date: 2017-12-21 10:55:48
tags: [mongo, shell]
---

cat mongoMul.js

<!--more-->

```
var dbRefunds = connect('127.0.0.1:27017/dbRefunds');
var dbOrder = connect('127.0.0.1:27017/dbOrder');

var gameId = 'gameId';
var orderName = 'orderName';

var cursorRefunds = dbRefunds.refunds.find({
  'gameId': gameId,
  'orderid': { $exists: true },
  '$or': [{ 'money': { $exists: false } }, { 'money': { $lte: 0 } }]
});

while (cursorRefunds.hasNext()) {
  var docRefunds = cursorRefunds.next();
  print(tojson(docRefunds, '', true), ',');

  var docOrder = dbOrder[orderName].findOne({ orderid: docRefunds.orderid });
  if (docOrder) {
    print(docOrder.money);
    dbRefunds.refunds.update({ _id: docRefunds._id }, { $set: { money: parseInt(docOrder.money) } });
  }
}
```

`mongo mongoMul.js`