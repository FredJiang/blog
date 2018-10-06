---
title: TensorFlow（二）
date: 2018-08-29 13:41:41
tags: [TensorFlow, machine learning]
---

* <https://tensorflow.googlesource.com/tensorflow/+/master/tensorflow/g3doc/tutorials/mnist/>
* <https://tensorflow.googlesource.com/tensorflow/+/master/tensorflow/g3doc/tutorials/mnist/beginners/index.md>
* <http://www.tensorfly.cn/tfdoc/tutorials/mnist_download.html>
* <https://www.cnblogs.com/denny402/p/5852689.html>
* <https://www.youtube.com/playlist?list=PLjSwXXbVlK6IHzhLOMpwHHLjYmINRstrk>

<!--more-->

```bash
cd ~/tensorflow
git clone --recurse-submodules https://github.com/tensorflow/tensorflow
git describe
# 0.6.0-39065-gc010fec6ab
```

测试代码

```bash
cd ~/tensorflow/tensorflow/tensorflow/examples/tutorials/mnist/
vim download_data.py
```

download_data.py 内容如下

```python
import input_data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

print "mnist.train.images.shape " + str(mnist.train.images.shape)
print "mnist.train.labels.shape " + str(mnist.train.labels.shape)
print "mnist.validation.images.shape " + str(mnist.validation.images.shape)
print "mnist.validation.labels.shape " + str(mnist.validation.labels.shape)
print "mnist.test.images.shape " + str(mnist.test.images.shape)
print "mnist.test.labels.shape " + str(mnist.test.labels.shape)
```

运行 TensorFlow

```
cd ~/tensorflow/tensorflow/tensorflow/examples/tutorials/mnist/

source ~/tensorflow/bin/activate

python download_data.py

python mnist_softmax.py --data_dir MNIST_data

deactivate
```
