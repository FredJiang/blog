---
title: kvm 安装
date: 2017-03-13 08:00:28
tags: [linux, kvm]
---


* <http://blog.topspeedsnail.com/archives/8573>
* <https://www.howtogeek.com/117635/how-to-install-kvm-and-create-virtual-machines-on-ubuntu/>
* <https://www.howtoforge.com/tutorial/kvm-on-ubuntu-14.04/>
* <https://help.ubuntu.com/community/KVM/Installation>
* <https://help.ubuntu.com/community/KVM>
* <https://help.ubuntu.com/community/KVM/VirtManager>
* <https://help.ubuntu.com/community/KVM/Installation>


安装准备

首先检查 CPU 是否支持安装 KVM：英特尔VT或AMD-V处理器才支持安装虚拟机，可用命令查看：

egrep -o '(vmx|svm)' /proc/cpuinfo

```
sudo apt-get update
sudo apt-get install -y qemu-kvm qemu-system libvirt-bin virt-manager bridge-utils vlan kvm qemu virtinst virt-viewer
```


sudo aptitude update
sudo aptitude install -y qemu-kvm qemu-system libvirt-bin virt-manager bridge-utils vlan kvm qemu virtinst virt-viewer



sudo apt-get remove -y qemu-kvm qemu-system libvirt-bin virt-manager bridge-utils vlan kvm qemu virtinst virt-viewer

sudo apt-get purge -y qemu-kvm qemu-system libvirt-bin virt-manager bridge-utils vlan kvm qemu virtinst virt-viewer

```
Setting up libvirt-bin (1.3.1-1ubuntu10.8) ...
Job for libvirt-bin.service failed because the control process exited with error code. See "systemctl status libvirt-bin.service" and "journalctl -xe" for details.
invoke-rc.d: initscript libvirt-bin, action "start" failed.
● libvirt-bin.service - Virtualization daemon
   Loaded: loaded (/lib/systemd/system/libvirt-bin.service; enabled; vendor preset: enabled)
   Active: activating (auto-restart) (Result: exit-code) since Wed 2017-03-15 19:31:19 CST; 3ms ago
     Docs: man:libvirtd(8)
           http://libvirt.org
  Process: 5454 ExecStart=/usr/sbin/libvirtd $libvirtd_opts (code=exited, status=1/FAILURE)
 Main PID: 5454 (code=exited, status=1/FAILURE)

Mar 15 19:31:19 fred-UBUNTU systemd[1]: Failed to start Virtualization daemon.
Mar 15 19:31:19 fred-UBUNTU systemd[1]: libvirt-bin.service: Unit entered failed state.
Mar 15 19:31:19 fred-UBUNTU systemd[1]: libvirt-bin.service: Failed with result 'exit-code'.
dpkg: error processing package libvirt-bin (--configure):
 subprocess installed post-installation script returned error exit status 1
Errors were encountered while processing:
 libvirt-bin
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

sudo kvm-ok

fred@fred-UBUNTU:~$ sudo kvm-ok
[sudo] password for fred:
INFO: /dev/kvm does not exist
HINT:   sudo modprobe kvm_intel
INFO: Your CPU supports KVM extensions
INFO: KVM (vmx) is disabled by your BIOS
HINT: Enter your BIOS setup and enable Virtualization Technology (VT),
      and then hard poweroff/poweron your system
KVM acceleration can NOT be used


<http://blog.fens.me/vps-kvm/>

DEL F2



qemu-kvm 和 qemu-system 是 KVM 和 QEMU 的核心包，提供 CPU、内存和 IO 虚拟化功能
libvirt-bin 就是 libvirt，用于管理 KVM 等 Hypervisor
virt-manager 是 KVM 图形化管理工具
bridge-utils 和 vlan，主要是网络虚拟化需要，KVM 网络虚拟化的实现是基于 linux-bridge 和 VLAN，后面我们会讨论。




                        
sudo virt-manager











sudo apt-get install qemu qemu-kvm qemu-system qemu-system-x86


sudo apt-get install qemu-system-common






