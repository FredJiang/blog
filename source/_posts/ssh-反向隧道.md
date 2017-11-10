---
title: ssh 反向隧道
date: 2017-03-20 10:20:04
tags: [ssh]
---

[ssh forward port](../../../../2017/02/28/ssh-forward-port/)

<!--more-->

### 内网机器为 ubuntu 环境

在内网的机器上

`sudo apt-get install -y openssh-server`

`sudo service ssh status`

`ssh-keygen`

将 id_rsa.pub 放到外网的机器上，然后

`ssh -p 22 -R 8022:127.0.0.1:22 fred@外网ip`

或

```
sudo apt-get install autossh -y
autossh -p 22 -M 8021 -fNR 8022:127.0.0.1:22 fred@外网ip
```

在外网的机器上

`ssh localhost -p 8022`

设为开机启动

```
ls -l /etc/rc.local
sudo chmod +x /etc/rc.local
vim /etc/rc.local
```

```
#!/bin/sh
su -c 'autossh -p 22 -M 8021 -fNR 8022:127.0.0.1:22 fred@外网ip' - fred
```

```
# 检查配置文件是否正确，测试时，写绝对路径
sudo service rc.local start
```


### 内网机器为 centos 环境

在内网机器上

```
sudo yum install -y wget gcc make
wget http://www.harding.motd.ca/autossh/autossh-1.4e.tgz
tar -xf autossh-1.4e.tgz
cd autossh-1.4e
./configure
make
sudo make install
```

开机启动

```
sudo chmod +x /etc/rc.d/rc.local
sudo vim /etc/rc.d/rc.local
```

添加

```
#!/bin/sh
su -c 'autossh -p 22 -M 8021 -fNR 8022:127.0.0.1:22 fred@外网ip' - fred
```


参考

* <http://blog.huzhifeng.com/2016/09/04/autossh/>