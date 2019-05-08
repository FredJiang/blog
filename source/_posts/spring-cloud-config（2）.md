---
title: spring cloud config（2）
date: 2019-02-16 22:41:34
tags: [spring, cloud, config]
---

* <https://www.baeldung.com/spring-cloud-configuration>

<!--more-->

下载代码

```sh
cd /Users/Fred/workspaceJava
#            https://github.com/eugenp/tutorials/tree/master/spring-cloud/spring-cloud-config
svn checkout https://github.com/eugenp/tutorials/trunk/spring-cloud/spring-cloud-config spring-cloud-config-eugenp # tree/master -> trunk
```

生成配置文件

```sh
cd ~/Desktop/spring-cloud-config/ && \
echo "user.role=Developer $(date)" > ~/Desktop/spring-cloud-config/config-client-development.properties && \
echo "user.role=User $(date)"      > ~/Desktop/spring-cloud-config/config-client-production.properties && \
git add . && \
git commit -m "no message" && \
tail -n +1 ~/Desktop/spring-cloud-config/config-client-*
```

启动服务

```sh
# <version>1.0.0</version>
cd /Users/Fred/workspaceJava/spring-cloud-config-eugenp/server && \
mvn versions:use-latest-releases && \
mvn versions:display-plugin-updates | grep 'from super-pom'

cd /Users/Fred/workspaceJava/spring-cloud-config-eugenp/server && \
mvn spring-boot:run

http "http://localhost:8888/config-client-development/default"

http "http://localhost:8888/config-client-production/default"
```

Querying the Configuration

```
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties
```

In which the {label} placeholder refers to a Git branch, {application} to the client’s application name and the {profile} to the client’s current active application profile.

测试服务

```sh
cd /Users/Fred/workspaceJava/spring-cloud-config-eugenp/client && \
mvn versions:use-latest-releases && \
mvn versions:display-plugin-updates | grep 'from super-pom'

cd /Users/Fred/workspaceJava/spring-cloud-config-eugenp/client && \
mvn spring-boot:run

http "http://localhost:8080/whoami/fred"
```

