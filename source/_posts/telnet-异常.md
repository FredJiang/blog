---
title: telnet 异常
date: 2018-10-26 10:38:41
tags: [telnet, nmap]
---

`ip.src == 192.168.1.20 || ip.dst == 192.168.1.20`



DISTRIB_DESCRIPTION="Ubuntu 18.04.1 LTS"

```bash
nmap 192.168.1.20

nmap 127.0.0.1

telnet 192.168.1.20 443
telnet 192.168.1.20 80
telnet 192.168.1.20 8080
telnet 192.168.1.20 3128
```


```bash
nmap 192.168.1.20

nmap 127.0.0.1

sudo lsof -i:80
sudo lsof -i:8080
sudo lsof -i:3128
sudo lsof -i:3128

telnet 192.168.1.20 443
telnet 192.168.1.20 80
telnet 192.168.1.20 8080
telnet 192.168.1.20 3128
```



```bash
telent 192.168.1.20         80

nc     192.168.1.20         80

hping3 192.168.1.20 -S -V -p 80

nmap   192.168.1.20       -p 80
```