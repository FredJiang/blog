---
title: vim 安装 YouCompleteMe 错误处理
date: 2017-11-06 11:03:10
tags: [vim, YouCompleteMe, python]
---

报错

/usr/local/lib/libpython2.7.a(posixmodule.o): undefined reference to symbol 'forkpty@@GLIBC_2.2.5'

安装 python 的时候，需要 --enable-shared

<!--more-->

```
python --version
python: error while loading shared libraries: libpython2.7.so.1.0: cannot open shared object file: No such file or directory
```

```
locate libpython2.7.so.1.0
/home/nodeuser/Python-2.7.13/libpython2.7.so.1.0
/usr/local/lib/libpython2.7.so.1.0
```


```
echo $LD_LIBRARY_PATH
/opt/rh/devtoolset-2/root/usr/lib64:/opt/rh/devtoolset-2/root/usr/lib
```


```
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib               /usr/local/bin/python --version
Python 2.7.13
```


```
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/nodeuser/Python-2.7.13 /usr/local/bin/python --version
Python 2.7.13
```


`vim .zshrc`

文件头加上

```
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
```
