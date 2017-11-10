---
title: tig 使用
date: 2017-09-15 22:30:26
tags: [tig, git]
---

### 安装

#### centos

```
sudo yum install -y asciidoc xmlto
git clone https://github.com/jonas/tig.git
cd tig
make prefix=/usr/local
sudo make install prefix=/usr/local
# sudo make install-doc # 会安装到 /root 下
make install-doc
```

#### ubuntu

```
sudo apt-get install -y tig
```

#### mac

```
brew install tig
```

<!--more-->

### 使用


`tig --help`

或

`tig` then `h`

退出

* <http://jonas.nitro.dk/tig/manual.html>
* <https://jonas.github.io/tig/doc/manual.html>


