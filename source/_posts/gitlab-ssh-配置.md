---
title: gitlab ssh 配置
date: 2016-05-16 16:45:33
tags: [gitlab, ssh, root, id_rsa, npm, private]
---

遇到的问题：

在开发 nodejs 程序的过程中，新建了一个新的 npm 私有模块。这个模块在自己搭建的 gitlab 服务器 gitlab.xxx.com 上。在服务器 dev 上以 root 用户运行 `npm install` 来安装该模块时，报没有权限的错误。

<!--more-->

解决办法：

在服务器 dev 上已经有个用户 a，a 在 gitlab.xxx.com 是有权限的。这时 root 以用户 a 的权限去下载代码就可以了。

可以在文件 `/root/.ssh/config` 中添加如下配置

```
Host gitlab.xxx.com
    User git 
    Port 22
    Hostname gitlab.xxx.com
    IdentityFile "/home/a/.ssh/id_rsa"
    TCPKeepAlive yes 
    IdentitiesOnly yes 
    StrictHostKeyChecking no
```

PS：尽量别用 root 运行项目