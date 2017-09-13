---
title: zabbix 服务器安装
date: 2017-01-08 13:53:00
tags: [linux, server, zabbix]
---

先看几个概念

* [Zabbix concepts](https://www.zabbix.com/documentation/3.2/manual/concepts)


<!--more-->


下载 docker 镜像，如果慢的话，参考 <https://cr.console.aliyun.com/#/accelerator>

```
docker pull mysql:5.7.12
docker pull zabbix/zabbix-server-mysql
docker pull zabbix/zabbix-web-nginx-mysql
```

启动 mysql_for_zabbix

```
docker run \
--name mysql_for_zabbix \
--restart always \
-v /mnt/docker_mysql_for_zabbix:/var/lib/mysql \
-p 3206:3306 \
-e MYSQL_ROOT_PASSWORD=password \
-d \
mysql:5.7.12
```

初始化 mysql


```
dockerbash mysql_for_zabbix

mysql -u root -p

mysql> CREATE DATABASE zabbixdb CHARACTER SET UTF8;
mysql> GRANT ALL PRIVILEGES on zabbixdb.* to zabbix@'%' IDENTIFIED BY 'zabbixpassword';
mysql> FLUSH PRIVILEGES;
mysql> quit
```

启动 zabbix/zabbix-server-mysql

```
docker run \
--name zabbix-server-mysql \
-p 10051:10051 \
-e DB_SERVER_HOST="10.205.64.17" \
-e DB_SERVER_PORT="3206" \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_DATABASE="zabbixdb" \
-e MYSQL_USER="zabbix" \
-e MYSQL_PASSWORD="zabbixpassword" \
-d \
--restart always \
zabbix/zabbix-server-mysql
```


启动 zabbix-web-nginx-mysql


```
docker run \
--name zabbix-web-nginx-mysql \
-p 9080:80 \
-p 9443:443 \
-e ZBX_SERVER_HOST="10.205.64.17" \
-e DB_SERVER_HOST="10.205.64.17" \
-e DB_SERVER_PORT="3206" \
-e MYSQL_DATABASE="zabbixdb" \
-e MYSQL_USER="zabbix" \
-e MYSQL_PASSWORD="zabbixpassword" \
-e PHP_TZ="Asia/Shanghai" \
-d \
zabbix/zabbix-web-nginx-mysql
```


nginx 配置


```
server {
    client_max_body_size 4G;
    listen 80;
    server_name yousite.com;

    location / {
        proxy_set_header    X-Real-IP            $remote_addr;
        proxy_set_header    X-Forwarded-For      $proxy_add_x_forwarded_for;
        proxy_set_header    Host                 $http_host;
        proxy_set_header    X-NginX-Proxy        true;
        proxy_set_header    Connection           "";
        proxy_http_version  1.1;
        proxy_pass          http://127.0.0.1:9080;
    }
}
```

浏览器输入 yousite.com

默认密码

```
   Username:  admin
   Password:  zabbix
```


配置忽略错误 `Lack of free swap space`

1. 配置
2. 模板
3. Template OS Linux
4. 触发器 
5. Lack of free swap space on {HOST.NAME}

将

`{Template OS Linux:system.swap.size[,pfree].last(0)}<50`

改为

`{Template OS Linux:system.swap.size[,pfree].last(0)}<50 and {Template OS Linux:system.swap.size[,free].last(0)}<>0`

参考

* [How To Install Zabbix Server 3.0 on CentOS/RHEL 7/6/5](http://tecadmin.net/install-zabbix-network-monitoring-on-centos-rhel-and-fedora/)
* [How To Install Zabbix Server 3.0 on Ubuntu 16.04/14.04 LTS and Debian 8/7](http://tecadmin.net/install-zabbix-on-ubuntu/)
* [How To Install Zabbix Agent on Ubuntu 16.04/14.04 LTS and Debian 8/7](http://tecadmin.net/install-zabbix-agent-on-ubuntu-and-debian/)
* [How to Add Host in Zabbix Server to Monitor](http://tecadmin.net/add-host-zabbix-server-monitor/)
* [proxies](https://www.zabbix.com/documentation/3.2/manual/distributed_monitoring/proxies)
* <https://www.kaijia.me/2014/11/zabbix-report-lack-of-free-swap-space-issue-on-server-without-swap-solved/>