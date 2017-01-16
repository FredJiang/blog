---
title: socket 并发测试
date: 2016-11-16 10:54:15
tags: [socket, tcp, node]
---

websocket 介绍 <https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers>

<!--more-->

## 测试环境

### 操作系统版本
	
```
Distributor ID:	Ubuntu
Description:	Ubuntu 16.04.1 LTS
Release:	16.04
Codename:	xenial
```


## 服务端设置

### 设置文件 `/etc/sysctl.conf`


```
fs.file-max = 2000000
fs.nr_open = 2000001
net.core.netdev_max_backlog = 16384
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_wmem = 8192 131072 16777216
net.ipv4.tcp_rmem = 32768 131072 16777216
net.ipv4.tcp_mem = 786432 2097152 3145728
net.ipv4.tcp_max_orphans = 524288
net.netfilter.nf_conntrack_max = 2097152
```

执行 `/sbin/sysctl -p` 即时生效

问题: 机器重启后, 文件失效了, 需要重新执行 `/sbin/sysctl -p`

#### 设置文件 `/etc/security/limits.conf`


```
*           soft        nofile      2000000
*           hard        nofile      2000000
*           soft        nproc       2000000
*           hard        nproc       2000000
```

* `hard` 不能大于 `/etc/sysctl.conf` 中的 `fs.nr_open`
* 用 `ulimit -a` 或 `prlimit` 检查配置文件是否生效
* 上面的配置文件对 root 用户是不生效的（已测试）
* 想要改变 root 的 limit，把 `*` 换成 root 就行（未测试）
* `reboot` 重启生效（暂时没有找到其他方法）

## 客户端设置

### 设置文件 `/etc/sysctl.conf`

```
fs.file-max = 2000000
fs.nr_open = 2000001
net.core.netdev_max_backlog = 16384
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_wmem = 8192 131072 16777216
net.ipv4.tcp_rmem = 32768 131072 16777216
net.ipv4.tcp_mem = 786432 2097152 3145728
net.ipv4.tcp_max_orphans = 524288
net.netfilter.nf_conntrack_max = 2097152
```

### 设置文件 `/etc/security/limits.conf`

```
*           soft        nofile      2000000
*           hard        nofile      2000000
*           soft        nproc       2000000
*           hard        nproc       2000000
```

## 测试
 
### node 程序

<https://github.com/FredJiang/socket_test_node>

### 启动 node 程序

#### 服务器端程序

```
node \
--nouse-idle-notification \
--expose-gc \
--max-old-space-size=3072 \
server_ws.js
```

#### 客户端程序

`node client.js`


查看当前连接数

`netstat -anl | grep 8088 | awk '/^tcp/ {t[$NF]++}END{for(state in t){print state, t[state]}}'`

查看服务器情况

`while true; do dmesg | tail; sleep 3; done;`

## nginx 配置

<http://nginx.org/en/docs/http/websocket.html>


```
upstream sockettest.xxx.com {
    ip_hash;
    server 127.0.0.1:8088;
    server 127.0.0.1:8089;
}

server {
    client_max_body_size 4G;
    listen  80;
    server_name sockettest.xxx.com;

    location / {
    	proxy_set_header    X-Real-IP		$remote_addr;
        proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header    Host             $http_host;
        proxy_set_header    X-NginX-Proxy    true;
        proxy_set_header    Connection "";
        proxy_set_header    Upgrade $http_upgrade;
        proxy_set_header    Connection "upgrade";
        proxy_http_version 1.1;
        proxy_pass http://sockettest.xxx.com;        
    }
}
```




报错

2016/11/08 14:07:05 [alert] 8004#8004: *95286 768 worker_connections are not enough while connecting to upstream, client: 10.8.6.215, server: sockettest.xxx.com, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:8088/", host: "sockettest.xxx.com"

修改

/etc/nginx/nginx.conf

```
events {
    worker_connections 2000000;
}
```

报错

2016/11/08 14:12:13 [crit] 15547#15547: accept4() failed (24: Too many open files)

修改

/etc/nginx/nginx.conf

`worker_rlimit_nofile 2000000;`


最终


```
fred@fred-UBUNTU:/etc/nginx$ cat nginx.conf 
user www-data;
worker_processes auto;
pid /run/nginx.pid;

worker_rlimit_nofile 2000000;

events {
#	worker_connections 768;
	worker_connections 2000000;
	# multi_accept on;
}
```