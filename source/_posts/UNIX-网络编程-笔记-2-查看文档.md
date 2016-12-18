---
title: UNIX 网络编程 笔记 2 -- 查看文档
date: 2016-11-24 00:06:57
tags: [socket, unix, network, UNIX 网络编程]
---

开发环境

操作系统

```
LSB Version:	:core-4.1-amd64:core-4.1-noarch
Distributor ID:	CentOS
Description:	CentOS Linux release 7.2.1511 (Core) 
Release:	7.2.1511
Codename:	Core
```

编辑器

```
GNU Emacs 25.1.1
Copyright (C) 2016 Free Software Foundation, Inc.
GNU Emacs comes with ABSOLUTELY NO WARRANTY.
You may redistribute copies of GNU Emacs
under the terms of the GNU General Public License.
For more information about these matters, see the file named COPYING.
```

<!--more-->


### 查看文档

以文件 daytimetcpcli.c 为例

* 把光标停在 `struct sockaddr_in servaddr;` 中 的 `sockaddr_in `
* 执行 <kbd>M-x</kbd> semantic-ia-fast-jump 
* 或者在 `init.el` 中添加 `(global-set-key (kbd "C-c j") 'semantic-ia-fast-jump)` 使用快捷键 <kbd>C-c j</kbd>
* <kbd>C-x C-b</kbd>, 查看当前 buffer 的路径
* 查看 socket 文档, 如图

	{% asset_img "dash.png" "" %}


	
