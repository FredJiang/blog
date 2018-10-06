---
title: mysql 备份恢复数据
date: 2018-07-11 09:51:55
tags: [mysql]
---

[mysql 导出数据](../../../../2017/02/24/mysql-导出数据/)

<!--more-->



```mysql
mysqldump -h host -P port -u user -p databasename > databasename.sql
mysql     -h host -P port -u user -p databasename < databasename.sql

                           mysqldump -h host -P port -u user -p databasename | gzip > databasename.sql.gz
gunzip < databasename.sql.gz | mysql -h host -P port -u user -p databasename
```
