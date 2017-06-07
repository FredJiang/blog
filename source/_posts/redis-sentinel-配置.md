---
title: redis sentinel 配置
date: 2016-11-14 18:53:33
tags: [redis, sentinel]
---

### 目录结构

`tree /opt/redis_*`

<!--more-->


```
/opt/redis_6
├── redis.conf
└── sentinel
    └── sentinel.conf
/opt/redis_7
├── redis.conf
└── sentinel
    └── sentinel.conf
/opt/redis_8
├── redis.conf
└── sentinel
    └── sentinel.conf
/opt/redis_9
└── redis.conf
```


### redis 配置

在原始 redis.conf 内容的基础上，做如下修改

#### `/opt/redis_6/redis.conf`

```
.
# bind 127.0.0.1
port 6376
pidfile "/var/run/redis_6376.pid"
dir "/opt/redis_6"
protected-mode no
.
```


#### `/opt/redis_7/redis.conf`

```
.
# bind 127.0.0.1
port 6377
pidfile "/var/run/redis_6377.pid"
dir "/opt/redis_7"
protected-mode no
.
```


#### `/opt/redis_8/redis.conf`

```
.
# bind 127.0.0.1
port 6378
pidfile "/var/run/redis_6378.pid"
dir "/opt/redis_8"
protected-mode no
.
```


#### `/opt/redis_9/redis.conf`

```
.
# bind 127.0.0.1
port 6379
pidfile "/var/run/redis_6379.pid"
dir "/opt/redis_9"
protected-mode no
.
```





### sentinel 配置

注意：以下地址如果写成 127.0.0.1 的话，就只能在本机上使用

#### `/opt/redis_6/sentinel/sentinel.conf`

```
port 26386

protected-mode no

dir /opt/redis_6/sentinel

sentinel monitor user6380 192.168.200.10 6378 2
sentinel monitor huodong6381 192.168.200.10 6376 2

sentinel down-after-milliseconds user6380 30000
sentinel down-after-milliseconds huodong6381 30000

sentinel parallel-syncs user6380 1
sentinel parallel-syncs huodong6381 1

sentinel failover-timeout user6380 180000
sentinel failover-timeout huodong6381 180000
```

#### `/opt/redis_7/sentinel/sentinel.conf`

```
port 26387

protected-mode no

dir /opt/redis_7/sentinel

sentinel monitor user6380 192.168.200.10 6378 2
sentinel monitor huodong6381 192.168.200.10 6376 2

sentinel down-after-milliseconds user6380 30000
sentinel down-after-milliseconds huodong6381 30000

sentinel parallel-syncs user6380 1
sentinel parallel-syncs huodong6381 1

sentinel failover-timeout user6380 180000
sentinel failover-timeout huodong6381 180000
```


#### `/opt/redis_8/sentinel/sentinel.conf`

```
port 26388

protected-mode no

dir /opt/redis_8/sentinel

sentinel monitor user6380 192.168.200.10 6378 2
sentinel monitor huodong6381 192.168.200.10 6376 2

sentinel down-after-milliseconds user6380 30000
sentinel down-after-milliseconds huodong6381 30000

sentinel parallel-syncs user6380 1
sentinel parallel-syncs huodong6381 1

sentinel failover-timeout user6380 180000
sentinel failover-timeout huodong6381 180000
```


### 启动 redis

```
cd /opt/redis_6/
nohup /opt/redis-3.2.5/src/redis-server /opt/redis_6/redis.conf &
cd /opt/redis_7/
nohup /opt/redis-3.2.5/src/redis-server /opt/redis_7/redis.conf &
cd /opt/redis_8/
nohup /opt/redis-3.2.5/src/redis-server /opt/redis_8/redis.conf &
cd /opt/redis_9/
nohup /opt/redis-3.2.5/src/redis-server /opt/redis_9/redis.conf &
```

### redis 主从设置

```
/opt/redis-3.2.5/src/redis-cli -p 6377
slaveof 192.168.200.10 6376

/opt/redis-3.2.5/src/redis-cli -p 6379
slaveof 192.168.200.10 6378
```


### sentinel 启动

```
cd /opt/redis_6/sentinel
nohup /opt/redis-3.2.5/src/redis-server ./sentinel.conf --sentinel &
cd /opt/redis_7/sentinel
nohup /opt/redis-3.2.5/src/redis-server ./sentinel.conf --sentinel &
cd /opt/redis_8/sentinel
nohup /opt/redis-3.2.5/src/redis-server ./sentinel.conf --sentinel &
```


### 测试

#### 主从

`/opt/redis-3.2.5/src/redis-cli -p 6376` 用 `info` [get](http://redis.io/commands/GET) [set](http://redis.io/commands/SET) 测试

#### sentinel

`/opt/redis-3.2.5/src/redis-cli -p 26386` 用 `role` 测试
