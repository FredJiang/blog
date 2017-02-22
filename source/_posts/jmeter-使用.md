---
title: jmeter 使用
date: 2017-02-20 15:16:06
tags: [test, jmeter]
---


jmeter 能做什么，看这里 <http://jmeter.apache.org/>


<!--more-->

### 下载

下载页面 <http://jmeter.apache.org/download_jmeter.cgi>

```
wget "http://mirrors.hust.edu.cn/apache//jmeter/binaries/apache-jmeter-3.1.tgz"
tar zxvf apache-jmeter-3.1.tgz
cd apache-jmeter-3.1
```


* [本地使用](#本地使用)
* [使用局域网内的其他机器测试](#使用局域网内的其他机器测试)
* [使用外网的机器测试](#使用外网的机器测试)


### 本地使用

首先打开软件

```
./bin/jmeter
```

会打开一个如下的 GUI 界面

{% asset_img "start.png" "" %}


添加线程

{% asset_img "add-thread.png" "" %}

配置线程

{% asset_img "config-thread.png" "" %}

添加 http 测试

{% asset_img "add-http.png" "" %}

配置 http 测试（我这是 https 的，用的 443 端口）

{% asset_img "config-http.png" "" %}

添加测试结果的查看方式

{% asset_img "add-listner.png" "" %}

保存配置（注意保存的是整个 Test Plan）

{% asset_img "save.png" "" %}

开始测试

{% asset_img "start-http.png" "" %}

查看测试结果

{% asset_img "test-result.png" "" %}


### 使用局域网内的其他机器测试

在局域网内的其他机器上（我这是 10.8.6.216）

```
wget "http://mirrors.hust.edu.cn/apache//jmeter/binaries/apache-jmeter-3.1.tgz"
tar zxvf apache-jmeter-3.1.tgz
cd apache-jmeter-3.1
./bin/jmeter-server -Djava.rmi.server.hostname=10.8.6.216
```

在本机上修改文件 `bin/jmeter.properties`

```
remote_hosts=10.8.6.216
```

本机重新打开 jmeter

`./bin/jmeter`

打开上次保存的 Test Plan

{% asset_img "open-config.png" "" %}

{% asset_img "choose-config.png" "" %}

{% asset_img "run-remote.png" "" %}

在 10.8.6.216 上

{% asset_img "server-result.png" "" %}




### 使用外网的机器测试


登陆外网服务器

```
ssh \
-R 25000:127.0.0.1:25000 \
-L 24002:127.0.0.1:24002 \
-L 26002:127.0.0.1:26002 \
fred@host
```

在外网机器上修改文件 `bin/jmeter.properties`

```
server_port=24002
server.rmi.localhostname=127.0.0.1
server.rmi.localport=26002
```

本机配置

```
remote_hosts=10.8.6.216,127.0.0.1:24002
client.rmi.localport=25000
mode=Statistical
```

在外网服务器运行

```
./bin/jmeter-server -Djava.rmi.server.hostname=127.0.0.1
```



本机开始测试

{% asset_img "server-outer.png" "" %}


测试结果（局域网内，耗时 2s，远程服务器，耗时 17m 。。。）

{% asset_img "remote-result.png" "" %}



参考

* <https://www.artofsoftwaredevelopment.com/performance/performance-testing-in-the-cloud-with-jmeter-aws>

