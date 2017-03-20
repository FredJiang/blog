---
title: centos 禁止 mongo 开机启动
date: 2016-10-09 14:50:25
tags: [mongo, centos, startup]
---

<https://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-services-chkconfig.html>

<!--more-->


```
chkconfig --list | grep mongo
chkconfig --level 345 mongod off
```
