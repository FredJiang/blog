---
title: sudo 输入密码
date: 2017-07-15 15:41:43
tags: [sudo, shell]
---

sudo 直接输入密码

```
cat /etc/sudoers

sudo <<< $password cat /etc/sudoers

echo $password | sudo -S cat /etc/sudoers
```

<!--more-->

passwd 直接改密码

```
echo "new_password" | sudo passwd user --stdin

echo -e "new_password\nnew_password" | sudo passwd user

echo "echo -e 'new_password\nnew_password' | sudo passwd user" | sudo bash

sshpass -p password ssh -tt user@115.28.xxx.yyy "echo \"echo -e 'new_password\nnew_password' | sudo passwd user\" | sudo bash"
```