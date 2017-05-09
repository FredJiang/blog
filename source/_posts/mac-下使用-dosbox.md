---
title: mac 下使用 dosbox
date: 2017-04-24 21:13:34
tags: [dosbox, masm, assembly]
---


参考

* <http://www.ifmicro.com/linux-masm-built/>
* <http://www.tecmint.com/dosbox-runs-old-ms-dos-games-and-programs-in-linux/>


<!--more-->

下载 dosbox

<http://www.dosbox.com/download.php?main=1>


安装 dosbox

在 mac 下，直接双击 dmg 就能安装

下载 MASM

<https://jaist.dl.sourceforge.net/project/masm611/MASM611/masm611.rar>

解压到目录 `/Users/Fred/Desktop/masm`

下载 debug

* <https://sites.google.com/site/pcdosretro/enhdebug>
* <https://sites.google.com/site/pcdosretro/enhdebug/DEBUGX.ZIP?attredirects=0>


打开 `DOSBox.app`

关闭 `DOSBox.app`

修改文件 `/Users/Fred/Library/Preferences/DOSBox 0.74 Preferences`

```
[autoexec]
# Lines in this section will be run at startup.
# You can put your MOUNT lines here.
mount C: /Users/Fred/Desktop/masm
C:
PATH C:\masm611\BIN;C:\masm611\BINR;C:\DEBUGX;%PATH%;
# cd assembly
```


打开 `DOSBox.app`

安装 masm 

```
cd masm611/disk1
setup
```



编写汇编文件，目录结构如下

```
masm
├── DEBUGX
│   ├── DEBUG.COM
├── assembly
│   └── hello.asm
└── masm611
    ├── BIN
    │   ├── MASM.EXE
    ├── BINR
    │   ├── LINK.EXE
```

hello.asm

```
assume cs:codes, ds:datas
datas segment
		str db 'hello,world',13,10,'$'
datas ends
codes segment
	start:
		mov ax, datas
		mov ds, ax
		lea dx, str
		mov ah, 9
		int 21h
		mov ah, 4ch
		int 21h
codes ends
	end start
```


```
masm hello.asm
```


```
link hello.obj
```


```
hello.exe
```



debug 的使用

* R 查看、改变 CPU 寄存器的内容
* D 查看内存中的内容
* E 改写内存中的内容
* U 将内存中的机器指令翻译成汇编指令
* T 执行一条机器指令
* A 以汇编指令的格式在内存中写入一条机器指令