---
title: redis 获取所有数据
date: 2018-08-09 15:26:05
tags: [redis, db, shell]
---

获取 redis key 的总数

```sh
redis-cli -h 127.0.0.1 -p 6379 INFO Keyspace

redis-cli -h 127.0.0.1 -p 6379 DBSIZE
```

<!--more-->

[Command substitution](https://en.wikipedia.org/wiki/Command_substitution)

获取所有 key

```sh
# KEYS 会把所有数据加载到内存，数据量大时，别用 KEYS
redis-cli -h 127.0.0.1 -p 6379 KEYS \*
keys=$(redis-cli -h 127.0.0.1 -p 6379 KEYS \*);
echo $keys


redis-cli -h 127.0.0.1 -p 6379 --scan --pattern \*
keys=$(redis-cli -h 127.0.0.1 -p 6379 --scan --pattern \*);
echo $keys
```

获取所有 key 和 value（数据大时需要注意）

```sh
#!/bin/sh

redisHost="redisHost"
redisPort="6379"
redisPassword="redisPassword"

echo Keyspace $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} INFO Keyspace)

scanPattern=captcha_\*

currentIndex=0
for key in $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} --scan --pattern ${scanPattern} count 10 | sort);
do
    (( currentIndex++ ))
    type=$(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} TYPE ${key});
    if [ "${type}" == "string" ]; then
        printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} GET      ${key})
    fi;
    if [ "${type}" == "set" ]; then
        printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} SMEMBERS ${key});
    fi;
    if [ "${type}" == "zset" ]; then
        printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} ZRANGE   ${key} 0 -1);
    fi;
    if [ "${type}" == "list" ]; then
        printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} LRANGE   ${key} 0 -1);
    fi;
    if [ "${type}" == "hash" ]; then
        printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} HGETALL  ${key});
    fi;
done
```


获取指定条数数据

```sh
redis-cli -h 127.0.0.1 -p 6379 SCAN 0 MATCH \* COUNT 5
keys=$(redis-cli -h 127.0.0.1 -p 6379 SCAN 0 MATCH \* COUNT 5);
echo $keys
```


获取一定条数的 key

```sh
#!/bin/sh

redisHost="redisHost"
redisPort="6379"
redisPassword="redisPassword"

echo Keyspace $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} INFO Keyspace)

scanPattern=captcha_\*

currentIndex=0
cursor=0
maxCount=200
echoCount=100
while [ ${currentIndex} -lt ${maxCount} ]
do
    redisResult=$(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} SCAN $cursor MATCH ${scanPattern} COUNT ${echoCount});
    # echo redisResult ${redisResult}
    stringArray=($redisResult)
    arrayLenght=${#stringArray[@]}
    # echo arrayLenght ${arrayLenght}
    cursor=${stringArray[0]}
    # echo cursor ${cursor}
    if [ $arrayLenght -ge 2 ]
    then
        theFirstIsCursor=true
        for key in $redisResult;
        do
            if ${theFirstIsCursor}
            then
                theFirstIsCursor=false
                continue
            fi
            (( currentIndex++ ))

            type=$(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} TYPE ${key});
            if [ "${type}" == "string" ]; then
                printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} GET      ${key})
            fi;
            if [ "${type}" == "set" ]; then
                printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} SMEMBERS ${key});
            fi;
            if [ "${type}" == "zset" ]; then
                printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} ZRANGE   ${key} 0 -1);
            fi;
            if [ "${type}" == "list" ]; then
                printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} LRANGE   ${key} 0 -1);
            fi;
            if [ "${type}" == "hash" ]; then
                printf "% -5s % -8s % -50s %s\n" ${currentIndex} ${type} ${key} $(redis-cli 2>/dev/null -h ${redisHost} -p ${redisPort} -a ${redisPassword} HGETALL  ${key});
            fi;
        done
    fi
    if [ $cursor -eq 0 ]
    then
        break
    fi
done
```
