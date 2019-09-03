---
title: dubbo 多网卡
date: 2019-07-05 16:28:10
tags: [java, dubbo]
---

<http://dubbo.apache.org/zh-cn/blog/dubbo-network-interfaces.html>

根据 `hostname`

修改 `/etc/hosts`

```
yourIp    yourHostname
```

```shell
-Ddubbo.provider.host=10.2.44.32 -DDUBBO_IP_TO_REGISTRY=10.2.44.32 -DDUBBO_IP_TO_BIND=10.2.44.32
```
