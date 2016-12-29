---
title: ssh 登陆
date: 2016-12-29 10:12:34
tags: [ssh, login]
---


* 添加用户

	`sudo useradd username -m`

<!--more-->

* 如果 tab 键无效

	`sudo chsh -s /bin/bash username`

* 服务器上添加公钥，然后修改权限

	```
	chmod go-w ~/
	chmod 700 ~/.ssh
	chmod 600 ~/.ssh/authorized_keys
	```

* ssh 登陆服务器

	`ssh username@ip_address`

* 如果还需要输入密码的话

	`ssh-copy-id -i username@ip_address`

* 再次

	`ssh username@ip_address`

* 修改配置文件 `/etc/ssh/sshd_config`，禁止密码登陆

	```
	PubkeyAuthentication yes
	RSAAuthentication yes
	PasswordAuthentication no
	```

* 重启

	`sudo service ssh restart`


参考

* <https://help.ubuntu.com/community/SSH/OpenSSH/Keys>