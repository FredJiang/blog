---
title: iptables 转发请求
date: 2017-07-10 15:00:04
tags: [iptables, firewall, forward]
---

```
sudo iptables -t nat -I PREROUTING -p tcp --dport 3306  -j DNAT --to 192.168.1.10
sudo iptables -t nat -I PREROUTING -p tcp --dport 27017 -j DNAT --to 192.168.1.10
```
