---
title: docker 创建子网
date: 2016-08-16 20:13:45
tags: [docker, network]
---

##### 需求

需要搭建一个包含 9 台服务器的测试环境，这 9 台服务器是通过内网相互访问的。我手里就一台机器，所以这里我利用 docker 模拟 9 台服务器，并且通过内网 ip 将它们链接起来。

<!--more-->


##### 创建子网

* <https://docs.docker.com/engine/userguide/networking/>
* <https://docs.docker.com/engine/reference/commandline/network_create/>

用 `docker network ls` 查看 docker 的网络情况

创建网络

```
docker network create \
--subnet 192.168.10.0/24 \
gamesdktest
```

`ifconfig` 的输出除了

```
docker0   Link encap:Ethernet  HWaddr 02:42:a1:3e:e5:3c  
          inet addr:172.17.0.1  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::42:a1ff:fe3e:e53c/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:558246 errors:0 dropped:0 overruns:0 frame:0
          TX packets:643364 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:252692483 (252.6 MB)  TX bytes:1090105921 (1.0 GB)
```

还会多出一个

```
br-d38c787673c5 Link encap:Ethernet  HWaddr 02:42:80:75:98:c8  
          inet addr:192.168.10.1  Bcast:0.0.0.0  Mask:255.255.255.0
          inet6 addr: fe80::42:80ff:fe75:98c8/64 Scope:Link
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:1059 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1305 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:132020 (132.0 KB)  TX bytes:2625177 (2.6 MB)
```

如果在你的测试环境中 192.168.10.1 是你想要的，你可以指定 geteway，把 192.168.10.1 留出来

```
docker network create \
--subnet 192.168.10.0/24 \
--gateway 192.168.10.50 \
gamesdktest
```

##### 测试

启动两个 container

`docker run --net gamesdktest --ip 192.168.10.2 -it centos /bin/bash`

`docker run --net gamesdktest --ip 192.168.10.3 -it centos /bin/bash`


相互 ping `ping 192.168.10.2` `ping 192.168.10.3` 是可以的，就说明成功了




