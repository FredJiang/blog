---
title: fail2ban 使用
date: 2017-08-08 18:54:23
tags: [fail2ban, ssh]
---

### 查看登陆失败的日志

```
sudo cat     /var/log/auth.log | grep -e 'sshd.*Failed' -e 'sshd.*Did'
sudo tail -f /var/log/auth.log | grep -e 'sshd.*Failed' -e 'sshd.*Did'
```


<!--more-->


### 安装

`sudo apt-get install -y fail2ban`


查看日志

`sudo tail -f /var/log/fail2ban.log`

### 测试

`sudo fail2ban-client ping`

如果返回 `Server replied: pong` 则安装成功

### 配置文件

```
cd /etc/fail2ban && \
sudo cp jail.conf jail.local
```

`sudo vim jail.local`

`diff jail.conf jail.local`

```
129c129
< destemail = root@localhost
---
> destemail = "270130108@qq.com"
132c132
< sender = root@localhost
---
> sender = 2638394476@qq.com
137,138c137,138
< mta = sendmail
<
---
> mta = mail
> sendmail-whois[name=SSH, dest="270130108@qq.com", sender=2638394476@qq.com]
204c204
< action = %(action_)s
---
> action = %(action_mwl)s
```


### 重启

`sudo service fail2ban restart`



### 源码安装

#### download

```
cd /opt/ && \
sudo wget "https://codeload.github.com/fail2ban/fail2ban/tar.gz/0.9.3" -O fail2ban-0.9.3.tar.gz && \
sudo tar zxvf fail2ban-0.9.3.tar.gz
```

#### install

```
cd /opt/fail2ban-0.9.3/ && \
sudo python setup.py install && \
sudo cp files/debian-initd /etc/init.d/fail2ban && \
sudo update-rc.d fail2ban defaults && \
sudo service fail2ban start
```

### 卸载

如果安装失败，可以先卸载，再重新安装

```
sudo service fail2ban stop ; \
sudo update-rc.d -f fail2ban remove ; \
sudo rm -rf /etc/fail2ban/ ; \
sudo apt-get remove --purge -y fail2ban ; \
sudo apt-get autoremove -y ; \
ls /usr/local/bin/fail2ban* ; \
sudo rm /usr/local/bin/fail2ban* ; \
ls /usr/bin/fail2ban* ; \
sudo rm /usr/bin/fail2ban*
```


* [jail0.8.11.local](./jail0.8.11.local)
* [jail0.9.3.local](./jail0.9.3.local)
* [jail0.9.4.local](./jail0.9.4.local)

参考

* <https://askubuntu.com/questions/178016/how-do-i-keep-track-of-failed-ssh-log-in-attempts>
* <https://linux.cn/article-5067-1.html>
* <https://askubuntu.com/questions/163810/fail2ban-is-not-sending-mail-when-it-bans-an-ip>

