---
title: nginx 超时 504
date: 2019-01-17 09:55:40
tags: [nginx, timeout]
---


```sh
cat /etc/nginx/proxy_params

proxy_connect_timeout   100;
proxy_send_timeout      100;
proxy_read_timeout      150;
```