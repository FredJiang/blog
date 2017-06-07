---
title: redis 安装
date: 2017-06-04 22:44:09
tags: [redis]
---


参考

* <https://redis.io/topics/quickstart>

<!--more-->

### 下载并安装 redis

```
wget http://download.redis.io/releases/redis-3.2.9.tar.gz
tar xzf redis-3.2.9.tar.gz
cd redis-3.2.9
sudo make
```

测试是否安装成功

`sudo make test`


如果报错

> You need tcl 8.5 or newer in order to run the Redis test


则安装 `tcl` 并重新测试

```
sudo apt-get install -y tcl
sudo make test
```



### daemonize


```
sudo cp src/redis-server /usr/local/bin
sudo cp src/redis-cli /usr/local/bin
sudo cp utils/redis_init_script /etc/init.d/redis_6379
sudo mkdir /etc/redis
sudo cp redis.conf /etc/redis/6379.conf
```

sudo vim /etc/redis/6379.conf

```
daemonize yes
logfile "/mnt/var/log/redis_6379.log"
dir "/mnt/var/redis/6379"
```

```
sudo mkdir -p /mnt/var/log/
sudo mkdir -p /mnt/var/redis/6379
```

```
sudo update-rc.d redis_6379 defaults
sudo /etc/init.d/redis_6379 start
```


```
redis-cli
127.0.0.1:6379> set age:fred 18
OK
127.0.0.1:6379> get age:fred
"18"
127.0.0.1:6379> keys *
1) "age:fred"
127.0.0.1:6379> exit
```
