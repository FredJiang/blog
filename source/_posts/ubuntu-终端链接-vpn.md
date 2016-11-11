---
title: ubuntu 终端链接 vpn
date: 2016-08-26 14:39:15
tags: [ubuntu, vpn]
---

[原文出处](http://blog.csdn.net/chenqp7/article/details/50505924) <http://blog.csdn.net/chenqp7/article/details/50505924>

#### 安装VPN客户端

`sudo apt-get install pptp-linux`

<!--more-->

#### 创建VPN账号并连接

```
sudo pptpsetup --create vpn_name --server xxx.xxx.xxx.xxx --username vpn_user --password vpn_password --encrypt --start
# --create 表示创建的连接（VPN账号）名称
# --encrypt 表示该连接需要加密
# --start 表示创建完成后立即连接
```

#### 检查连接是否成功

```
ifconfig
# 若有ppp0（或pppN，N为数字）的信息，则表示连接成功
```


#### 添加路由

`sudo route add yyy.yyy.yyy.yyy gw xxx.xxx.xxx.xxx`

yyy.yyy.yyy.yyy 为我想要通过 vpn 链接的 ip 地址，default 为所有的 ip

如果想通过 vpn 发送所有消息

`sudo route add default dev ppp0`


#### 断开 vpn

`sudo poff vpn_name`

#### 链接 vpn

`sudo pon vpn_name`

#### 开机打开 vpn

在 `/etc/rc.local` 文件中添加相应的命令