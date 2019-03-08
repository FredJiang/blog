---
title: rocketmq 使用
date: 2019-01-30 17:14:51
tags: [java, rocketmq]
---

* <https://rocketmq.apache.org/docs/quick-start/>

<!--more-->

Download

```sh
cd /opt
wget https://mirrors.tuna.tsinghua.edu.cn/apache/rocketmq/4.4.0/rocketmq-all-4.4.0-bin-release.zip
unzip rocketmq-all-4.4.0-bin-release.zip
```

Start Name Server

服务端口

* 9876

```sh
nohup sh /opt/rocketmq-all-4.4.0-bin-release/bin/mqnamesrv -n "10.2.44.32:9876" > ~/mqnamesrv.log 2>&1&
```

Start Broker

服务端口

* 10909
* 10911

调整内存

`vim /opt/rocketmq-all-4.4.0-bin-release/bin/runbroker.sh`

将

`JAVA_OPT="${JAVA_OPT} -server -Xms8g -Xmx8g -Xmn4g"`

调整为

`JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g"`


```sh
cat /opt/rocketmq-all-4.4.0-bin-release/conf/broker.conf
echo 'brokerIP1 = 10.2.44.32' >> /opt/rocketmq-all-4.4.0-bin-release/conf/broker.conf
cat /opt/rocketmq-all-4.4.0-bin-release/conf/broker.conf

nohup sh /opt/rocketmq-all-4.4.0-bin-release/bin/mqbroker -n 10.2.44.32:9876 -c /opt/rocketmq-all-4.4.0-bin-release/conf/broker.conf > ~/mqbroker.log 2>&1&
```

Send & Receive Messages

```sh
NAMESRV_ADDR=10.2.44.32:9876 sh /opt/rocketmq-all-4.4.0-bin-release/bin/tools.sh org.apache.rocketmq.example.quickstart.Producer

NAMESRV_ADDR=10.2.44.32:9876 sh /opt/rocketmq-all-4.4.0-bin-release/bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```


Shutdown Servers

```
sh /opt/rocketmq-all-4.4.0-bin-release/bin/mqshutdown broker

sh /opt/rocketmq-all-4.4.0-bin-release/bin/mqshutdown namesrv

lsof -i:9876
lsof -i:10909
lsof -i:10911
```

```sh
docker \
run \
--name rocketmq-console-ng_1.0.0 \
--restart always \
-e "JAVA_OPTS=-Drocketmq.namesrv.addr=10.2.44.32:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" \
-p 8080:8080 \
-d \
registry.docker-cn.com/styletang/rocketmq-console-ng:1.0.0
```

在 java 中使用

* <https://rocketmq.apache.org/docs/simple-example/>
* <https://github.com/apache/rocketmq/tree/master/example>


