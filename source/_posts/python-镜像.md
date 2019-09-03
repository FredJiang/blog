---
title: python 镜像
date: 2019-06-03 13:10:04
tags: [python, mirror, pip]
---

* <https://mirror.tuna.tsinghua.edu.cn/help/pypi/>

<!--more-->

```sh
python -m site

pip list
pip config list
```

直接使用镜像

```sh
pip install --upgrade tensorflow -i https://pypi.tuna.tsinghua.edu.cn/simple
```

全局配置镜像

```sh
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

```sh
cat        ~/.pip/pip.conf
cat ~/.config/pip/pip.conf
```

```conf
[global]
trusted-host = mirrors.aliyun.com
index-url = https://mirrors.aliyun.com/pypi/simple
```