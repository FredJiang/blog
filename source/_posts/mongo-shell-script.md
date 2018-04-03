---
title: mongo shell script
date: 2017-12-13 21:33:08
tags: [mongo, shell]
---

<https://docs.mongodb.com/v3.4/tutorial/write-scripts-for-the-mongo-shell>

<!--more-->

```
db.collectionName.find({
  "login_type": "au"
}, {
  "_id": 0,
  "login_type": 1,
  "playerid": 1,
  "serverid": 1,
  "roleid": 1
}).forEach(function (doc) {
  print(tojson(doc, '', true), ",");
});
```

`mongo 127.0.0.1:27017/dbName mongoScriptForEach.js`

```
var myCursor = db.collectionName.find({
  "login_type": "au"
}, {
  "_id": 0,
  "login_type": 1,
  "playerid": 1,
  "serverid": 1,
  "roleid": 1
});
while (myCursor.hasNext()) {
  var doc = myCursor.next()
  print(tojson(doc, '', true), ",");
}
```

`mongo 127.0.0.1:27017/dbName mongoScriptCursor.js`

如果是为了导出数据的话，也可以用如下方式导出 csv 数据

```
mongoexport \
--host 127.0.0.1 \
--port 27017 \
--type csv \
--query '{"login_type": "au"}' \
--fields login_type,playerid,serverid,roleid \
--db dbName \
--collection collectionName \
--out ./dbName_collectionName.csv
```

老版本用 `--csv`

```
mongoexport \
--host 127.0.0.1 \
--port 27017 \
--csv \
--query '{"login_type": "au", "$and": [{"createTime": { "$gte":          1481005260000 } }, {"createTime": { "$lte":           1513123200000 } }] }' \
--fields login_type,playerid,serverid,roleid \
--db dbName \
--collection collectionName \
--out ./dbName_collectionName.csv
```


```
mongoexport \
--host 127.0.0.1 \
--port 27017 \
--csv \
--query '{"login_type": "au", "$and": [{"createTime": { "$gte": new Date(1481005260000) } }, {"createTime": { "$lte": new Date(1513123200000) } }] }' \
--fields login_type,playerid,serverid,roleid \
--db dbName \
--collection collectionName \
--out ./dbName_collectionName.csv
```


