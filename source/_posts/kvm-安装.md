---
title: kvm 安装
date: 2017-03-13 08:00:28
tags: [linux, kvm]
---

安装准备

首先检查 CPU 是否支持安装 KVM

`egrep -o '(vmx|svm)' /proc/cpuinfo`

<!--more-->

BIOS 中开起 CPU 虚拟化的支持

* Intel(R) Virtualization Technology (Enabled)
* Intel(R) VT-d Feature (Enabled)

在 ubuntu 中，没有开启的话，会有如下提示

```
fred@fred-UBUNTU:~$ sudo kvm-ok
[sudo] password for fred:
INFO: /dev/kvm does not exist
HINT:   sudo modprobe kvm_intel
INFO: Your CPU supports KVM extensions
INFO: KVM (vmx) is disabled by your BIOS
HINT: Enter your BIOS setup and enable Virtualization Technology (VT),
      and then hard poweroff/poweron your system
KVM acceleration can NOT be used
```

bios 开启截图

{% asset_img "kvm_cpu_1.jpg" "" %}

{% asset_img "kvm_cpu_2.jpg" "" %}

{% asset_img "kvm_cpu_3.jpg" "" %}



安装 kvm


```
sudo yum install -y qemu-kvm qemu-img virt-manager libvirt libvirt-python python-virtinstlibvirt-client virt-install virt-viewer bridge-utils
```

* bridge-utils：创建和管理桥接设备的工具
* kvm：相关安装包及其作用
* libvirt-client：提供客户端API用来访问server和提供管理虚拟机命令行工具的 virsh 实体
* libvirt：提供 libvirtd daemon 来管理虚拟机和控制 hypervisor
* python-virtinst：创建虚拟机所需要的命令行工具和程序库
* qemu-img：qemu 磁盘 image 管理器
* qemu-kvm：qemu 模拟器
* qemu-kvm：主要的KVM程序包
* virt-install：基于libvirt服务的虚拟机创建命令
* virt-install：用来创建虚拟机的命令行工具
* virt-manager GUI虚拟机管理工具
* virt-top：虚拟机统计命令
* virt-viewer：GUI连接程序，连接到已配置好的虚拟机

参考

* <http://www.jianshu.com/p/b5cfbafbae72>
* <http://blog.fens.me/vps-kvm/>
