---
title: UNIX 环境高级编程 笔记 1 -- 运行程序
date: 2017-02-12 22:13:29
tags: [UNIX 环境高级编程]
---

目录结构

```
├── apuesource
└── myls.c
```

<!--more-->

myls.c 内容

```
#include "./apuesource/include/apue.h"
#include <dirent.h>

int main(int argc, char *argv[])
{
  DIR *dp;
  struct dirent *dirp;

  if (argc != 2) {
    err_quit("usage: ls directory_name");
  }

  if ((dp = opendir(argv[1])) == NULL) {
    err_sys("can't open %s", argv[1]);
  }

  while((dirp =  readdir(dp)) != NULL) {
    printf("%s\n", dirp->d_name);
  }

  closedir(dp);

  exit(0);
}
```

`#include "apue.h"` 修改为 `#include "./apuesource/include/apue.h"`

运行命令

```
cc myls.c
```

报错

```
/tmp/ccRrPasv.o: In function `main':
myls.c:(.text+0x20): undefined reference to `err_quit'
myls.c:(.text+0x5b): undefined reference to `err_sys'
collect2: error: ld returned 1 exit status
```

执行

```
➜  c git:(master) ✗ cd apuesource
➜  apuesource git:(master) ✗ make
```

```
cd ..
gcc -L./apuesource/lib myls.c -lapue
```

```
├── a.out
├── apuesource
└── myls.c
```

```
➜  c git:(master) ✗ ./a.out .
myls.c
.
a.out
..
apuesource
```