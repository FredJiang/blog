---
title: 添加 sudo 权限
date: 2016-05-30 14:16:29
tags: [linux, sudo, user, ssh]
---

##### 添加用户

`sudo adduser abc`

<!--more-->

##### 给用户添加 sudo 权限

`sudo visudo`

```
root    ALL=(ALL:ALL) ALL
abc     ALL=(ALL:ALL) ALL
```