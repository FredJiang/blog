---
title: linux 开机启动程序
date: 2016-03-29 09:50:07
tags: [linux, runlevel, subsystem]
---

[原文](http://www.tldp.org/HOWTO/HighQuality-Apps-HOWTO/boot.html)

### 开机自动启动程序


###### 从 BIOS 到子系统

先看一下 Linux 开机后发生了些什么事情：

可参考 [linux-启动过程](../../../../2016/03/14/linux-启动过程/)

1. BIOS 从硬盘加载 Linux Kernel 到内存
2. 在内存里面，Kernel 代码开始运行，检测可用设备、磁盘分区等信息
3. Kernel 挂载 /(root) 文件系统
4. Kernel 调用 init（/sbin/init）程序，并把控制权交给它
5. init 程序读取它的配置文件（/etc/inittab），/etc/inittab 定义了系统的 runlevel 和一些将要运行的脚本
6. 运行 /etc/rc.d/rc 中的脚本来初始化子系统，rc 表示 run commands


###### Subsystems


<!--more-->


子系统的例子有 web-server、data-server、OS network 层。一般不把面向用户的应用（如文本编辑器）当做子系统

Linux 提供了一种优雅的模块化的方式来组织子系统的初始化。需要注意的一点是子系统的相互依赖，比如说，在启动一个 web-server 之前需要启动 networking 子系统。

子系统被放在 /etc/init.d 和 /etc/rc.d/rcN.d 目录下

/etc/init.d

所有的子系统都会在这个目录中放一个控制程序

/etc/init.d 中的子系统

```
bash:/etc/init.d# ls -l
-rwxr-xr-x  1 root  root   9284 Aug 13  2001 functions
-rwxr-xr-x  1 root  root   4984 Sep  5 00:18 halt
-rwxr-xr-x  1 root  root   5528 Nov  5 09:44 firewall
-rwxr-xr-x  1 root  root   1277 Sep  5 21:09 keytable
-rwxr-xr-x  1 root  root    487 Jan 30  2001 killall
-rwxr-xr-x  1 root  root   7958 Aug 15 17:20 network
-rwxr-xr-x  1 root  root   1490 Sep  5 07:54 ntpd
-rwxr-xr-x  1 root  root   2295 Jan 30  2001 rawdevices
-rwxr-xr-x  1 root  root   1830 Aug 31 09:29 httpd
-rwxr-xr-x  1 root  root   1311 Aug 15 14:18 syslog
```


/etc/rc.d/rcN.d (N 表示 runlevel)

这个目录里面只包含 /etc/init.d 里面的软连接文件

/etc/rc3.d listing

```
bash:/etc/rc3.d# ls -l
lrwxrwxrwx  1 root  root     18 Jan 14 11:59 K92firewall -> ../init.d/firewall
lrwxrwxrwx  1 root  root     17 Jan 14 11:59 S10network -> ../init.d/network
lrwxrwxrwx  1 root  root     16 Jan 14 11:59 S12syslog -> ../init.d/syslog
lrwxrwxrwx  1 root  root     18 Jan 14 11:59 S17keytable -> ../init.d/keytable
lrwxrwxrwx  1 root  root     20 Jan 14 11:59 S56rawdevices -> ../init.d/rawdevices
lrwxrwxrwx  1 root  root     16 Jan 14 11:59 S56xinetd -> ../init.d/xinetd
lrwxrwxrwx  1 root  root     18 Jan 14 11:59 S75httpd -> ../init.d/httpd
lrwxrwxrwx  1 root  root     11 Jan 13 21:45 S99local -> ../rc.local
```


需要注意的是所有的链接名字有都一个前缀，K 表示从 Kill 到 deactivate，S 表示从 Start 到 activate。另外两个数字表示启动的优先级。上面的例子中 HTTPd（优先级 75）在 Network（优先级 10）之后启动，Firewalling 在当前 runlevel 中被 deactivated（K）。


重点来了：想要让你的软件在开机时自动启动，它必须是个子系统


###### 设置子系统

/etc/init.d 中子系统控制程序的例子

```
#!/bin/sh
#
# /etc/init.d/mysystem
# Subsystem file for "MySystem" server
#
# chkconfig: 2345 95 05	(1)
# description: MySystem server daemon
#
# processname: MySystem
# config: /etc/MySystem/mySystem.conf
# config: /etc/sysconfig/mySystem
# pidfile: /var/run/MySystem.pid

# source function library
. /etc/rc.d/init.d/functions

# pull in sysconfig settings
[ -f /etc/sysconfig/mySystem ] && . /etc/sysconfig/mySystem	(2)

RETVAL=0
prog="MySystem"
.
.	(3)
.

start() {	(4)
	echo -n $"Starting $prog:"
	.
	.	(5)
	.
	RETVAL=$?
	[ "$RETVAL" = 0 ] && touch /var/lock/subsys/$prog
	echo
}

stop() {	(6)
	echo -n $"Stopping $prog:"
	.
	.	(7)
	.
	killproc $prog -TERM
	RETVAL=$?
	[ "$RETVAL" = 0 ] && rm -f /var/lock/subsys/$prog
	echo
}

reload() {	(8)
	echo -n $"Reloading $prog:"
	killproc $prog -HUP
	RETVAL=$?
	echo
}

case "$1" in	(9)
	start)
		start
		;;
	stop)
		stop
		;;
	restart)
		stop
		start
		;;
	reload)
		reload
		;;
	condrestart)
		if [ -f /var/lock/subsys/$prog ] ; then
			stop
			# avoid race
			sleep 3
			start
		fi
		;;
	status)
		status $prog
		RETVAL=$?
		;;
	*)	(10)
		echo $"Usage: $0 {start|stop|restart|reload|condrestart|status}"
		RETVAL=1
esac
exit $RETVAL
```

* (1) 尽管这个是注释，但是必须得有，用于 chkconfig 命令。这一行定义了在 runlevels 为 2、3、4、5 的情况下，当前子系统将被激活且优先级为 95
* (2) 除了子系统自己的配置文件外，这个控制脚本也可以有配置文件。标准的存放位置在 /etc/sysconfig 目录下，这里的配置文件为 mySystem。这一行读取配置文件
* (4)(6)(8) 脚本可以有很多方法，start 和 stop 方法是需要实现的，用于开机和关机时被调用。其他的方法通过命令调用，而且可以定义任意多个
* (9) 定义了脚本里面的方法后，命令行会调用对应的方法
* (10) 执行脚本时如果不传参数，返回帮助信息
* (3)(5)(7) 这里可以放一些子系统的其他命令

调用方式

```
bash# service mysystem start
Starting MySystem:			[ OK ]
bash# service mysystem status
Subsysten MySystem is active with pid 1234
bash# service mysystem reload
Reloading MySystem:			[ OK ]
bash# service mysystem stop
Stopping MySystem:			[ OK ]
bash# 
```

使用 chkconfig 命令

```
bash# chkconfig --add mysystem
bash# chkconfig --del mysystem
```

###### 打包启动脚本

When you'll create the RPM, put your Subsystem script in /etc/init.d and do not include any /etc/rc.d/rcN.d link, because it is a user decision to make your subsystem automatic or not. If you include them and the user makes any change, the RPM file inventory will become inconsistent.

The symbolic links must be created and removed dynamically by the post-installation and pre-uninstallation process of your package, using the chkconfig command. This approach guarantees 100% package and filesystem consistency.