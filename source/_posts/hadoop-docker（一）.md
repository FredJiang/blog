---
title: hadoop docker（一）
date: 2018-07-23 19:33:28
tags: [docker, hadoop, docker-compose]
---

* [hadoop docker（一）](../../../../2018/07/23/hadoop-docker（一）/)
* [hadoop docker（二）](../../../../2018/07/25/hadoop-docker（二）/)

<!--more-->

* [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
* [Overview of Docker Compose](https://docs.docker.com/compose/overview/)

下载 openjdk 镜像

```bash
docker pull reg-mirror.qiniu.com/library/openjdk:8
```

创建 Dockerfile


```
FROM reg-mirror.qiniu.com/library/openjdk:8

WORKDIR /export/

RUN wget "https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz"
RUN mkdir /export/hadoop
RUN tar zxvf hadoop-3.1.0.tar.gz -C hadoop --strip-components 1

ENV HADOOP_HOME=/export/hadoop
```


或提前下载 hadoop

```
wget "https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz"
tar zxvf hadoop-3.1.0.tar.gz
```

创建 Dockerfile

```
FROM reg-mirror.qiniu.com/library/openjdk:8

ADD hadoop-3.1.0 /export/hadoop

ENV HADOOP_HOME=/export/hadoop
```


构建镜像

`docker build -t hadoop_docker_fred:v1 .`

前台测试镜像

`docker run -it hadoop_docker_fred:v1 /bin/bash`

后台测试镜像

```
docker \
run \
--name hadoop_docker_fred \
-itd \
hadoop_docker_fred:v1
```


[安装 docker-compose](https://docs.docker.com/compose/install/)

```bash
# sudo curl -L      https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo curl   -L https://get.daocloud.io/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

[创建 docker-compose.yml](https://docs.docker.com/compose/gettingstarted/)

```
version: '3'
services:
  hadoop_docker_fred_master:
    build: .
  hadoop_docker_fred_slave_1:
    build: .
  hadoop_docker_fred_slave_2:
    build: .
```

使用 build 比较慢，直接使用已经创建的 image

```
version: '3'
services:
  hadoop_docker_fred_master:
    image: "hadoop_docker_fred:v1"
  hadoop_docker_fred_slave_1:
    image: "hadoop_docker_fred:v1"
  hadoop_docker_fred_slave_2:
    image: "hadoop_docker_fred:v1"
```


启动

`docker-compose up -d`

查看

`docker-compose ps`

