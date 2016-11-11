---
title: PostgreSQL入门
date: 2016-07-30 23:27:43
tags: [db, postgresql]
---

[在 CentOS 下安装](https://wiki.postgresql.org/wiki/YUM_Installation)

```
sudo yum update

sudo yum install postgresql-server

sudo yum install postgresql

# 初始化数据库
sudo postgresql-setup initdb

# 开机启动数据库
sudo chkconfig postgresql on

# 启动数据库
sudo service postgresql start

```

<!--more-->

#### 创建数据库

```
# 切换到用户 postgres
sudo su postgres

# 切换到 postgres 的 $HOME 目录下
cd

createdb mytestdb
```

或

```
# 切换到用户 postgres
sudo su postgres

# 打开 PostgreSQL 的 shell
psql

CREATE DATABASE mytestdb;

```

`sudo su postgres` 后需要运行 `cd` 到 postgres 的 $HOME 目录下，否则运行 `psql` 可能会报 could not change directory to "/home/xxx 的提示，也就是对当前目录没有写权限

#### 显示数据库

```
# 切换到用户 postgres
sudo su postgres

# 切换到 postgres 的 $HOME 目录下
cd

psql

\l
```

#### 常用命令

* \h：查看 SQL 命令的解释，比如 \h select。
* \?：查看psql命令列表。
* \l：列出所有数据库。
* \c [database_name]：连接其他数据库。
* \d：列出当前数据库的所有表格。
* \d [table_name]：列出某一张表格的结构。
* \du：列出所有用户。
* \conninfo：列出当前数据库和连接的信息。
