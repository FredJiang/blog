---
title: nginx 负载均衡
date: 2016-06-01 09:46:38
tags: [nginx, server, upstream]
---

##### 负载均衡的作用：

* 一台机器的压力太大，多台服务器可以分流，减小单台服务器的压力
* 一台服务器挂了，负载均衡会自动剔除挂掉的服务器，保持业务的稳定性


##### 要实现的效果

{% asset_img "before_and_after.png" "" %}


<!--more-->

##### 配置

配置文件的名字

/etc/nginx/conf.d/yyy.xxx.com.3018.conf

负载均衡前配置文件的内容

```
server {
    client_max_body_size 4G;
    listen  80;

    server_name yyy.xxx.com;

    location / {
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    Host            $http_host;
        proxy_set_header    X-NginX-Proxy   true;
        proxy_set_header    Connection      "";
        proxy_http_version  1.1;
        proxy_pass          http://127.0.0.1:3018;
    }
}
```


负载均衡后的配置文件的内容

```
upstream yyy.xxx.com {
    server 192.168.1.4:3018;
    server 192.168.1.7:3018;
}

server {
    client_max_body_size 4G;
    listen  80;

    server_name yyy.xxx.com;

    location / {
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    Host            $http_host;
        proxy_set_header    X-NginX-Proxy   true;
        proxy_set_header    Connection      "";
        proxy_http_version  1.1;
#        proxy_pass          http://127.0.0.1:3018;
        proxy_pass http://yyy.xxx.com;
    }
}
```

我这用的默认负载策略，其他的负载策略，可以查下 upstream，比如根据客户端的 ip 来做负载均衡。

```
upstream yyy.xxx.com {
    ip_hash;
    server 192.168.1.4:3018;
    server 192.168.1.7:3018;
}
```

参考

* <http://www.cnblogs.com/xiaogangqq123/archive/2011/03/04/1971002.html>


