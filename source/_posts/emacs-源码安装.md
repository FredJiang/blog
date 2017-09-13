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


安装 emacs

```
wget "http://mirrors.ustc.edu.cn/gnu/emacs/emacs-25.2.tar.gz"
tar -zxvf emacs-25.2.tar.gz
cd emacs-25.2
# 桌面版
./configure
# 非桌面版
# ./configure --without-x
sudo make install
```

下载配置文件

```
cd && \
git clone https://github.com/FredJiang/.emacs.d.git && \
cd .emacs.d && \
git submodule init && \
git submodule update && \
./setup.sh
```

安装其他工具

```
npm -g install js-beautify
```

```
# mac 下
brew install clang-format
sudo yum install -y clang
```

```
wget "https://jaist.dl.sourceforge.net/project/cscope/cscope/15.8b/cscope-15.8b.tar.gz"
tar -zxf cscope-15.8b.tar.gz
cd cscope-15.8b
./configure
make
sudo make install
sudo cp contrib/xcscope/cscope-indexer /usr/local/bin/
sudo chmod +x /usr/local/bin/cscope-indexer
cp contrib/xcscope/xcscope.el ~/.emacs.d/mypackages/
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


#### emacs

报错

> File error: http://stable.melpa.org/packages/async-1.9.tar, Not found


在 emacs 中运行如下命令

<kbd>M-x</kbd> `package-refresh-contents` 


