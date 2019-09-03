---
title: java jps
date: 2019-07-12 11:49:16
tags: [java, jps]
---

* <https://docs.oracle.com/javase/7/docs/technotes/tools/share/jps.html>
* <https://docs.oracle.com/en/java/javase/12/tools/tools-and-command-reference.html>

jps - Java Virtual Machine Process Status Tool

<!--more-->

If started with a hostid, it will look for JVMs on the indicated host, using the specified protocol and port. A jstatd process is assumed to be running on the target host.

The jps command uses the java launcher to find the class name and arguments passed to the main method. If the target JVM is started with a custom launcher, the class name (or JAR file name) and the arguments to the main method will not be available. In this case, the jps command will output the string Unknown for the class name or JAR file name and for the arguments to the main method.

```shell
sudo -u tomcat \
/opt/jdk1.8/bin/jps -lm

sudo -u resin \
/opt/jdk1.8/bin/jps -lm

/opt/jdk1.8/bin/jps -lm
```

报错

process information unavailable

* jps, jstack 等通过 `/tmp/hsperfdata_${USER}` 来确定正在运行的 java 进程的 pid 等信息
* 如果启动 java 进程时使用 `-Djava.io.tmpdir` 后, jps 等可能会由于找不到对应的数据而有问题
* 另外就是权限问题
