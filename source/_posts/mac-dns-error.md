---
title: mac dns error
date: 2018-12-06 16:48:26
tags: [mac, network, dns]
---

原因：ipv6 的 nameserver 有问题

<!--more-->

处理方法

删除 `/etc/resolv.conf` 中 ipv6 的 nameserver

清理 DNS 缓存

`sudo killall -HUP mDNSResponder;say DNS cache has been flushed`

或者直接禁止 ipv6

```bash
host -a  www.xxx.com

ping     www.xxx.com

nslookup www.xxx.com

dig      www.xxx.com
```
