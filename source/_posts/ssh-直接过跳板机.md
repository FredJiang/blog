---
title: ssh 直接过跳板机
date: 2017-06-27 16:13:02
tags: [ssh, firewall, ProxyCommand]
---

### 使用 `-tt`

从 laptop 直接登录到 server3

```
+-----------+       +-----------+       +-----------+       +-----------+
|  laptop   |------>|  server1  |------>|  server2  |------>|  server3  |
+-----------+       +-----------+       +-----------+       +-----------+
```

```
ssh -tt -p22 jiangpeng@server1 \
ssh -tt -p22 jiangpeng@server2 \
ssh -tt -p22 jiangpeng@server3
```

<!--more-->

如果有密码，可以配合 `sshpass` 使用


```
sshpass -p 'password' ssh -tt -p22 jiangpeng@server1 \
sshpass -p 'password' ssh -tt -p22 jiangpeng@server2 \
sshpass -p 'password' ssh -tt -p22 jiangpeng@server3
```

如果用 `sshpass` 登录不了的话，可以在不用 `sshpass` 成功登录后，退出，再用 `sshpass` 登录




### 使用 ProxyCommand

从 laptop 直接登录到 server2

```
+-----------+       +-----------+       +-----------+
|  laptop   |------>|  server1  |------>|  server2  |
+-----------+       +-----------+       +-----------+
```

`ssh -o 'ProxyCommand ssh -p 22 jiangpeng@server1 nc %h %p' jiangpeng@server2`

用 `sshpass`

`sshpass -p 'password' ssh -o 'ProxyCommand ssh -p 22 jiangpeng@server1 nc %h %p' jiangpeng@server2`


</br>


> The netcat (nc) command is needed to set and establish a TCP pipe between Jumphost (or firewall) and FooServer. Now, my laptop (local system) is connected to Jumphost it now connected FooServer. In this example, the utility netcat (nc) is for reading and writing network connections directly. It can be used to pass connections to a 2nd server such as FooServer.

</br>

> ProxyCommand directs ssh how to connect to behind.bar: connect to bar (previously defined) and use netcat to connect to the port that ssh would normally connect to. ssh’s -W flag intelligently forwards traffic to the interpolated %h (hostname) and %p (port) variable placeholders. The following diagram demonstrates.

参考

* <https://www.cyberciti.biz/faq/linux-unix-ssh-proxycommand-passing-through-one-host-gateway-server/>
* <https://blog.tjll.net/ssh-kung-fu/#public-key-cryptography>
* <http://mingxinglai.com/cn/2015/07/ssh-proxycommand/>