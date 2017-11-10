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

格式化显示时间

`date "+%Y-%m-%d %H:%M:%S"`

以上命令在 centos 上也能用