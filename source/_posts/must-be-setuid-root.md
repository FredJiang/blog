title: must be setuid root
date: 2014-05-11 23:13:42
tags: [linux,server]
---

sudo ls 报如下错误

must be setuid root

<!--more-->

先说下 google 找的方法（一般情况下是可行的，但在我的机器上面用不了）

如果有 root 用户，而当前用户又不是 root 用户的话，先切换到 root 用户，然后运行如下命令

```
chown root:root /usr/bin/sudo
chmod 4755 /usr/bin/sudo
```

完了后，再切换回原来的用户，sudo 应该就能用了

如果你没有权限改文件的属性的话，你就 google 关键字 must be setuid root，找到 recovery 的方法，基本上也是可以的。

下面说一下我这的问题

* 运行命令 which sudo
* 得到结果 /usr/local/bin/sudo
* 再运行下 ls -l /usr/local/bin/sudo
* 得到 -rwxr-xr-x 1 root root 71288 May 11 17:56 /usr/local/bin/sudo
* 切换到 root，运行 chmod 4755 /usr/local/bin/sudo
* 切回当前用户 sudo ls
* 好了


### 总结：

我机器上 sudo 的 path 是 /usr/local/bin/sudo 而不是 /usr/bin/sudo

为什么会报错 must be setuid root？

> 因为 sudo 命令没有设置 uid

这里的 uid 也就是 4755 中的 4 有什么用呢？

> google 说：有了这个 4，执行 sudo 的时候，你就有了文件所有者 root 的权限了
