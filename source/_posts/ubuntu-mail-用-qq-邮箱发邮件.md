---
title: ubuntu mail 用 qq 邮箱发邮件
date: 2017-08-08 10:28:21
tags: [email, smtp, ubuntu]
---


### Ubuntu 16.04

先用 `which mail` 看看有没有 `mail`

如果没有的话，可以安装如下软件

`sudo apt-get install -y heirloom-mailx`

有了 `mail` 后，直接用命令行测试

<!--more-->

```
echo "mail body" | \
mail -v \
-s "subject" \
-S form=2638394476@qq.com \
-S smtp-auth-password=youpassword \
-S smtp-auth-user=2638394476@qq.com \
-S smtp-auth=login \
-S smtp-use-starttls \
-S smtp=smtps://smtp.qq.com:465 \
-S ssl-verify=ignore \
270130108@qq.com
```

或

```
echo "mail body" | \
mail -v \
-r 2638394476@qq.com \
-s "subject" \
-S smtp-auth-password=youpassword \
-S smtp-auth-user=2638394476@qq.com \
-S smtp-auth=login \
-S smtp-use-starttls \
-S smtp=smtps://smtp.qq.com:465 \
-S ssl-verify=ignore \
270130108@qq.com
```

注意，这里用的是 `smtps://smtp.qq.com:465`



在配置文件里面配置账号

首先找到相应的配置文件

```
strings `which mail` | grep '\.rc'
```

`sudo vim /etc/s-nail.rc`

在文件末尾添加

```
set from=2638394476@qq.com
set smtp-auth-password=youpassword
set smtp-auth-user=2638394476@qq.com
set smtp-auth=login
set smtp=smtps://smtp.qq.com:465
set ssl-verify=ignore
```

测试

`echo "mail body" | mail -s "subject1" 270130108@qq.com`


### Ubuntu 14.04

`sudo vim /etc/nail.rc`

在文件末尾添加

```
set from=2638394476@qq.com
set smtp-auth-password=youpassword
set smtp-auth-user=2638394476@qq.com
set smtp-auth=login
set smtp=smtps://smtp.qq.com:465
set ssl-verify=ignore
```

测试

`echo "mail body" | mail -s "subject2" 270130108@qq.com`



### CentOS 7.2

<https://bbs.aliyun.com/read/316576.html?spm=5176.7935156.0.0.djxwEg>


`sudo vim /etc/mail.rc`

在文件末尾添加

```
set from=2638394476@qq.com
set nss-config-dir=/etc/pki/nssdb
set smtp-auth-password=youpassword
set smtp-auth-user=2638394476@qq.com
set smtp-auth=login
set smtp=smtps://smtp.qq.com:465
set ssl-verify=ignore
```

测试

`echo "mail body" | mail -s "subject3" 270130108@qq.com`


参考

* [zabbix 配置邮件](../../../../2017/01/10/zabbix-配置邮件/)
* <https://www.techforgeek.info/send_mail_from_terminal.html>
* <https://bbs.archlinuxcn.org/viewtopic.php?id=4786>
