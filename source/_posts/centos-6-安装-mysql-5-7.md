---
title: centos 6 安装 mysql 5.7
date: 2016-11-11 14:31:31
tags: [centos, mysql, rpm]
---

```
wget "http://dev.mysql.com/get/mysql57-community-release-el6-9.noarch.rpm"
sudo rpm -ivh mysql57-community-release-el6-9.noarch.rpm
sudo yum install -y mysql-community-client mysql-community-server
sudo /etc/init.d/mysqld start
# 找到 mysql 的默认的 root 密码
sudo grep -i temporary /var/log/mysqld.log
mysql -u root -p
# 输入密码
```

<!--more-->


进入 mysql

```
mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('YourPassword');
```

参考

* <http://dev.mysql.com/doc/refman/5.7/en/linux-installation-yum-repo.html>
* <https://opensourcedbms.com/dbms/installing-mysql-5-7-on-centosredhatfedora/>