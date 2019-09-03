---
title: java jmap
date: 2019-07-15 19:22:49
tags: [java, jvm, jmap, mat, jhat]
---

```shell
jmap          15915 # 内存映射
jmap -heap    15915 # 内存映射
jmap -histo   15915 # 内存映射
```

<!--more-->

jhat

```shell
jmap -dump:format=b,file=/tmp/jmap_heap.hprof 15915
jhat -J-Xmx1024M -port 8005 /tmp/jmap_heap.hprof # Java Heap Analysis Tool，jvm 堆快照分析，默认端口 7000

# http://localhost:7000/
# http://localhost:7000/oql/
# http://localhost:7000/oqlhelp/
```

mat (Memory Analysis Tool）

```shell
jmap -dump:format=b,file=/tmp/jmap_heap.hprof 15915

# https://www.eclipse.org/mat/
# 直接用 mat 打开 /tmp/jmap_heap.hprof
```
