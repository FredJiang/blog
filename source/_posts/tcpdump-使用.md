---
title: tcpdump 使用
date: 2017-01-05 00:17:39
tags: [network, tcpdump]
---

最近在使用 zabbix 的时候，遇到了一个问题，就是服务器自身的监控出现了如下问题

{% asset_img "zabbix-error.png" "" %}

`Get value from agent failed: ZBX_TCP_READ() failed: [104] Connection reset by peer`

我的 zabbix server 是用 docker 搭建的

<!--more-->

首先熟悉下 tcpdump


搭建一个测试服务器

```
npm install express-generator -g
express expresstest
cd expresstest && npm install
npm start
```

抓取数据

```
sudo tcpdump -n -i any port 3000
```

发起网络请求

```
# tcpdump 推荐加上 -i any，不然可能会抓不到 localhost 的数据
# curl "http://localhost:3000"
curl "http://10.8.6.216:3000"
<!DOCTYPE html><html><head><title>Express</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express</h1><p>Welcome to Express</p></body></html>
```


分析 tcpdump 的数据

```
00:28:13.557824 IP 10.8.6.215.60726 > 10.8.6.216.3000: Flags [S], seq 2105398594, win 29200, options [mss 1460,sackOK,TS val 239179359 ecr 0,nop,wscale 9], length 0
00:28:13.557875 IP 10.8.6.216.3000 > 10.8.6.215.60726: Flags [S.], seq 932525675, ack 2105398595, win 28960, options [mss 1460,sackOK,TS val 207438422 ecr 239179359,nop,wscale 9], length 0
00:28:13.558053 IP 10.8.6.215.60726 > 10.8.6.216.3000: Flags [.], ack 1, win 58, options [nop,nop,TS val 239179359 ecr 207438422], length 0
00:28:13.558244 IP 10.8.6.215.60726 > 10.8.6.216.3000: Flags [P.], seq 1:80, ack 1, win 58, options [nop,nop,TS val 239179359 ecr 207438422], length 79
00:28:13.558259 IP 10.8.6.216.3000 > 10.8.6.215.60726: Flags [.], ack 80, win 57, options [nop,nop,TS val 207438422 ecr 239179359], length 0
00:28:13.573112 IP 10.8.6.216.3000 > 10.8.6.215.60726: Flags [P.], seq 1:372, ack 80, win 57, options [nop,nop,TS val 207438426 ecr 239179359], length 371
00:28:13.573436 IP 10.8.6.215.60726 > 10.8.6.216.3000: Flags [.], ack 372, win 60, options [nop,nop,TS val 239179363 ecr 207438426], length 0
00:28:13.573501 IP 10.8.6.215.60726 > 10.8.6.216.3000: Flags [F.], seq 80, ack 372, win 60, options [nop,nop,TS val 239179363 ecr 207438426], length 0
00:28:13.573713 IP 10.8.6.216.3000 > 10.8.6.215.60726: Flags [F.], seq 372, ack 81, win 57, options [nop,nop,TS val 207438426 ecr 239179363], length 0
00:28:13.573809 IP 10.8.6.215.60726 > 10.8.6.216.3000: Flags [.], ack 373, win 60, options [nop,nop,TS val 239179363 ecr 207438426], length 0
```

前三行的

```
Flags [S]
Flags [S.]
Flags [.]
```

为 TCP 三次握手


后三行的

```
Flags [F.]
Flags [F.]
Flags [.]
```

为断开连接

具体 Flags 怎么看

man tcpdump -> OUTPUT FORMAT -> TCP Packets



查看具体数据

```
sudo tcpdump -n -i any port 3000 -X
```

```
00:38:58.394662 IP 10.8.6.215.61750 > 10.8.6.216.3000: Flags [S], seq 17940452, win 29200, options [mss 1460,sackOK,TS val 239340572 ecr 0,nop,wscale 9], length 0
	0x0000:  4500 003c b3f8 4000 4006 6505 0a08 06d7  E..<..@.@.e.....
	0x0010:  0a08 06d8 f136 0bb8 0111 bfe4 0000 0000  .....6..........
	0x0020:  a002 7210 dbea 0000 0204 05b4 0402 080a  ..r.............
	0x0030:  0e44 0c1c 0000 0000 0103 0309            .D..........
00:38:58.394691 IP 10.8.6.216.3000 > 10.8.6.215.61750: Flags [S.], seq 3983836628, ack 17940453, win 28960, options [mss 1460,sackOK,TS val 207599631 ecr 239340572,nop,wscale 9], length 0
	0x0000:  4500 003c 0000 4000 4006 18fe 0a08 06d8  E..<..@.@.......
	0x0010:  0a08 06d7 0bb8 f136 ed74 85d4 0111 bfe5  .......6.t......
	0x0020:  a012 7120 a511 0000 0204 05b4 0402 080a  ..q.............
	0x0030:  0c5f b80f 0e44 0c1c 0103 0309            ._...D......
00:38:58.394856 IP 10.8.6.215.61750 > 10.8.6.216.3000: Flags [.], ack 1, win 58, options [nop,nop,TS val 239340572 ecr 207599631], length 0
	0x0000:  4500 0034 b3f9 4000 4006 650c 0a08 06d7  E..4..@.@.e.....
	0x0010:  0a08 06d8 f136 0bb8 0111 bfe5 ed74 85d5  .....6.......t..
	0x0020:  8010 003a 44c6 0000 0101 080a 0e44 0c1c  ...:D........D..
	0x0030:  0c5f b80f                                ._..
00:38:58.395069 IP 10.8.6.215.61750 > 10.8.6.216.3000: Flags [P.], seq 1:80, ack 1, win 58, options [nop,nop,TS val 239340572 ecr 207599631], length 79
	0x0000:  4500 0083 b3fa 4000 4006 64bc 0a08 06d7  E.....@.@.d.....
	0x0010:  0a08 06d8 f136 0bb8 0111 bfe5 ed74 85d5  .....6.......t..
	0x0020:  8018 003a 8a19 0000 0101 080a 0e44 0c1c  ...:.........D..
	0x0030:  0c5f b80f 4745 5420 2f20 4854 5450 2f31  ._..GET./.HTTP/1
	0x0040:  2e31 0d0a 486f 7374 3a20 3130 2e38 2e36  .1..Host:.10.8.6
	0x0050:  2e32 3136 3a33 3030 300d 0a55 7365 722d  .216:3000..User-
	0x0060:  4167 656e 743a 2063 7572 6c2f 372e 3437  Agent:.curl/7.47
	0x0070:  2e30 0d0a 4163 6365 7074 3a20 2a2f 2a0d  .0..Accept:.*/*.
	0x0080:  0a0d 0a                                  ...
00:38:58.395090 IP 10.8.6.216.3000 > 10.8.6.215.61750: Flags [.], ack 80, win 57, options [nop,nop,TS val 207599632 ecr 239340572], length 0
	0x0000:  4500 0034 3dc5 4000 4006 db40 0a08 06d8  E..4=.@.@..@....
	0x0010:  0a08 06d7 0bb8 f136 ed74 85d5 0111 c034  .......6.t.....4
	0x0020:  8010 0039 4477 0000 0101 080a 0c5f b810  ...9Dw......._..
	0x0030:  0e44 0c1c                                .D..
00:38:58.407531 IP 10.8.6.216.3000 > 10.8.6.215.61750: Flags [P.], seq 1:372, ack 80, win 57, options [nop,nop,TS val 207599635 ecr 239340572], length 371
	0x0000:  4500 01a7 3dc6 4000 4006 d9cc 0a08 06d8  E...=.@.@.......
	0x0010:  0a08 06d7 0bb8 f136 ed74 85d5 0111 c034  .......6.t.....4
	0x0020:  8018 0039 6394 0000 0101 080a 0c5f b813  ...9c........_..
	0x0030:  0e44 0c1c 4854 5450 2f31 2e31 2032 3030  .D..HTTP/1.1.200
	0x0040:  204f 4b0d 0a58 2d50 6f77 6572 6564 2d42  .OK..X-Powered-B
	0x0050:  793a 2045 7870 7265 7373 0d0a 436f 6e74  y:.Express..Cont
	0x0060:  656e 742d 5479 7065 3a20 7465 7874 2f68  ent-Type:.text/h
	0x0070:  746d 6c3b 2063 6861 7273 6574 3d75 7466  tml;.charset=utf
	0x0080:  2d38 0d0a 436f 6e74 656e 742d 4c65 6e67  -8..Content-Leng
	0x0090:  7468 3a20 3137 300d 0a45 5461 673a 2057  th:.170..ETag:.W
	0x00a0:  2f22 6161 2d53 4e66 676a 3661 6563 6471  /"aa-SNfgj6aecdq
	0x00b0:  4c47 6b69 5451 6266 396c 5122 0d0a 4461  LGkiTQbf9lQ"..Da
	0x00c0:  7465 3a20 5765 642c 2030 3420 4a61 6e20  te:.Wed,.04.Jan.
	0x00d0:  3230 3137 2031 363a 3338 3a35 3820 474d  2017.16:38:58.GM
	0x00e0:  540d 0a43 6f6e 6e65 6374 696f 6e3a 206b  T..Connection:.k
	0x00f0:  6565 702d 616c 6976 650d 0a0d 0a3c 2144  eep-alive....<!D
	0x0100:  4f43 5459 5045 2068 746d 6c3e 3c68 746d  OCTYPE.html><htm
	0x0110:  6c3e 3c68 6561 643e 3c74 6974 6c65 3e45  l><head><title>E
	0x0120:  7870 7265 7373 3c2f 7469 746c 653e 3c6c  xpress</title><l
	0x0130:  696e 6b20 7265 6c3d 2273 7479 6c65 7368  ink.rel="stylesh
	0x0140:  6565 7422 2068 7265 663d 222f 7374 796c  eet".href="/styl
	0x0150:  6573 6865 6574 732f 7374 796c 652e 6373  esheets/style.cs
	0x0160:  7322 3e3c 2f68 6561 643e 3c62 6f64 793e  s"></head><body>
	0x0170:  3c68 313e 4578 7072 6573 733c 2f68 313e  <h1>Express</h1>
	0x0180:  3c70 3e57 656c 636f 6d65 2074 6f20 4578  <p>Welcome.to.Ex
	0x0190:  7072 6573 733c 2f70 3e3c 2f62 6f64 793e  press</p></body>
	0x01a0:  3c2f 6874 6d6c 3e                        </html>
00:38:58.407843 IP 10.8.6.215.61750 > 10.8.6.216.3000: Flags [.], ack 372, win 60, options [nop,nop,TS val 239340575 ecr 207599635], length 0
	0x0000:  4500 0034 b3fb 4000 4006 650a 0a08 06d7  E..4..@.@.e.....
	0x0010:  0a08 06d8 f136 0bb8 0111 c034 ed74 8748  .....6.....4.t.H
	0x0020:  8010 003c 42fb 0000 0101 080a 0e44 0c1f  ...<B........D..
	0x0030:  0c5f b813                                ._..
00:38:58.407912 IP 10.8.6.215.61750 > 10.8.6.216.3000: Flags [F.], seq 80, ack 372, win 60, options [nop,nop,TS val 239340575 ecr 207599635], length 0
	0x0000:  4500 0034 b3fc 4000 4006 6509 0a08 06d7  E..4..@.@.e.....
	0x0010:  0a08 06d8 f136 0bb8 0111 c034 ed74 8748  .....6.....4.t.H
	0x0020:  8011 003c 42fa 0000 0101 080a 0e44 0c1f  ...<B........D..
	0x0030:  0c5f b813                                ._..
00:38:58.408138 IP 10.8.6.216.3000 > 10.8.6.215.61750: Flags [F.], seq 372, ack 81, win 57, options [nop,nop,TS val 207599635 ecr 239340575], length 0
	0x0000:  4500 0034 3dc7 4000 4006 db3e 0a08 06d8  E..4=.@.@..>....
	0x0010:  0a08 06d7 0bb8 f136 ed74 8748 0111 c035  .......6.t.H...5
	0x0020:  8011 0039 42fc 0000 0101 080a 0c5f b813  ...9B........_..
	0x0030:  0e44 0c1f                                .D..
00:38:58.408227 IP 10.8.6.215.61750 > 10.8.6.216.3000: Flags [.], ack 373, win 60, options [nop,nop,TS val 239340575 ecr 207599635], length 0
	0x0000:  4500 0034 b3fd 4000 4006 6508 0a08 06d7  E..4..@.@.e.....
	0x0010:  0a08 06d8 f136 0bb8 0111 c035 ed74 8749  .....6.....5.t.I
	0x0020:  8010 003c 42f9 0000 0101 080a 0e44 0c1f  ...<B........D..
	0x0030:  0c5f b813                                ._..

```



检查 zabbix 的网络数据

```
sudo tcpdump -n -i any port 10050
sudo tcpdump -n -i any not host 10.8.6.216 and port 10050
sudo tcpdump -n -i any port 10051
sudo tcpdump -n -i any not host 10.8.6.216 and port 10051
```

我的 zabbix server 是安装在 10.8.6.215 上的，这里没有看到有网络包

{% asset_img "zabbix-error-2.png" "" %}


在 10.8.6.215 上

`netstat -an | grep 100`

没有发现 10050 端口

在 10.8.6.215 上的 zabbix-server-mysql docker container 上

`netstat -an`

也没看到 10050 端口，估计 server 端也要自己安装一个 agent


在 10.8.6.215 上安装 zabbix-agent


```
wget http://repo.zabbix.com/zabbix/3.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_3.2-1+xenial_all.deb
sudo dpkg -i zabbix-release_3.2-1+xenial_all.deb
sudo apt-get update
sudo apt-get install zabbix-agent
```

安装 zabbix-agent 之后，还是不行，用命令

```
sudo tcpdump -n -i any not host 10.8.6.216 and port 10050
```


```
22:28:19.448947 IP 172.17.0.3.43660 > 10.8.6.215.10050: Flags [S], seq 2780731605, win 29200, options [mss 1460,sackOK,TS val 258977796 ecr 0,nop,wscale 9], length 0
22:28:19.448962 IP 172.17.0.3.43660 > 10.8.6.215.10050: Flags [S], seq 2780731605, win 29200, options [mss 1460,sackOK,TS val 258977796 ecr 0,nop,wscale 9], length 0
22:28:19.448982 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [S.], seq 1821493994, ack 2780731606, win 28960, options [mss 1460,sackOK,TS val 258977796 ecr 258977796,nop,wscale 9], length 0
22:28:19.448986 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [S.], seq 1821493994, ack 2780731606, win 28960, options [mss 1460,sackOK,TS val 258977796 ecr 258977796,nop,wscale 9], length 0
22:28:19.449008 IP 172.17.0.3.43660 > 10.8.6.215.10050: Flags [.], ack 1, win 58, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449011 IP 172.17.0.3.43660 > 10.8.6.215.10050: Flags [.], ack 1, win 58, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449104 IP 172.17.0.3.43660 > 10.8.6.215.10050: Flags [P.], seq 1:18, ack 1, win 58, options [nop,nop,TS val 258977796 ecr 258977796], length 17
22:28:19.449107 IP 172.17.0.3.43660 > 10.8.6.215.10050: Flags [P.], seq 1:18, ack 1, win 58, options [nop,nop,TS val 258977796 ecr 258977796], length 17
22:28:19.449118 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [.], ack 18, win 57, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449120 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [.], ack 18, win 57, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449173 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [F.], seq 1, ack 18, win 57, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449176 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [F.], seq 1, ack 18, win 57, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449201 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [R.], seq 2, ack 18, win 57, options [nop,nop,TS val 258977796 ecr 258977796], length 0
22:28:19.449206 IP 10.8.6.215.10050 > 172.17.0.3.43660: Flags [R.], seq 2, ack 18, win 57, options [nop,nop,TS val 258977796 ecr 258977796], length 0
```

看到 ip 地址 172.17.0.3，好激动。。。


在 10.8.6.215 上，修改 `sudo vim /etc/zabbix/zabbix_agentd.conf`


```
Server=127.0.0.1,172.17.0.3,10.8.6.215
```


{% asset_img "zabbix-ok.png" "" %}