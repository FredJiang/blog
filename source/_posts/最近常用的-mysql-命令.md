---
title: 最近常用的 mysql 命令
date: 2016-05-25 11:57:38
tags: [mysql, command, db, database]
---

##### 显示字符集

`SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';`

##### 在数据库中运行脚本

`mysql -u user -p dbname < ./sdk.sql`

<!--more-->