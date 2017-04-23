---
title: libuv 事件循环
date: 2017-03-31 20:15:19
tags: [libuv, node.js]
---

参考

* <https://github.com/libuv/libuv>
* <https://nikhilm.github.io/uvbook/basics.html#hello-world>
* <http://neethack.com/2013/01/understand-event-loops/>
* [node 事件驱动机制](../../../../2016/03/11/node-事件驱动机制/)

<!--more-->

安装依赖

```
sudo yum install -y libtool
```

下载并编译 libuv 库

```
git clone https://github.com/libuv/libuv.git
cd libuv
sh autogen.sh
./configure
make
make check
sudo make install
```

hello world 代码

```
#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

int main() {
    uv_loop_t *loop = malloc(sizeof(uv_loop_t));
    uv_loop_init(loop);

    printf("Now quitting.\n");
    uv_run(loop, UV_RUN_DEFAULT);

    uv_loop_close(loop);
    free(loop);
    return 0;
}
```

编译并运行代码

```
gcc -o main main.c /usr/local/lib/libuv.a -pthread
./main
```

输出

`Now quitting.`

