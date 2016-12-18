---
title: UNIX 网络编程 笔记 1 -- 运行程序
date: 2016-11-12 12:36:06
tags: [socket, unix, network, UNIX 网络编程]
---


### 运行代码

第一章的内容看了, 代码也看了, 接着就要把代码跑起来, 具体研究下代码的逻辑

参考 <http://hipercomer.blog.51cto.com/4415661/932671> 把代码运行起来

<!--more-->

将 `/Users/Fred/Desktop/unix/network/unpv13e/intro/daytimetcpcli.c`

中的 `#include	"unp.h"` 改为 `#include	"../lib/unp.h"`


由于开发环境是 mac, 在 `cp libunp.a /usr/lib` 时遇到了报错, 自己又有个云主机, 就通过以下方式, 在 mac 上编辑代码, 在云主机上运行代码

```
#!/bin/bash

while true; \
do \
rsync -avz --exclude={.idea,.DS_Store,*~,*#} /Users/Fred/Desktop/unix/ fred@remote:/home/fred/unix/ \
; \
sleep 5; \
done;
```

### 补充

* emacs 中 c 代码 reformat 
	* <https://www.emacswiki.org/emacs/ReformatBuffer>

* `gcc server.c -o server -lunp`
	* `-lunp`: 表示链接静态库 libunp.a
	* [gcc-使用](../../../../2016/11/23/gcc-使用/)
