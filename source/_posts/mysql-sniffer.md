---
title: mysql sniffer
date: 2019-08-14 10:39:00
tags: [mysql]
---

```shell
yum update -y && \
yum install -y \
                cmake \
                gcc \
                gcc-c++ \
                glib2-devel \
                libnet-devel \
                libpcap-devel \
                unzip

cd /opt
wget -O mysql-sniffer.zip "https://codeload.github.com/Qihoo360/mysql-sniffer/zip/master"
unzip mysql-sniffer.zip
ls
mv mysql-sniffer-master mysql-sniffer

mkdir -p /opt/mysql-sniffer/proj && \
cd /opt/mysql-sniffer/proj && \
cmake ../ && \
make

/opt/mysql-sniffer/proj/bin/mysql-sniffer -i eth0 -p 3306
```
