---
title: ubuntu 调时间
date: 2016-12-09 09:10:29
tags: [linux, ubuntu, time, date]
---

`sudo date -s "2016-12-01 10:05:59"`

<!--more-->

如果不生效

```
sudo timedatectl set-ntp false
sudo date -s "2016-12-01 10:05:59"
```

同步时间

`sudo ntpdate ntp.ubuntu.com`

如果报错
<https://blog.csdn.net/c77_cn/article/details/45741831>

> 21 Aug 11:30:30 ntpdate[25092]: the NTP socket is in use, exiting


则

`sudo ntpdate -u ntp.ubuntu.com`

或

```
# sudo /etc/init.d/ntpd status
# sudo /etc/init.d/ntpd stop

sudo service ntpd status
sudo service ntpd stop
sudo ntpdate ntp.ubuntu.com
sudo service ntpd restart
```




格式化显示时间

`date "+%Y-%m-%d %H:%M:%S"`

以上命令在 centos 上也能用



