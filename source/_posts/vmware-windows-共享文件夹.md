---
title: vmware windows 共享文件夹
date: 2017-10-17 12:38:55
tags: [windows, vmware, ubuntu, ssh, share]
---

先安装 VMWare tools

<https://docs.vmware.com/cn/VMware-Workstation-Pro/12.0/com.vmware.ws.using.doc/GUID-08BB9465-D40A-4E16-9E15-8C016CC8166F.html>

```
sudo apt-get update  -y && \
sudo apt-get upgrade -y && \
sudo apt-get install -y open-vm-tools-dkms && \
sudo apt-get install -y open-vm-dkms

mkdir /mnt/cdrom # 如果没有这个目录的话
mount | grep cdrom
sudo mount /dev/cdrom /mnt/cdrom # 如果上一句没有输出的话

cp /mnt/cdrom/VMwareTools-10.0.0-2977863.tar.gz /tmp
cd /tmp
tar zxvf VMwareTools-10.0.0-2977863.tar.gz
cd vmware-tools-distrib
sudo ./vmware-install.pl
```

<!--more-->

`mount -t vmhgfs .host:/shared /mnt/hgfs`

shared 为 `vmware-hgfsclient` 返回的结果

在 `/etc/fstab` 中添加

这句失败了

`.host:/shared    /mnt/hgfs    vmhgfs defaults 0 0`

{% asset_img "QQ20171017-211224.png" "" %}

{% asset_img "QQ20171017-211351.png" "" %}

{% asset_img "QQ20171017-211419.png" "" %}
