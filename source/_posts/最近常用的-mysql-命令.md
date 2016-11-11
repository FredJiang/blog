---
title: 最近常用的 mysql 命令
date: 2016-05-25 11:57:38
tags: [mysql, command, db, database]
---

##### 在数据库中运行脚本

`mysql -u user -p dbname < ./sdk.sql`

##### 显示字符集

`SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';`

<!--more-->

##### 显示约束

```
select *
from information_schema.table_constraints
where constraint_schema = 'dbname'
```
##### 显示外键

```
select *
from information_schema.referential_constraints
where constraint_schema = 'dbname';
```

##### [清空表数据](http://blog.csdn.net/apache6/article/details/2778878)

`DELETE FROM tablename`

`TRUNCATE TABLE tablename`