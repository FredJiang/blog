---
title: golang 生成 mysql 表的 struct
date: 2017-11-29 17:32:55
tags: [golang, mysql, struct, node.js]
---

mysql 的表变为 code

<!--more-->

node.js

<https://github.com/sequelize/sequelize-auto>

```
npm install -g sequelize-auto mysql

sequelize-auto \
--dialect mysql \
-h host \
-p port \
-u user \
-x password \
-d dbName \
-t tableName \
-o ./models_mysql
```

golang

<https://github.com/Shelnutt2/db2struct>

```
go get github.com/Shelnutt2/db2struct/db2struct

db2struct \
--json \
--gorm \
--package mysql \
--host host \
--mysql_port port \
--user user \
-p password \
-d dbName \
-t tableName \
--struct structName \
| sed -e "s/sql.NullFloat64/null.Float     /g" \
| sed -e "s/sql.NullInt64/null.Int     /g" \
| sed -e "s/sql.NullString/null.String   /g" \
| sed -e "s/time.Time/null.Time/g" \
> structName.go
```

