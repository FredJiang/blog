---
title: java jmx
date: 2019-07-25 17:50:24
tags: [java, jvm, jmx]
---

tomcat/bin/catalina.sh

```shell
JAVA_OPTS="$JAVA_OPTS
-Xmx512m
-Xms256m
-Xmn64m
-Ddubbo.shutdown.hook=true
-Dcom.sun.management.jmxremote.port=20885
-Dcom.sun.management.jmxremote.rmi.port=20885
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
-Djava.rmi.server.hostname=10.3.246.187"
```
