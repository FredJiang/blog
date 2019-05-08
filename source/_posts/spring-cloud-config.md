---
title: spring cloud config
date: 2019-02-13 21:47:18
tags: [spring, cloud, config]
---

* <https://spring.io/guides/gs/centralized-configuration/>
* <https://github.com/spring-guides/gs-centralized-configuration>
* <http://cloud.spring.io/spring-cloud-config/single/spring-cloud-config.html>

<!--more-->

下载代码

```sh
cd ~/workspaceJava/
git clone https://github.com/spring-guides/gs-centralized-configuration.git spring-cloud-config-spring-guides
```

根据文件

`cat ~/workspaceJava/spring-cloud-config-spring-guides/complete/configuration-service/src/main/resources/application.properties`

生成配置文件

```sh
mkdir ~/Desktop/spring-cloud-config
cd    ~/Desktop/spring-cloud-config
git init
touch application.properties # 默认
touch a-bootiful-client.properties # ~/workspaceJava/spring-cloud-config-spring-guides/complete/configuration-client/src/main/resources/bootstrap.properties -> spring.application.name

cd ~/Desktop/spring-cloud-config/ && \
echo "message = Hello world (a-bootiful-client.properties) $(date)" > ~/Desktop/spring-cloud-config/a-bootiful-client.properties && \
git add . && \
git commit -m "no message" && \
cat ~/Desktop/spring-cloud-config/a-bootiful-client.properties
```

启动服务

```sh
cd ~/workspaceJava/spring-cloud-config-spring-guides/complete/configuration-service && \
mvn spring-boot:run

http "http://localhost:8888/a-bootiful-client/default"
```

测试服务

```sh
cd ~/workspaceJava/spring-cloud-config-spring-guides/complete/configuration-client && \
mvn spring-boot:run

http "http://localhost:8080/message"
```

更新配置文件

```sh
cd ~/Desktop/spring-cloud-config/ && \
echo "message = Hello world (a-bootiful-client.properties) $(date)" > ~/Desktop/spring-cloud-config/a-bootiful-client.properties && \
git add . && \
git commit -m "no message" && \
cat ~/Desktop/spring-cloud-config/a-bootiful-client.properties

http "http://localhost:8080/message"

curl "http://localhost:8080/actuator/refresh" -d "{}" -H "Content-Type: application/json"

http "http://localhost:8080/message"
```
