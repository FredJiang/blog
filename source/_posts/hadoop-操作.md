---
title: hadoop 操作
date: 2018-07-20 23:29:56
tags: [db, hadoop, mapReduce]
---

在 Pseudo Distributed Mode 下

<!--more-->

```
$HADOOP_HOME/bin/hdfs namenode -format # 格式化文件系统

$HADOOP_HOME/sbin/start-all.sh

$HADOOP_HOME/bin/hadoop fs -help
$HADOOP_HOME/bin/hadoop fs -ls /
$HADOOP_HOME/bin/hadoop fs -mkdir -p /user/input
$HADOOP_HOME/bin/hadoop fs -put /home/hadoop/file.txt /user/input
$HADOOP_HOME/bin/hadoop fs -cat /user/input/file.txt
$HADOOP_HOME/bin/hadoop fs -get /user/input/file.txt /home/hadoop

$HADOOP_HOME/sbin/stop-all.sh
```




