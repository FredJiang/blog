---
title: install mycli
date: 2017-07-07 00:16:06
tags: [mysql, phthon, mycli, pip]
---


机器环境

* CentOS release 6.8 (Final)
* Python 2.6.6


<!--more-->

参考这两个地址，一直没安装成功

* <http://mycli.net/>
* <http://mycli.net/install>


换如下命令，成功了，为啥？

不知道。。。

```
sudo yum update  -y && \
sudo yum install -y libevent-devel && \
sudo yum install -y python-devel && \
sudo yum install -y python-pip  && \
sudo yum install -y python-setuptools && \
sudo pip install argparse && \
sudo pip install mycli

# sudo pip install mycli==1.8.1
```