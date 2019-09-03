---
title: emacs 源码安装
date: 2016-11-16 11:49:19
tags: [emacs, install, source code]
---

<https://www.gnu.org/software/emacs/manual/html_node/efaq/Installing-Emacs.html>

<!--more-->

* 打开 <https://www.gnu.org/software/emacs/manual/html_node/efaq/Current-GNU-distributions.html#Current-GNU-distributions>
* 点击 <ftp://ftp.gnu.org/pub/gnu>
* 点击 [emacs](ftp://ftp.gnu.org/pub/gnu/emacs/)
* wget 相应的版本
* 再看 <https://www.gnu.org/software/emacs/manual/html_node/efaq/Installing-Emacs.html>

### ubuntu

<http://ergoemacs.org/emacs/building_emacs_on_linux.html>

安装依赖

```sh
sudo apt-get update  -y && \
sudo apt-get upgrade -y && \
sudo apt-get install -y \
                        build-essential \
                        gnutls-dev \
                        libgif-dev \
                        libncurses-dev \
                        libtiff-dev \
                        libxpm-dev

apt-cache search emacs | grep '^emacs'

sudo apt-get build-dep emacs25
# E: You must put some 'source' URIs in your sources.list
# sudo cp /etc/apt/sources.list       /etc/apt/sources.listbackup
# sudo cp /etc/apt/sources.listbackup /etc/apt/sources.list
# sudo sed -Ei 's/^# deb-src /deb-src /' /etc/apt/sources.list
# sudo apt-get update -y

sudo apt-get install -y emacs25
```

### centos

安装依赖

```sh
sudo yum update  -y && \
sudo yum upgrade -y && \
sudo yum install -y \
                    epel-release \
                    ncurses-devel \
                    yum-utils

sudo yum-builddep emacs
```

安装 emacs

```sh
wget "http://mirrors.ustc.edu.cn/gnu/emacs/emacs-26.2.tar.gz" && \
tar -zxvf emacs-26.2.tar.gz && \
cd emacs-26.2
./configure --without-x # 非桌面版
./configure             # 桌面版
sudo make install
```

emacs 更新插件

<kbd>M-x</kbd> `package-refresh-contents` 

或

`rm -rf ~/.emacs.d/elpa`
