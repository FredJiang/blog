---
title: hadoop docker（二）
date: 2018-07-25 00:05:43
tags: [docker, hadoop, docker-compose]
---

* [hadoop docker（一）](../../../../2018/07/23/hadoop-docker（一）/)
* [hadoop docker（二）](../../../../2018/07/25/hadoop-docker（二）/)

* <https://my.oschina.net/orrin/blog/1816023>
* <https://blog.csdn.net/boonya/article/details/80719245>

<!--more-->

`docker pull reg-mirror.qiniu.com/library/openjdk:8`

创建目录

```
mkdir hadoop_docker_fred
cd hadoop_docker_fred
```

下载 hadoop

```
mkdir download
cd download
wget "https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz"
tar zxvf hadoop-3.1.0.tar.gz
```

创建 Dockerfile

[修改 apt 源](https://wiki.debian.org/SourcesList)

```
FROM reg-mirror.qiniu.com/library/openjdk:8

RUN \
echo "deb http://mirrors.aliyun.com/debian stretch main" > /etc/apt/sources.list && \
echo "deb-src http://mirrors.aliyun.com/debian stretch main" >> /etc/apt/sources.list && \
echo "deb http://mirrors.aliyun.com/debian-security stretch/updates main" >> /etc/apt/sources.list && \
echo "deb-src http://mirrors.aliyun.com/debian-security stretch/updates main" >> /etc/apt/sources.list && \
echo "deb http://mirrors.aliyun.com/debian stretch-updates main" >> /etc/apt/sources.list && \
echo "deb-src http://mirrors.aliyun.com/debian stretch-updates main" >> /etc/apt/sources.list

RUN apt-get update  -y
RUN apt-get install -y openssh-client
RUN apt-get install -y openssh-server

ADD ./download/hadoop-3.1.0 /export/hadoop

COPY config/hadoop/etc/hadoop/core-site.xml   /export/hadoop/etc/hadoop/core-site.xml
COPY config/hadoop/etc/hadoop/hadoop-env.sh   /export/hadoop/etc/hadoop/hadoop-env.sh
COPY config/hadoop/etc/hadoop/hdfs-site.xml   /export/hadoop/etc/hadoop/hdfs-site.xml
COPY config/hadoop/etc/hadoop/mapred-site.xml /export/hadoop/etc/hadoop/mapred-site.xml
COPY config/hadoop/etc/hadoop/masters         /export/hadoop/etc/hadoop/masters
COPY config/hadoop/etc/hadoop/slaves          /export/hadoop/etc/hadoop/slaves  

ADD ./ssh /root/.ssh

ENV HADOOP_HOME=/export/hadoop

# https://stackoverflow.com/questions/21553353/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile
COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["tail", "-f", "/dev/null"]
```

docker-entrypoint.sh

<https://github.com/docker-library/redis/blob/master/4.0/docker-entrypoint.sh>

```
#!/bin/sh

set -e  #"Exit immediately if a simple command exits with a non-zero status."

echo "params from CMD: $@"

service ssh start

echo "exec params from CMD: $@"

exec "$@"
```


构建镜像

`docker build -t hadoop_docker_fred:v1 .`

测试镜像

```
docker run -it  hadoop_docker_fred:v1 service ssh status
docker run -it  hadoop_docker_fred:v1 /etc/init.d/ssh status
docker run -it  hadoop_docker_fred:v1 /bin/bash
docker run -d   hadoop_docker_fred:v1
```

创建 docker-compose.yml

```
version: '3'
services:
  master:
    image: "hadoop_docker_fred:v1"
    hostname: master
  slave1:
    image: "hadoop_docker_fred:v1"
    hostname: slave1
  slave2:
    hostname: slave2
    image: "hadoop_docker_fred:v1"
```


停掉之前启动的（如果之前有启动的话）

```
docker stop hadoop_docker_fred_master_1 hadoop_docker_fred_slave1_1 hadoop_docker_fred_slave2_1 || \
docker rm   hadoop_docker_fred_master_1 hadoop_docker_fred_slave1_1 hadoop_docker_fred_slave2_1
```

启动并查看

```
docker-compose up -d && \
docker-compose ps
```



