---
title: TensorFlow（一）
date: 2018-08-29 12:19:01
tags: [TensorFlow, machine learning]
---

<http://www.tensorfly.cn/tfdoc/get_started/introduction.html>

<!--more-->

下载与安装

```bash
sudo apt-get install -y python-pip python-dev python-virtualenv
virtualenv --system-site-packages ~/tensorflow
cd ~/tensorflow
source ~/tensorflow/bin/activate

# https://mirror.tuna.tsinghua.edu.cn/help/tensorflow/
pip install --upgrade https://mirrors.tuna.tsinghua.edu.cn/tensorflow/linux/cpu/tensorflow-1.10.0-cp27-none-linux_x86_64.whl
# pip install \
#   -i https://pypi.tuna.tsinghua.edu.cn/simple/ \
#   https://mirrors.tuna.tsinghua.edu.cn/tensorflow/linux/cpu/tensorflow-1.10.0-cp27-none-linux_x86_64.whl

# 停用 virtualenv
deactivate
```

测试代码

```bash
vim ~/tensorflow/test.py
```
~/tensorflow/test.py 内容如下

```python
import tensorflow as tf
hello = tf.constant('Hello, TensorFlow!')
sess = tf.Session()
print sess.run(hello)
a = tf.constant(10)
b = tf.constant(32)
print sess.run(a+b)
```

运行 TensorFlow

```bash
source ~/tensorflow/bin/activate
python ~/tensorflow/test.py
```