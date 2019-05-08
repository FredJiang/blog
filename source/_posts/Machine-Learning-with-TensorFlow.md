---
title: Machine Learning with TensorFlow
date: 2019-04-07 10:21:34
tags: [TensorFlow, machine learning, book]
---

<http://www.allitebooks.com/machine-learning-with-tensorflow/>

<!--more-->

使用 docker 镜像

<https://www.tensorflow.org/install/docker>

```sh
sudo -H bash -c "pip3 install ansible"

/Users/Fred/workspaceAnsible/docker_install.sh

sudo apt-get update  -y && \
sudo apt-get upgrade -y && \
sudo apt-get install -y cuda-drivers
```

安装 matplotlib

<https://matplotlib.org/users/installing.html>

```sh
sudo -H bash -c "python -m pip install -U pip"
sudo -H bash -c "python -m pip install -U matplotlib"
```

下载 docker 镜像

<https://hub.docker.com/r/tensorflow/tensorflow/>

```sh
# ↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧
docker pull registry.docker-cn.com/myname/myrepo:mytag

docker pull                        tensorflow/tensorflow:1.13.1
docker pull   reg-mirror.qiniu.com/tensorflow/tensorflow:1.13.1
docker pull registry.docker-cn.com/tensorflow/tensorflow:1.13.1

# ↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧
docker \
run \
-it \
--rm \
-u $(id -u):$(id -g) \
reg-mirror.qiniu.com/tensorflow/tensorflow:1.13.1 \
bash

# ↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧
docker \
run \
-it \
--rm \
-u $(id -u):$(id -g) \
reg-mirror.qiniu.com/tensorflow/tensorflow:1.13.1 \
python -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"

# ↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧
mkdir -p ${HOME}/workspaceTensorFlow/mytest

echo "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))" > ${HOME}/workspaceTensorFlow/mytest/test.py

docker \
run \
-it \
--rm \
-u $(id -u):$(id -g) \
-v ${HOME}/workspaceTensorFlow/mytest:/mytest \
-w /mytest \
reg-mirror.qiniu.com/tensorflow/tensorflow:1.13.1 \
python ./test.py

# ↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧↧
mkdir -p ${HOME}/workspaceTensorFlow/tensorflow-jupyter/tf/notebooks

dockerstoprm tensorflow-jupyter || \
\
docker \
run \
--name tensorflow-jupyter \
--restart always \
-p 9888:8888 \
-u $(id -u):$(id -g) \
-v ${HOME}/workspaceTensorFlow/tensorflow-jupyter/tf/notebooks:/tf/notebooks \
-w /tmp \
-d \
reg-mirror.qiniu.com/tensorflow/tensorflow:1.13.1-py3-jupyter && \
\
sleep 2 && \
docker exec tensorflow-jupyter jupyter notebook list

# 启动 tensorboard（一）
docker exec -it tensorflow-jupyter /bin/bash
tensorboard --logdir=/tf/tensorboard/logs
# 启动 tensorboard（二）
docker \
run \
-it \
--rm \
--name tensorflow-tensorboard \
-p 6006:6006 \
-u $(id -u):$(id -g) \
-v ${HOME}/workspaceTensorFlow/tensorflow-jupyter/tf/notebooks:/tf/notebooks \
-w /tmp \
reg-mirror.qiniu.com/tensorflow/tensorflow:1.13.1-py3-jupyter \
tensorboard --logdir=/tf/notebooks/logs


# http://10.2.44.32:9888
# http://10.2.44.32:6006
```

下载示例代码

```sh
git clone https://github.com/BinRoot/TensorFlow-Book.git
```
