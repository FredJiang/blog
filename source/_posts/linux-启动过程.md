---
title: linux 启动过程
date: 2016-03-14 18:36:49
tags: [linux, startup, boot]
---

从按下电源按钮到出现登陆提示，有以下流程

{% asset_img "linux-boot-process.png" "" %}

<!--more-->


1. BIOS
	* BIOS是Basic Input/Output System
	* [加电自检](https://zh.wikipedia.org/zh-cn/%E5%8A%A0%E7%94%B5%E8%87%AA%E6%A3%80)，加电自检又称为开机自我检测（英文Power-on self-test，常用简称POST），是计算机BIOS的一个功能，在开机后会运行，针对计算机硬件如CPU、主板、内存等进行检测，结果会显示在固件可以控制的输出接口，像屏幕、LED、打印机等等设备上。
	* 加载[引导程序](https://zh.wikipedia.org/wiki/%E5%95%9F%E5%8B%95%E7%A8%8B%E5%BC%8F)boot loader（引导程序是指引导操作系统启动的程序。引导程序通常分为两部分：第一阶段引导程序位于主引导记录（MBR），用以引导位于某个分区上的第二阶段引导程序），BIOS寻找boot loader的顺序为软盘、光盘、硬盘。这个顺序可以在BIOS启动时改变，通过F2键或F12键（不同的BIOS版本，可能是其他键，在BIOS启动时，可以根据提示找到这个键）
	* 一旦boot loader被检测到并加载到内存中，BIOS就将控制权交给boot loader
1. [MBR](https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%BC%95%E5%AF%BC%E8%AE%B0%E5%BD%95)
	* 主引导记录（Master Boot Record，缩写：MBR），又叫做主引导扇区，是计算机开机后访问硬盘时所必须要读取的首个扇区
	* 它不依赖任何操作系统，而且启动代码也是可以改变的，从而能够实现多系统引导
	* 位于磁盘的第一扇区，一般在 /dev/hda 或 /dev/sda 上
	* 加载执行 GRUB
1. [GRUB](https://zh.wikipedia.org/zh-hant/GNU_GRUB)
	* GRUB是Grand Unified Bootloader
	* GRUB可用于选择操作系统分区上的不同内核，也可用于向这些内核传递启动参数
	* 如果有多个版本的内核在一台机器上，可以选择运行某个版本
	* GRUB 展示一个闪屏，在几秒内，如果没有操作，GRUB将根据GRUB的配置文件（/boot/grub/grub.conf）加载默认的内核
	* GRUB加载执行Kernel和initrd
1. Kernel
	* 根据文件grub.conf中的root加载根文件系统
	* 执行/sbin/init
	* init是内核执行的第一个程序，PID为1，可通过 `ps -ef | grep init` 查看
	* initrd是指一个临时文件系统，它在启动阶段被Linux内核调用，直到加载完真正的根文件系统。initrd主要用于当“根”文件系统被挂载之前，进行准备工作。它还包括一些驱动程序，用于访问硬盘驱动分区变和其他的硬件
1. Init
	* init 是 Unix 和类 Unix 系统中用来产生其它所有进程的程序。它以守护进程的方式存在，其进程号为1。
	* 根据 /etc/inittab 文件来确定 Linux 的 run level
1. Runlevel programs
	* 根据 run level 运行程序
		* Run level 0 – /etc/rc.d/rc0.d/
		* Run level 1 – /etc/rc.d/rc1.d/
		* Run level 2 – /etc/rc.d/rc2.d/
		* Run level 3 – /etc/rc.d/rc3.d/
		* Run level 4 – /etc/rc.d/rc4.d/
		* Run level 5 – /etc/rc.d/rc5.d/
		* Run level 6 – /etc/rc.d/rc6.d/


参考

* [linux-boot-process](http://www.thegeekstuff.com/2011/02/linux-boot-process/)


