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


### 运行命令

```
wget "http://mirrors.ustc.edu.cn/gnu/emacs/emacs-25.1.tar.gz"
tar -zxvf emacs-25.1.tar.gz
cd emacs-25.1
./configure
sudo make install
```

```
cd && \
git clone https://github.com/FredJiang/.emacs.d.git && \
cd .emacs.d && \
git submodule init && \
git submodule update && \
emacs
```

### 错误处理

#### centos

执行 `./configure ` 遇到了 `configure: error: The required function `tputs' was not found in any library.`

运行 `sudo yum install ncurses-devel` 解决问题

#### ubuntu

<http://ergoemacs.org/emacs/building_emacs_on_linux.html>

先安装

```
sudo apt-get install build-essential
sudo apt-get build-dep emacs24
```


