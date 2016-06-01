---
title: mysql 修改字符集
date: 2016-05-24 21:40:55
tags: [mysql, charset, utf8, utf8mb4, utf8mb4_unicode_ci, node, nodejs, sequelize]
---

在 nodejs 中，用 sequelize 模块更新数据库时，报错

```
{ [Error: ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: Incorrect string value: '\xF0\x9F\x98\x80\xEF\xA3...' for column 'username' at row 1]
  code: 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD',
  errno: 1366,
  sqlState: 'HY000',
  index: 0,
  sql: 'UPDATE `users` SET `username`=\'😀\' WHERE `id` = 17 AND `user_id` = \'xxxxxxxx\'' }
```

原因是数据库中的某个表中的 username 字段，不支持 utf8mb4 字符集

<!--more-->

解决方法就是让 username 字段支持 utf8mb4 字符集


##### 修改 database 的字符集

`ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`

注意：修改 MySQL 的默认字符集，不管是在数据库级别，还是数据表级别，对已经存储的字符数据无任何改变。只是新增的表或列，开始使用新的字符集。 

##### 转换 table 的字符集（表里面已经存在数据）

`ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

##### 转换 column 的字符集（表里面已经存在数据）

`ALTER TABLE table_name modify column_name VARCHAR(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`


##### 修改 mysql 配置文件 my.cnf

```
[client]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
```

##### 检查字符集

`SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';`

##### 参考

* <https://segmentfault.com/a/1190000000616820>
* <http://www.2cto.com/database/201203/125404.html>