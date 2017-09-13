---
title: python 源码安装
date: 2017-06-27 15:29:18
tags: [python]
---






```
sudo yum groupinstall -y "Development tools"
sudo yum install -y zlib zlib-devel openssl-devel openssl bzip2-devel ncurses-devel sqlite-devel
# sudo apt-get install -y zlib1g-dev 还未在 ubuntu 下测试
wget https://www.python.org/ftp/python/2.7.13/Python-2.7.13.tgz
tar xzf Python-2.7.13.tgz
cd Python-2.7.13
./configure
sudo make install
```


<!--more-->


`pip -V`

查看 `pip` 是否和当前 `python` 匹配，不匹配的话，重新安装 `pip`

```
wget https://bootstrap.pypa.io/get-pip.py && \
sudo python get-pip.py
```


> DEPRECATION: Python 2.6 is no longer supported by the Python core team, please upgrade your Python. A future version of pip will drop support for Python 2.6

执行 `sudo python get-pip.py` 命令，有可能用的是老版本的 `python`。
如果是用的老的版本的话，可以用 `sudo /usr/local/bin/python get-pip.py`。
我这的新 `python` 对应的路径是 `/usr/local/bin/python`。



安装 `pip` 如果遇到如下错误

```
pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available.
Collecting pip
  Could not fetch URL https://pypi.python.org/simple/pip/: There was a problem confirming the ssl certific
ate: Can't connect to HTTPS URL because the SSL module is not available. - skipping
  Could not find a version that satisfies the requirement pip (from versions: )
No matching distribution found for pip
```


参考如下链接处理

<http://blog.csdn.net/jobschen/article/details/72818473>

如果安装 `python` 后，`yum` 不能用的话



运行 `head /usr/bin/yum`，可以得知 `yum` 是一个 `python` 脚本

参考 <https://teddysun.com/473.html>


我在安装过程中，使用了 `./configure --prefix=/usr`，导致 `yum` 不能用了

```
wget https://www.python.org/ftp/python/2.7.13/Python-2.7.13.tgz && \
tar xzf Python-2.7.13.tgz && \
cd Python-2.7.13 && \
./configure --prefix=/usr && \
sudo make install
```

我这解决 yum 不能用的方式是

从另外一台配置一样的机器上，将 `yum` 和 `python` 拷贝到出问题的机器上


