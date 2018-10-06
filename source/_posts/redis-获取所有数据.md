---
title: redis 获取所有数据
date: 2018-08-09 15:26:05
tags: [redis, db, shell]
---

获取 redis key 的总数

```bash
redis-cli -h 127.0.0.1 -p 6379 INFO Keyspace

redis-cli -h 127.0.0.1 -p 6379 DBSIZE
```

<!--more-->

[Command substitution](https://en.wikipedia.org/wiki/Command_substitution)

获取所有 key

```bash
# KEYS 会把所有数据加载到内存，数据量大时，别用 KEYS
redis-cli -h 127.0.0.1 -p 6379 KEYS \*
keys=$(redis-cli -h 127.0.0.1 -p 6379 KEYS \*);
echo $keys


redis-cli --scan --pattern \*
keys=$(redis-cli --scan --pattern \*);
echo $keys
```

获取所有 key 和 value（数据大时需要注意）

```bash
#! /bin/bash
for key in $(redis-cli --scan --pattern \* | sort);
do
    type=$(redis-cli -h 127.0.0.1 -p 6379 TYPE $key);
    echo -e "Key   : \033[32m$key \033[0m";
    echo -e "TYPE  : \033[35m$type\033[0m";
    echo -e "value :";
    if [ "$type" == "string" ]; then
        redis-cli -h 127.0.0.1 -p 6379 GET      $key
    fi;
    if [ "$type" == "set" ]; then
        redis-cli -h 127.0.0.1 -p 6379 SMEMBERS $key
    fi;
    if [ "$type" == "zset" ]; then
        redis-cli -h 127.0.0.1 -p 6379 ZRANGE   $key 0 -1
    fi;
    if [ "$type" == "list" ]; then
        redis-cli -h 127.0.0.1 -p 6379 LRANGE   $key 0 -1
    fi;
    if [ "$type" == "hash" ]; then
        redis-cli -h 127.0.0.1 -p 6379 HGETALL  $key
    fi;
    echo "";
done
```


获取指定条数数据

```bash
redis-cli -h 127.0.0.1 -p 6379 SCAN 0 MATCH \* COUNT 5
keys=$(redis-cli -h 127.0.0.1 -p 6379 SCAN 0 MATCH \* COUNT 5);
echo $keys
```


获取一定条数的 key

```bash
#!/bin/bash
currentIndex=0
cursor=0
while [ $currentIndex -le 10000 ]
do
    redisResult=$(redis-cli -h 127.0.0.1 -p 6379 SCAN $cursor MATCH \* COUNT 100);
    stringArray=($redisResult)
    arrayLenght=${#stringArray[@]}
    cursor=${stringArray[0]}
    if [ $arrayLenght -ge 2 ]
    then
        isCursor=true
        for key in $redisResult;
        do
            if $isCursor
            then
                isCursor=false
                continue
            fi
            (( currentIndex++ ))
            echo $currentIndex $key;
        done        
    fi
    if [ $cursor -eq 0 ]
    then
        break
    fi
done
```
