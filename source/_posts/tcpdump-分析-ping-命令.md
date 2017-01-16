---
title: tcpdump 分析 ping 命令
date: 2017-01-16 09:43:59
tags: [tcpdump, ping, network]
---


运行命令，获取数据

`sudo tcpdump -n -i any host 10.8.6.215`

`ping 10.8.6.215 -c 1`


<!--more-->


```
fred@fred-UBUNTU:~$ sudo tcpdump -n -i any host 10.8.6.215
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
01:18:23.558141 IP 10.8.6.216 > 10.8.6.215: ICMP echo request, id 6032, seq 1, length 64
01:18:23.558342 IP 10.8.6.215 > 10.8.6.216: ICMP echo reply, id 6032, seq 1, length 64
```

运行命令，获取数据

`sudo tcpdump -n -i any -X -vv host 10.8.6.215`

`ping 10.8.6.215 -c 1`


```
fred@fred-UBUNTU:~$ sudo tcpdump -n -i any -X -vv host 10.8.6.215
tcpdump: listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
01:17:40.353377 IP (tos 0x0, ttl 64, id 25, offset 0, flags [DF], proto ICMP (1), length 84)
    10.8.6.216 > 10.8.6.215: ICMP echo request, id 6025, seq 1, length 64
	0x0000:  4500 0054 0019 4000 4001 18d2 0a08 06d8  E..T..@.@.......
	0x0010:  0a08 06d7 0800 3b2c 1789 0001 34ba 7758  ......;,....4.wX
	0x0020:  0000 0000 3564 0500 0000 0000 1011 1213  ....5d..........
	0x0030:  1415 1617 1819 1a1b 1c1d 1e1f 2021 2223  .............!"#
	0x0040:  2425 2627 2829 2a2b 2c2d 2e2f 3031 3233  $%&'()*+,-./0123
	0x0050:  3435 3637                                4567
01:17:40.353545 IP (tos 0x0, ttl 64, id 16143, offset 0, flags [none], proto ICMP (1), length 84)
    10.8.6.215 > 10.8.6.216: ICMP echo reply, id 6025, seq 1, length 64
	0x0000:  4500 0054 3f0f 0000 4001 19dc 0a08 06d7  E..T?...@.......
	0x0010:  0a08 06d8 0000 432c 1789 0001 34ba 7758  ......C,....4.wX
	0x0020:  0000 0000 3564 0500 0000 0000 1011 1213  ....5d..........
	0x0030:  1415 1617 1819 1a1b 1c1d 1e1f 2021 2223  .............!"#
	0x0040:  2425 2627 2829 2a2b 2c2d 2e2f 3031 3233  $%&'()*+,-./0123
	0x0050:  3435 3637                                4567
```

数据分析

<span style="color:red"> 0x0000:  4500 0054 0019 4000 4001 18d2 0a08 06d8</span>

<span style="color:red"> 0x0010:  0a08 06d7 </span> <span style="color:blue"> 0800 3b2c 1789 0001 </span> 34ba 7758

0x0020:  0000 0000 3564 0500 0000 0000 1011 1213

0x0030:  1415 1617 1819 1a1b 1c1d 1e1f 2021 2223

0x0040:  2425 2627 2829 2a2b 2c2d 2e2f 3031 3233

0x0050:  3435 3637
                 
                 
                 
<span style="color:red">0x0000:  4500 0054 3f0f 0000 4001 19dc 0a08 06d7 </span>

<span style="color:red"> 0x0010:  0a08 06d8 </span> <span style="color:blue"> 0000 432c 1789 0001 </span> 34ba 7758

0x0020:  0000 0000 3564 0500 0000 0000 1011 1213

0x0030:  1415 1617 1819 1a1b 1c1d 1e1f 2021 2223

0x0040:  2425 2627 2829 2a2b 2c2d 2e2f 3031 3233

0x0050:  3435 3637


红色部分 [IPv4](https://en.wikipedia.org/wiki/IPv4)


* <https://en.wikipedia.org/wiki/IPv4#Header>
* <https://en.wikipedia.org/wiki/Ping_(networking_utility)#ICMP_packet>



{% asset_img "tcpdump-ping.png" "" %}



综上，输出结果是 16 进制的，所以第一个 4 对应的是 4 bit


96-127 为来源 ip <https://en.wikipedia.org/wiki/IPv4#/media/File:Ipv4_address.svg>

`0a08 06d8` 0a(<span style="color:red">10</span>)08(<span style="color:red">8</span>)06(<span style="color:red">6</span>)d8(<span style="color:red">216</span>) > 10.8.6.216 

128-159 为目标 ip

`0a08 06d7` 0a(<span style="color:red">10</span>)08(<span style="color:red">8</span>)06(<span style="color:red">6</span>)d7(<span style="color:red">215</span>) > 10.8.6.215

16-31 为 Total Length

`54` 84 字节


72-79 为 [Protocol](https://en.wikipedia.org/wiki/List_of_IP_protocol_numbers)

`01` ICMP


蓝色部分 [Internet Control Message Protocol](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)

* <https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol#Header>
* <https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol#header_type>
* <https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol#Control_messages>

0-7 为 type

`08` `00` 分别为 Echo request 和 Echo reply


参考

* <https://en.wikipedia.org/wiki/Ping_(networking_utility)>
* <http://www.markhneedham.com/blog/2012/07/15/tcpdump-learning-how-to-read-udp-packets/>