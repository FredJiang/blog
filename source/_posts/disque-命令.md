---
title: disque 命令
date: 2016-06-19 10:34:51
tags: [disque, shell]
---

##### 查看有多少队列

`/opt/project/disque/src/disque -h 127.0.0.1 qscan`

##### 查看队列长度

`/opt/project/disque/src/disque -h 127.0.0.1 qlen message_mqtt`

<!--more-->

##### 检查所有队列长度

`/opt/project/disque/src/disque -h 127.0.0.1 qscan | tail -n +2 | xargs -L1 /opt/project/disque/src/disque -h 127.0.0.1 qlen`

或

`/opt/project/disque/src/disque -h 127.0.0.1 qscan | tail -n +2 | while read -r line; do echo "$line"; /opt/project/disque/src/disque -h 127.0.0.1 qlen "$line"; done`

##### 循环查询

`while true; do /opt/project/disque/src/disque qlen disquetool_999_login; sleep 1; done`

`while true; do /opt/project/disque/src/disque jscan queue disquetool_999_login; sleep 1; done`