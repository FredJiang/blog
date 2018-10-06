---
title: nginx 权限错误
date: 2018-09-27 20:06:22
tags: [nginx, linux]
---

* <https://stackoverflow.com/questions/6795350/nginx-403-forbidden-for-all-files>
* <https://en.wikipedia.org/wiki/Security-Enhanced_Linux>

<!--more-->

> 2018/09/26 10:00:44 [error] 15077#0: *2 "/path/index.html" is forbidden (13: Permission denied), client: 127.0.0.1, server: 127.0.0.1, request: "GET / HTTP/1.1", host: "127.0.0.1"

SELINUX

```bash
restorecon -r /path
```