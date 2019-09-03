---
title: emacs virtualenv
date: 2019-06-03 10:37:17
tags: [emacs, virtualenv, python, tensorflow]
---

* <http://www.zmonster.me/2017/09/16/emacs-python-configuration.html#org10dd21d>
* <https://tkf.github.io/emacs-jedi/latest/>

<!--more-->

emacs 安装 jedi

emacs 配置文件

```lisp
; https://tkf.github.io/emacs-jedi/latest/
(add-hook 'python-mode-hook 'jedi:setup)
(setq jedi:complete-on-dot t)
; Install Python server
; M-x jedi:install-server in Emacs
(setq jedi:environment-root "python2_7")
```

```shell
mkdir -p      ~/.emacs.d/.python-environments/
cd            ~/.emacs.d/.python-environments/
virtualenv --system-site-packages -p /usr/bin/python2.7 python2_7
source        ~/.emacs.d/.python-environments/python2_7/bin/activate

~/.emacs.d/.python-environments/python2_7/bin/pip install --upgrade pip
~/.emacs.d/.python-environments/python2_7/bin/pip list
~/.emacs.d/.python-environments/python2_7/bin/pip install --upgrade tensorflow
# 或
~/.emacs.d/.python-environments/python2_7/bin/pip install --upgrade tensorflow -i https://pypi.tuna.tsinghua.edu.cn/simple 

python -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"

~/.emacs.d/.python-environments/python2_7/bin/pip install --upgrade ~/.emacs.d/elpa/jedi-core-20181207.1

deactivate
```





