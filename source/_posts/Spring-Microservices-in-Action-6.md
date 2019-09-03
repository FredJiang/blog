---
title: Spring-Microservices-in-Action-6
date: 2019-05-20 19:15:00
tags: [java, spring, book, eureka]
---

run eurekasvr

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/eurekasvr && \
mvn \
spring-boot:run
```

test eurekasvr

```sh
http -v "http://localhost:8761"

http -v "http://localhost:8761/eureka/apps/"
```

modify confsvr

```sh
cp -r ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter4/confsvr/src/main/resources/config/ \
      ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/config/

cd ~/workspaceBook/java/spring-microservices-in-action/
git clone https://github.com/carnellj/config-repo.git

cp -r ~/workspaceBook/java/spring-microservices-in-action/config-repo/authenticationservice \
      ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/config/ && \
cp -r ~/workspaceBook/java/spring-microservices-in-action/config-repo/specialroutesservice \
      ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/config/ && \
cp -r ~/workspaceBook/java/spring-microservices-in-action/config-repo/zuulservice \
      ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/config/
```

modify confsvr

~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/application.yml

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
                    searchLocations: file:///home/fred/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/config/licensingservice,
                                     file:///home/fred/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr/src/main/resources/config/organizationservice
```

run confsvr

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/confsvr && \
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
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/licensing-service && \
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
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/organization-service && \
mvn \
-Dserver.port=8085 \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
-Dspring.cloud.config.uri=$CONFIGSERVER_URI \
-Dspring.profiles.active=$PROFILE \
spring-boot:run

# 或

cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/orgservice-new && \
mvn \
-Dserver.port=8085 \
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

run specialroutes-service

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/specialroutes-service && \
mvn \
-Dserver.port=8910 \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
-Dspring.cloud.config.uri=$CONFIGSERVER_URI \
-Dspring.profiles.active=$PROFILE \
spring-boot:run
```

test specialroutes-service

```sh
http -v "http://localhost:8910/env"
```

run zuulsvr

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter6/zuulsvr && \
mvn \
-Dserver.port=5555 \
-Deureka.client.serviceUrl.defaultZone=$EUREKASERVER_URI \
-Dspring.cloud.config.uri=$CONFIGSERVER_URI \
-Dspring.profiles.active=$PROFILE \
spring-boot:run
```

test zuulsvr

```sh
http -v "http://localhost:8080/v1/tools/eureka/services"

http -v "http://localhost:5555/routes"

http -v                         "http://localhost:8080/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a/licenses/"
http -v    "http://localhost:5555/api/licensingservice/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a/licenses/"

http -v                         "http://localhost:8085/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a"
http -v "http://localhost:5555/api/organizationservice/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a"
```
