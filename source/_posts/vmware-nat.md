---
title: vmware nat
date: 2019-01-14 23:33:15
tags: [windows, vmware, nat]
---

<https://hitchhikingtheweb.wordpress.com/2014/09/02/portforwarding-with-vmware-player-and-nat/>

需要管理员权限

```sh
net stop "VMWare NAT Service"
net start "VMWare NAT Service"
```

<!--more-->

<https://docs.vmware.com/cn/VMware-Workstation-Pro/15.0/com.vmware.ws.using.doc/GUID-C2EC7B92-A499-4B47-95B6-0BFDDA28AC34.html>

重要：

制作 NAT 配置文件的备份副本。如果编辑了 NAT 配置文件，而后又使用了虚拟网络编辑器，您所做的编辑可能会丢失。

改了配置文件在 GUI 里面体现不出来，注意备份
