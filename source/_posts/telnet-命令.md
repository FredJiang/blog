---
title: telnet 命令
date: 2018-09-07 11:43:11
tags: [telnet, tcpdump]
---

<https://en.wikipedia.org/wiki/HTTP_message_body>

<!--more-->

```sh
sudo tcpdump -i any port 4500

sudo tcpdump -i any port 4500 -X -vv

# 长连接
telnet 127.0.0.1 4500
GET /index.html HTTP/1.1
HOST: 127.0.0.1

# 短连接
telnet 127.0.0.1 4500
GET /index.html HTTP/1.0
HOST: 127.0.0.1

# 长连接
telnet 127.0.0.1 4500
GET /index.html HTTP/1.0
HOST: 127.0.0.1
Connection:Keep-Alive
```