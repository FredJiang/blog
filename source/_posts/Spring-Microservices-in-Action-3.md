---
title: Spring Microservices in Action - 3
date: 2019-05-14 11:27:13
tags: [java, spring, book]
---

modify confsvr

~/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/confsvr/src/main/docker/Dockerfile

```diff
 :-    curl -k -LO "http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip" -H 'Cookie: oraclelicense=accept-securebackup-cookie' && \
6:+    curl -L -b "oraclelicense=a" http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip -O && \
```

modify confsvr

~/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/confsvr/src/main/resources/config/licensingservice/licensingservice-dev.yml

```yaml
spring.datasource.url: "jdbc:postgresql://127.0.0.1:5432/eagle_eye_dev"
spring.datasource.username: "postgres_dev"
spring.datasource.password: "postgres_dev_password"

redis.server: "127.0.0.1"
```

modify confsvr

~/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/confsvr/src/main/resources/application.yml

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
                    searchLocations: file:///home/fred/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/confsvr/src/main/resources/config/licensingservice,
                                     file:///home/fred/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/confsvr/src/main/resources/config/organizationservice
```

run confsvr

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/confsvr && \
mvn \
spring-boot:run
```

test confsvr

```sh
http -v "http://localhost:8888/env"
http -v "http://localhost:8888/licensingservice/default"
http -v "http://localhost:8888/licensingservice/dev"
```

generate docker images

```sh
docker ps -a


docker \
run \
--restart always \
-d \
--name postgres_9.5 \
-p 5432:5432 \
-e POSTGRES_USER=postgres_dev \
-e POSTGRES_PASSWORD=postgres_dev_password \
-e POSTGRES_DB=eagle_eye_dev \
postgres:9.5


docker \
run \
--restart always \
-d \
--name dpage_pgadmin4_4.6 \
-p 6432:80 \
-e "PGADMIN_DEFAULT_EMAIL=postgres_dev@domain.com" \
-e "PGADMIN_DEFAULT_PASSWORD=postgres_dev_password" \
dpage/pgadmin4:4.6


docker \
run \
--restart always \
-d \
--name redis_5.0.4 \
-p 6379:6379 \
redis:5.0.4
```

run licensing-service

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter3/licensing-service && \
mvn \
-Dspring.profiles.active=dev \
spring-boot:run
```

test licensing-service

```sh
http -v "http://localhost:8080/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a/licenses/"
http -v "http://localhost:8080/v1/organizations/e254f8c-c442-4ebe-a82a-e2fc1d1ff78a/licenses/f3831f8c-c338-4ebe-a82a-e2fc1d1ff78a"

http -v "http://localhost:8080/refresh"
```
