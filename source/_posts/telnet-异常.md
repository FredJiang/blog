---
title: telnet 异常
date: 2018-10-26 10:38:41
tags: [telnet, nmap]
---

* <https://stackoverflow.com/questions/25420083/some-osx-block-the-socket-call-to-port-80-until-a-complete-http-request/25482140>
* <https://blog.felipe-alfaro.com/2014/02/10/cisco-anyconnect-web-security-module-acwebsecagent-in-mac-os-x/>
* <https://discussions.apple.com/thread/7452136>
* <https://intellij-support.jetbrains.com/hc/en-us/community/posts/206194979-It-is-possible-to-bind-and-connect-to-localhost-8080-at-the-same-time-application-server-will-probably-compete-with-some-other-software-on-the-port>

```bash
sudo /opt/cisco/anyconnect/bin/websecurity_uninstall.sh
```

<!--more-->

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
GET /index.html HTTP/1.1
HOST: 127.0.0.1
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