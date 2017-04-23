---
title: gcc 编译过程
date: 2016-11-11 13:55:15
tags: [gcc, compile]
---

<https://www3.ntu.edu.sg/home/ehchua/programming/cpp/gcc_make.html#zz-1.4>
<http://www.cnblogs.com/ggjucheng/archive/2011/12/14/2287738.html>

{% asset_img "GCC_CompilationProcess.png" "" %}

<!--more-->

hello.c

```
#include <stdio.h>

int main() {
  printf("hello, world!");
  return 0;
}
```

gcc

* -E：仅执行编译预处理
* -S：将C代码转换为汇编代码
* -c：仅执行编译操作，不进行连接操作
* -o：指定生成的输出文件
* -wall：显示警告信息

来自: http://man.linuxde.net/gcc

### 预处理

`gcc -E hello.c -o hello.i`

### 编译为汇编代码

`gcc -S hello.i -o hello.s`

在 hello.s 中，所有以 `.` 开头的行都是指导汇编器和链接器的命令。我们通常可以忽略这些行。

### 汇编

`gcc -c hello.s -o hello.o`

查看 `.o` 文件

[nm](http://man.linuxde.net/nm)

`nm -C hello.o`

用法

nm [option(s)] [file(s)]

有用的options:

* -A 在每个符号信息的前面打印所在对象文件名称；
* -C 输出demangle过了的符号名称；
* -D 打印动态符号；
* -l 使用对象文件中的调试信息打印出所在源文件及行号；
* -n 按照地址/符号值来排序；
* -u 打印出那些未定义的符号；

常见的符号类型:

* A 该符号的值在今后的链接中将不再改变；
* B 该符号放在BSS段中，通常是那些未初始化的全局变量；
* D 该符号放在普通的数据段中，通常是那些已经初始化的全局变量；
* T 该符号放在代码段中，通常是那些全局非静态函数；
* U 该符号未定义过，需要自其他对象文件中链接进来；
* W 未明确指定的弱链接符号；同链接的其他对象文件中有它的定义就用上，否则就用一个系统特别指定的默认值；


以八进制或十六进查看

[od](http://man.linuxde.net/od)

`od hello.o` 或 `od -c hello.o`


[hexdump](http://man.linuxde.net/hexdump)

`hexdump hello.o` 或 `hexdump -c hello.o`


反汇编

[objdump](http://man.linuxde.net/objdump)

`objdump -d hello.o`

### 连接

`gcc hello.o -o hello`

### 一步到位

`gcc hello.c -o hello`

### 直接到汇编

`gcc -O1 -S code.c`

* 使用编译优化级别 1 编译程序
* 级别为 1~3，级别越大优化效果越好，但编译时间越长
