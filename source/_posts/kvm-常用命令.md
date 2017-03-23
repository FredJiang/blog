---
title: kvm 常用命令
date: 2017-03-20 19:29:59
tags: [kvm, command]
---


### KVM 虚拟机默认配置文件位置：

`/etc/libvirt/qemu/`

### KVM 虚拟机开机自启动目录：

`/etc/libvirt/qemu/autostart/`

<!--more-->

### KVM 相关命令

```
virsh list --all // 查看所有虚拟机
virsh start vm_name // 开机虚拟机
virsh shutdown vm_name // 关闭虚拟机
virsh resume vm_name // 恢复虚拟机
virsh suspend vm_name // 暂停虚拟机
virsh destroy vm_name // 删除虚拟机
virsh autostart vm_name // 开机自启动虚拟机
virsh create /etc/libvirt/qemu/vm_name.xml // 通过配置文件启动虚拟机
```

### 获取虚拟机的 ip 地址

```
virsh list --all
 Id    Name                           State
----------------------------------------------------
 1     centos7.0                      running
```

```
arp -an | grep $(cat /etc/libvirt/qemu/centos7.0.xml | grep "mac address" | cut -d "'" -f 2)
```

### 查看虚拟机镜像

```
[root@pwrd-net-10-8-6-216 images]# pwd
/var/lib/libvirt/images
[root@pwrd-net-10-8-6-216 images]# ls
CentOS-7.0-1406-x86_64-DVD.iso  centos7.0.qcow2
[root@pwrd-net-10-8-6-216 images]# qemu-img info centos7.0.qcow2
image: centos7.0.qcow2
file format: qcow2
virtual size: 40G (42949672960 bytes)
disk size: 7.7G
cluster_size: 65536
Format specific information:
    compat: 1.1
    lazy refcounts: false
[root@pwrd-net-10-8-6-216 images]# qemu-img info CentOS-7.0-1406-x86_64-DVD.iso
image: CentOS-7.0-1406-x86_64-DVD.iso
file format: raw
virtual size: 3.9G (4148166656 bytes)
disk size: 3.9G
```


### kvm 磁盘扩容（以下操作有问题）

```
[root@localhost ~]# df -h
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root  7.6G  7.0G  613M  93% /
devtmpfs                 486M     0  486M   0% /dev
tmpfs                    497M     0  497M   0% /dev/shm
tmpfs                    497M  6.6M  490M   2% /run
tmpfs                    497M     0  497M   0% /sys/fs/cgroup
/dev/vda1                497M  151M  347M  31% /boot
tmpfs                    100M     0  100M   0% /run/user/0
```

需要扩容 `/dev/mapper/centos-root`

#### 扩容 1（本机上失败了。。。）

找到 kvm 的镜像

```
[root@pwrd-net-10-8-6-216 images]# ls /var/lib/libvirt/images
CentOS-7.0-1406-x86_64-DVD.iso  centos7.0.qcow2
```

安装相应工具

`yum install -y libguestfs-tools`

关闭虚拟机

```
# 新建一个足够大的镜像
qemu-img create -f qcow2 kvm_temp.qcow2 40G
# 使用 virt-size 扩容
virt-resize --expand /dev/mapper/centos-root centos7.0.qcow2 kvm_temp.qcow2
rm centos7.0.qcow2
mv kvm_temp.qcow2 centos7.0.qcow2
```

#### 扩容 2

<http://www.jianshu.com/p/6f8e0ea2b664>





在虚拟机上

```
[root@localhost ~]# fdisk -l

Disk /dev/vda: 53.7 GB, 53687091200 bytes, 104857600 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x00098008

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048    45061375    22529664   83  Linux
/dev/vda2        45061376   104855167    29896896   83  Linux

Disk /dev/mapper/centos-swap: 968 MB, 968884224 bytes, 1892352 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-root: 18.9 GB, 18903728128 bytes, 36921344 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

[root@localhost ~]# df -h
Filesystem               Size  Used Avail Use% Mounted on
devtmpfs                 473M     0  473M   0% /dev
tmpfs                    497M     0  497M   0% /dev/shm
tmpfs                    497M  6.6M  490M   2% /run
tmpfs                    497M     0  497M   0% /sys/fs/cgroup
/dev/mapper/centos-root   18G   12G  5.9G  67% /
/dev/vda1                497M  245M  253M  50% /boot
tmpfs                    100M     0  100M   0% /run/user/0
```


关闭虚拟机


```
qemu-img resize centos7.0.qcow2 +20G
virsh start centos7.0
fdisk /dev/vda
xfs_growfs /dev/vda2
```

```
pvs
lvextend -r /dev/mapper/centos-root /dev/vda2
```



