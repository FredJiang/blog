---
title: mysql 慢日志
date: 2016-05-26 11:18:35
tags: [db, mysql, slow, log, mysqldumpslow]
---

#### 查看相应的变量设置

`mysql> SHOW VARIABLES LIKE '%long%';`

```
+----------------------------------------------------------+-----------+
| Variable_name                                            | Value     |
+----------------------------------------------------------+-----------+
| long_query_time                                          | 10.000000 |
| performance_schema_events_stages_history_long_size       | 1000      |
| performance_schema_events_statements_history_long_size   | 1000      |
| performance_schema_events_transactions_history_long_size | 1000      |
| performance_schema_events_waits_history_long_size        | 1000      |
+----------------------------------------------------------+-----------+
```

<!--more-->


`mysql> SHOW VARIABLES LIKE '%slow%';`

```
+---------------------------+---------------------------------+
| Variable_name             | Value                           |
+---------------------------+---------------------------------+
| log_slow_admin_statements | OFF                             |
| log_slow_slave_statements | OFF                             |
| slow_launch_time          | 2                               |
| slow_query_log            | OFF                             |
| slow_query_log_file       | /var/lib/mysql/sdktest-slow.log |
+---------------------------+---------------------------------+
5 rows in set (0.01 sec)
```

`mysql> SHOW VARIABLES LIKE '%query%';`

```
+------------------------------+---------------------------------+
| Variable_name                | Value                           |
+------------------------------+---------------------------------+
| binlog_rows_query_log_events | OFF                             |
| ft_query_expansion_limit     | 20                              |
| have_query_cache             | YES                             |
| long_query_time              | 10.000000                       |
| query_alloc_block_size       | 8192                            |
| query_cache_limit            | 1048576                         |
| query_cache_min_res_unit     | 4096                            |
| query_cache_size             | 1048576                         |
| query_cache_type             | OFF                             |
| query_cache_wlock_invalidate | OFF                             |
| query_prealloc_size          | 8192                            |
| slow_query_log               | OFF                             |
| slow_query_log_file          | /var/lib/mysql/sdktest-slow.log |
+------------------------------+---------------------------------+
```

`mysql> SHOW VARIABLES LIKE '%log%';`

`mysql> SHOW VARIABLES;`


##### 修改相应变量设置

命令修改（重启数据库后，修改无效）

```
mysql> set global slow_query_log='ON';
mysql> set global long_query_time=2;
```

`set global long_query_time=2;` 测试结果为：exit 退出 mysql，重新连接，再查询 `SHOW VARIABLES LIKE '%long%';` 才有变化

修改配置文件（重启数据库，修改依然有效）

```
[mysqld]
slow_query_log = ON
long_query_time = 2
```

##### 测试

`mysql> select sleep(2.5);`


##### 分析

`mysqldumpslow -s c -t 50`