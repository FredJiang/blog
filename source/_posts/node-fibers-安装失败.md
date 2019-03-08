---
title: node fibers 安装失败
date: 2018-11-08 16:24:43
tags: [node, node-gyp]
---

> make: *** [Release/obj.target/fibers/src/fibers.o] Error 1
> node-gyp exited with code: 1

<!--more-->

```
sudo yum groupinstall -y "Development tools"
sudo yum install      -y  gcc g++ kernel-devel
```

```
CentOS release 6.9 (Final)


which gcc
/usr/bin/gcc

gcc --version
gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-23)
Copyright (C) 2010 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


PATH=/opt/rh/devtoolset-2/root/usr/bin:$PATH

which gcc
/opt/rh/devtoolset-2/root/usr/bin/gcc

gcc --version
gcc (GCC) 4.8.2 20140120 (Red Hat 4.8.2-15)
Copyright (C) 2013 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


npm install -g node-gyp
```

