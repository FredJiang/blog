---
title: gcc 使用
date: 2016-11-23 01:07:50
tags: [gcc, c, linux]
---

参考

* <https://www3.ntu.edu.sg/home/ehchua/programming/cpp/gcc_make.html#zz-1.5>

<!--more-->

### 报错处理

报错

`/usr/bin/ld: cannot find -lc`

运行

`yum install glibc-static`


报错

```
Company backend ’company-clang’ could not be initialized:
Company found no clang executable
```

运行

`sudo yum install clang`

