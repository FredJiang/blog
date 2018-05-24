---
title: libuv 调试（一）samples socks5-proxy
date: 2018-05-23 08:29:11
tags: [libuv, node.js, c++, clion, make]
---

* <https://github.com/libuv/libuv> 
* <https://nikhilm.github.io/uvbook/introduction.html>
* <https://nikhilm.github.io/uvbook/basics.html>
* <http://nikhilm.github.io/uvbook/>

<!--more-->

安装 gyp

```
git clone https://chromium.googlesource.com/external/gyp.git
cd gyp
sudo python setup.py install
which gyp
```


下载 libuv

```
git clone https://github.com/libuv/libuv.git
```

运行示例程序

```
cd samples/socks5-proxy
make
./build/Debug/s5-proxy

telnet 127.0.0.1 1080
```

使用 clion 导入 samples/socks5-proxy 项目

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

{% asset_img "4.png" "" %}

{% asset_img "5.png" "" %}

{% asset_img "6.png" "" %}
