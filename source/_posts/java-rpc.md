---
title: java rpc
date: 2019-02-04 13:43:40
tags: [java, rpc]
---

Remote Procedure Call 

* <http://ws.apache.org/xmlrpc/client.html>
* <http://ws.apache.org/xmlrpc/server.html>

<!--more-->

```sh
cd ~/workspaceJava/rpc/rpcprovider

# 使用 IntelliJ 中的 tomcat 启动
```


```sh
cd ~/workspaceJava/rpc/rpcconsumer

mvn clean compile exec:java -Dexec.cleanupDaemonThreads=false -Dexec.mainClass=com.fred.Consumer

mvn clean compile exec:java -Dexec.cleanupDaemonThreads=false -Dexec.mainClass=com.fred.ConsumerFactory
```
