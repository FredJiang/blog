---
title: iptables 使用
date: 2017-06-27 09:54:52
tags: [iptables, firewall]
---


参考 <http://cn.linux.vbird.org/linux_server/0250simple_firewall.php>


```
sudo iptables -S
sudo iptables -I INPUT -p tcp                --dport 27017 -j DROP
sudo iptables -I INPUT -p tcp -s 10.0.0.0/27 --dport 27017 -j ACCEPT
```

<!--more-->


参数说明


-AID 链名：针对某链进行规则的 "累加" 或 "插入" 或 "删除"

*     -A  ：新增加一条规则，该规则增加在原本规则的最后面。
*     -I  ：插入一条规则。如果没有指定此规则的顺序，默认是插入变成第一条规则。
*     -D  ：删除规则。
*     链  ：有 INPUT, OUTPUT, FORWARD 等。

-S 显示规则

-io 网络接口：设定封包进出的接口

*         -i ：封包所进入的那个网络接口，例如 eth0, lo 等接口。需与 INPUT 链配合。
*         -o ：封包所传出的那个网络接口，需与 OUTPUT 链配合。

-p 协议：设定此规则适用于哪种封包格式，主要的封包格式有：tcp, udp, icmp 及 all。

-s 来源 IP/网域：设定此规则之封包的来源项目，可指定单纯的 IP 或包括网域，例如：

*   IP  ：192.168.0.100
*   网域：192.168.0.0/24, 192.168.0.0/255.255.255.0 均可。
*   -s ! 192.168.100.0/24 表示不许 192.168.100.0/24 之封包来源。

-d 目标 IP/网域：同 -s ，只不过这里指的是目标的 IP 或网域。

-j ：后面接动作，主要的动作有接受(ACCEPT)、丢弃(DROP)、拒绝(REJECT)及记录(LOG)
