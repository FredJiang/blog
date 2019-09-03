---
title: Spring Microservices in Action
date: 2019-05-08 12:59:22
tags: [java, spring, book]
---

* <https://github.com/carnellj/spmia_overview>

<!--more-->

download code

```sh
mkdir -p ~/workspaceBook/java/spring-microservices-in-action && \
cd       ~/workspaceBook/java/spring-microservices-in-action

git clone https://github.com/carnellj/spmia_overview  & \
git clone https://github.com/carnellj/spmia-chapter1  & \
git clone https://github.com/carnellj/spmia-chapter2  & \
git clone https://github.com/carnellj/spmia-chapter3  & \
git clone https://github.com/carnellj/spmia-chapter4  & \
git clone https://github.com/carnellj/spmia-chapter5  & \
git clone https://github.com/carnellj/spmia-chapter6  & \
git clone https://github.com/carnellj/spmia-chapter7  & \
git clone https://github.com/carnellj/spmia-chapter8  & \
git clone https://github.com/carnellj/spmia-chapter9  & \
git clone https://github.com/carnellj/spmia-chapter10 & \
wait
```

install docker compose

* <https://docs.docker.com/compose/install/>

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

generate docker images

```
# If you want to compile the source code and build the Docker images for all the projects
# within a single chapter, you need to run the following at the root of the chapter
mvn clean package docker:build

# If you want to build a single service within the chapter, you can change to that specific service directory and run
mvn clean package docker:build
```

run services

* <https://docs.docker.com/compose/gettingstarted/>

```sh
cd ~/workspaceBook/java/spring-microservices-in-action/spmia-chapter1/docker/common
docker-compose -h

docker-compose up

docker-compose up -d
docker-compose stop

docker-compose ps

docker-compose logs -h
docker-compose logs --tail='100' -f simpleservice
```

test

```sh
http -v "http://127.0.0.1:8080/hello/Fred/Jiang"
```

