---
title: mysql 创建用户
date: 2016-05-24 12:25:43
tags: [mysql, create, new, user]
---

#### 创建用户

`CREATE USER fred IDENTIFIED BY 'password';`

<!--more-->

新创建的用户，默认情况下是没有任何权限的

#### 查看用户权限

`mysql> show grants for fred;`

```
+----------------------------------+
| Grants for fred@%                |
+----------------------------------+
| GRANT USAGE ON *.* TO 'fred'@'%' |
+----------------------------------+
```

`mysql> show grants for root@localhost;`

```
+---------------------------------------------------------------------+
| Grants for root@localhost                                           |
+---------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |
| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |
+---------------------------------------------------------------------+
```

#### 给用户分配权限
语法：grant 权限 on 数据库.数据表 to '用户'@'主机名';


`grant all on mydb.* to 'fred'@'%';`

`mysql> show grants for fred@'%';`

```
+------------------------------------------------+
| Grants for fred@%                              |
+------------------------------------------------+
| GRANT USAGE ON *.* TO 'fred'@'%'               |
| GRANT ALL PRIVILEGES ON `mydb`.* TO 'fred'@'%' |
+------------------------------------------------+
```