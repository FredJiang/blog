---
title: 安装指定版本的 git
date: 2017-05-12 17:36:31
tags: [git]
---


参考 <https://www.digitalocean.com/community/tutorials/how-to-install-git-on-centos-7>

<!--more-->

源码下载地址 <https://github.com/git/git/releases>

当前机器系统 `CentOS release 6.8 (Final)`

相应命令

```
sudo yum install curl-devel
sudo yum install perl-ExtUtils-MakeMaker
wget https://github.com/git/git/archive/v2.1.2.tar.gz -O git.tar.gz
tar -zxf git.tar.gz
cd git-2.1.2
make configure
./configure --prefix=/usr/local
sudo make install
```