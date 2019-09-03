---
title: Learn Microservices with Spring Boot 5
date: 2019-05-31 10:18:25
tags: [java, spring, book, jetty, rabbitmq, zuul]
---

config rabbit

* `~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/gamification/src/main/resources/application.yml`
* `~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/gateway/src/main/resources/application.yml`
* `~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/service-registry/src/main/resources/application.yml`
* `~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/social-multiplication/src/main/resources/application.yml`

```yaml
spring:
    rabbitmq:
        addresses: 127.0.0.1:5672
        username: user
        password: password
```

run

```sh
cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/ui && \
java -jar /opt/jetty-distribution-9.4.18.v20190429/start.jar
# http://127.0.0.1:9090/ui/index.html

cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/service-registry && \
mvn -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 spring-boot:run
# http://127.0.0.1:8761
# http://127.0.0.1:8761/eureka/apps/

cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/gateway && \
mvn -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 spring-boot:run
# http://127.0.0.1:8000/trace

cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/social-multiplication && \
mvn -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 spring-boot:run
cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/social-multiplication && \
mvn -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 -Drun.arguments="--server.port=8180" spring-boot:run

cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v9/gamification && \
mvn -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 spring-boot:run
# http://127.0.0.1:8081/h2-console
```
