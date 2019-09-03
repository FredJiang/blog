---
title: Spring Microservices in Action - 4
date: 2019-05-16 14:39:40
tags: [java, spring, book, eureka]
---

{% asset_img "eureka.png" "" %}

<!--more-->

set evn

```sh
PROFILE="dev"
CONFIGSERVER_URI="http://127.0.0.1:8888"
CONFIGSERVER_PORT="8888"
EUREKASERVER_URI="http://127.0.0.1:8761/eureka/"
EUREKASERVER_PORT="8761"
DATABASESERVER_PORT="5432"

echo $PROFILE
echo $CONFIGSERVER_URI
echo $CONFIGSERVER_PORT
echo $EUREKASERVER_URI
echo $EUREKASERVER_PORT
echo $DATABASESERVER_PORT
```

run eurekasvr

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/eurekasvr && \
mvn \
spring-boot:run
```

test eurekasvr

```sh
http -v "http://localhost:8761"

http -v "http://localhost:8761/eureka/apps/"
```

modify confsvr

~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/config/licensingservice/licensingservice-dev.yml

```yaml
spring.datasource.url: "jdbc:postgresql://127.0.0.1:5432/eagle_eye_dev"
spring.datasource.username: "postgres_dev"
spring.datasource.password: "postgres_dev_password"
```

modify confsvr

~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/application.yml

```yaml
server:
    port: 8888
spring:
    profiles:
        active: native
    cloud:
        config:
            server:
                native:
                    searchLocations: file:///home/fred/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/config/licensingservice,
                                     file:///home/fred/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/config/organizationservice
```

run confsvr

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr && \
mvn \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
spring-boot:run
```

test confsvr

```sh
http -v "http://localhost:8888/licensingservice/dev"
```

run licensing-service

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/licensing-service && \
mvn \
-Dserver.port=8080 \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
-Dspring.cloud.config.uri=$CONFIGSERVER_URI \
-Dspring.profiles.active=$PROFILE \
spring-boot:run
```

test licensing-service

```sh
http -v "http://localhost:8080/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a/licenses/"

http -v "http://localhost:8080/v1/tools/eureka/services"
```

run organization-service

```sh
cp ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/config/licensingservice/licensingservice-dev.yml \
   ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/config/organizationservice/organizationservice-dev.yml

cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/organization-service && \
mvn \
-Dserver.port=8085 \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
-Dspring.cloud.config.uri=$CONFIGSERVER_URI \
-Dspring.profiles.active=$PROFILE \
spring-boot:run

cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/organization-service && \
mvn \
-Dserver.port=8086 \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
-Dspring.cloud.config.uri=$CONFIGSERVER_URI \
-Dspring.profiles.active=$PROFILE \
spring-boot:run
```

test organization-service

```sh
http -v "http://localhost:8085/env"

http -v "http://localhost:8085/info"

http -v "http://localhost:8085/health"

http -v "http://localhost:8761/eureka/apps/organizationservice"

http -v "http://localhost:8085/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a"
```
