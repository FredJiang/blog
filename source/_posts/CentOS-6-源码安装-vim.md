---
title: CentOS 6 源码安装 vim
date: 2017-11-03 21:12:35
tags: [centos, vim, editor]
---

sudo yum remove -y vim-enhanced vim-common vim-filesystem

<!--more-->

```
sudo yum update -y \
&& \
sudo yum groupinstall -y 'Development Tools' \
&& \
sudo yum install -y \
ctags \
gcc \
git \
lua \
lua-devel \
luajit \
luajit-devel \
make \
mercurial \
ncurses-devel \
perl \
perl-devel \
perl-ExtUtils-CBuilder \
perl-ExtUtils-Embed \
perl-ExtUtils-ParseXS \
perl-ExtUtils-XSpp \
python \
python-devel \
python3 \
python3-devel \
ruby \
ruby-devel \
tcl-devel
```




如果 python3 安装失败

通过 `yum search python3` 找到合适的包，然后安装

或用源码安装

```
wget "https://www.python.org/ftp/python/3.4.3/Python-3.4.3.tar.xz"

tar xf Python-3.4.3.tar.xz

cd ~/Python-3.4.3 \
&& \
./configure --prefix=/usr/local --enable-shared \
&& \
make && sudo make install
```

由

```
which python # /usr/local/bin/python
python --version # Python 2.7.13
```

得到

--with-python-config-dir=/usr/local/lib/python2.7/config \

由

```
which python3 # /usr/local/bin/python3
python3 --version # Python 3.4.3
```

得到

--with-python3-config-dir=/usr/local/lib/python3.4/config-3.4m \



```
git clone https://github.com/vim/vim.git

cd ~/vim \
&& \
sudo make clean \
&& \
./configure \
--disable-gui \
--enable-cscope \
--enable-luainterp=yes \
--enable-multibyte \
--enable-perlinterp=yes \
--enable-python3interp=yes \
--enable-pythoninterp=yes \
--enable-rubyinterp=yes \
--prefix=/usr/local \
--with-features=huge \
--with-python-config-dir=/usr/local/lib/python2.7/config \
--with-python3-config-dir=/usr/local/lib/python3.4/config-3.4m \
&& \
sudo make && sudo make install \
&& \
vim --version | grep python
```


看 vim 是否支持 python

* - 不支持
* + 支持


<http://harttle.com/2017/06/01/compile-vim8-centos6.html>







