---
title: ansible ad-hoc command
date: 2017-07-14 22:09:29
tags: [ansible, ad-hoc, command]
---

* <https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html>
* <https://ryaneschinger.com/blog/ansible-quick-start/>

<!--more-->

By default, Ansible looks for an inventory file at `/etc/ansible/hosts`

也可以在运行的时候，指定一个 inventory file

准备一个文件 inventory.ini

内容如下

```
115.28.xxx.yyy
```

运行如下命令

```
ansible all --inventory-file=inventory.ini --module-name ping -u fred --private-key=/Users/Fred/.ssh/id_rsa
```

得到如下结果


```
115.28.xxx.yyy | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

这里有个前提：用户 fred 能通过 ssh key /Users/Fred/.ssh/id_rsa 登陆到 115.28.xxx.yyy


参数说明

* The first argument, `all` simply tells Ansible to run against all hosts defined in the inventory file. You can use this first argument to target a specific host, group, wildcard pattern or a combination of all of those things.
* Modules are Ansible’s way of abstracting certain system management or configuration tasks.


其他命令

`ansible all -i inventory.ini -m command -u fred --private-key=/Users/Fred/.ssh/id_rsa                    --args 'uptime'`

`ansible all -i inventory.ini -m command -u fred --private-key=/Users/Fred/.ssh/id_rsa                     -a 'uptime'`

`ansible all -i inventory.ini -m command -u fred --private-key=/Users/Fred/.ssh/id_rsa -b --ask-sudo-pass  -a 'sudo cat /etc/sudoers'`


详细文档可以看这里 <http://docs.ansible.com/ansible/intro.html>

