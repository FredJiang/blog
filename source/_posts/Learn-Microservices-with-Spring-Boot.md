---
title: Learn Microservices with Spring Boot
date: 2019-05-28 10:14:09
tags: [java, spring, book, jetty]
---

* <https://github.com/microservices-practical>

<!--more-->

download code

```sh
mkdir -p ~/workspaceBook/java/learn-microservices-with-spring-boot && \
cd       ~/workspaceBook/java/learn-microservices-with-spring-boot

git clone https://github.com/microservices-practical/microservices-v1.git  & \
git clone https://github.com/microservices-practical/microservices-v2.git  & \
git clone https://github.com/microservices-practical/microservices-v3.git  & \
git clone https://github.com/microservices-practical/microservices-v4.git  & \
git clone https://github.com/microservices-practical/microservices-v5.git  & \
git clone https://github.com/microservices-practical/microservices-v6.git  & \
git clone https://github.com/microservices-practical/microservices-v7.git  & \
git clone https://github.com/microservices-practical/microservices-v8.git  & \
git clone https://github.com/microservices-practical/microservices-v9.git  & \
git clone https://github.com/microservices-practical/microservices-v10.git & \
wait
```

install jetty

<http://www.eclipse.org/jetty/download.html>

```sh
cd /opt/
aria2c -x16 "https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-distribution/9.4.18.v20190429/jetty-distribution-9.4.18.v20190429.tar.gz"
tar zxvf jetty-distribution-9.4.18.v20190429.tar.gz

mkdir -p /opt/jetty-distribution-9.4.18.v20190429/webapps/test
echo 'hello jetty!' > mkdir -p /opt/jetty-distribution-9.4.18.v20190429/webapps/test/index.html

cd /opt/jetty-distribution-9.4.18.v20190429 && \
java -jar start.jar
# http://127.0.0.1:8080/test/index.html
```

install rabbit

```sh
docker info

docker pull rabbitmq:3.7.8-management

docker \
run \
--hostname rabbitmq_management_3.7.8 \
--name rabbitmq_management_3.7.8 \
--restart always \
-e RABBITMQ_DEFAULT_USER=user \
-e RABBITMQ_DEFAULT_PASS=password \
-p 15672:15672 \
-p 5672:5672 \
-d \
rabbitmq:3.7.8-management

# http://127.0.0.1:15672
```

config rabbit

* `~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v6/social-multiplication/src/main/resources/application.yml`
* `~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v6/gamification/src/main/resources/application.yml`

```yaml
spring:
    rabbitmq:
        addresses: 127.0.0.1:5672
        username: user
        password: password
```

run

```sh
cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v6/ui && \
java -jar /opt/jetty-distribution-9.4.18.v20190429/start.jar
# http://127.0.0.1:9090/ui/index.html

cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v6/social-multiplication && \
./mvnw -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 spring-boot:run

cd ~/workspaceBook/java/learn-microservices-with-spring-boot/microservices-v6/gamification && \
./mvnw -Dmaven.test.skip=true -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 spring-boot:run
```
