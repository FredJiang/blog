---
title: java rmi
date: 2019-02-01 18:42:24
tags: [java, rmi]
---

Remote Method Invocation

* <https://www.tutorialspoint.com/java_rmi/index.htm>

<!--more-->

{% asset_img "1.png" "" %}

Start the rmi registry

```sh
cd ~/workspaceJava/rmi/rmiprovider && \
mvn clean compile && \
cd ~/workspaceJava/rmi/rmiprovider/target/classes/ && \
rmiregistry
```

```sh
cd ~/workspaceJava/rmi/rmiprovider/target/classes/ && \
java com.fred.Provider
```

```sh
cd ~/workspaceJava/rmi/rmilist && \
mvn clean compile && \
cd ~/workspaceJava/rmi/rmilist/target/classes/ && \
java com.fred.List
```

```sh
cd ~/workspaceJava/rmi/rmiconsumer && \
mvn clean compile && \
cd ~/workspaceJava/rmi/rmiconsumer/target/classes/ && \
java com.fred.Consumer
```
