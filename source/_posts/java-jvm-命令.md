---
title: java jvm 命令
date: 2019-07-15 16:35:17
tags: [java, jvm]
---

```shell
ls -lh $JAVA_HOME/bin

jps -lmv



jstat -class  15915
jstat -gcutil 15915
jstat -xxxxxx 15915

jinfo         15915 # 配置信息
jstack        15915 # java 堆栈跟踪
```
