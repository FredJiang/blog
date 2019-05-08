---
title: spring cloud bus
date: 2019-02-14 10:18:35
tags: [spring, cloud, bus]
---

* <https://www.baeldung.com/spring-cloud-bus>

<!--more-->

下载代码

```sh
cd /Users/Fred/workspaceJava
#            https://github.com/eugenp/tutorials/tree/master/spring-cloud-bus
svn checkout https://github.com/eugenp/tutorials/trunk/spring-cloud-bus spring-cloud-bus # tree/master -> trunk
cd /Users/Fred/workspaceJava/spring-cloud-bus
```

去掉 pom 中的 `<parent>` 节点，设置 dependency 和 plugin 的版本

启动服务

```sh
# <version>1.0.0</version>
cd /Users/Fred/workspaceJava/spring-cloud-bus/spring-cloud-config-server && \
mvn versions:use-latest-releases && \
mvn versions:display-plugin-updates | grep 'from super-pom'

cd /Users/Fred/workspaceJava/spring-cloud-bus/spring-cloud-config-server && \
mvn spring-boot:run

http "http://localhost:8888/config-client-development/default"

http "http://localhost:8888/config-client-production/default"

http "http://localhost:8888/actuator/monitor"
```

测试服务

```sh
cd /Users/Fred/workspaceJava/spring-cloud-bus/spring-cloud-config-client && \
mvn versions:use-latest-releases && \
mvn versions:display-plugin-updates | grep 'from super-pom'

cd /Users/Fred/workspaceJava/spring-cloud-bus/spring-cloud-config-client && \
mvn spring-boot:run --debug # Set debug = true or debug: true in your properties/yml. It can also be passed as an argument --debug.

http "http://localhost:8080/whoami/fred"
```
