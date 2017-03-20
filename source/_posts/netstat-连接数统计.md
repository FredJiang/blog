---
title: netstat 连接数统计
date: 2017-02-23 20:08:01
tags: [netstat, awk]
---


统计 9001 端口的连接数

1

`netstat -nt | grep ":9001" | awk '{print $6}' | sort | uniq -c | sort -n`

2

`netstat -nt | awk '/:9001/ {++state[$NF]} END {for(key in state) print key, "\t", state[key]}'`

<!--more-->

* `/:9001/` 过滤 9001 端口
* `state[]` 定义一个名叫 state 的数组
* `NF` 每条记录的列数
* `$NF` 最后一列的值
* `state[$NF]` 数组元素的值
* `++state[$NF]` 数组元素的值加一
* `END` 在最后阶段要执行的命令
* `for(key in state)` 遍历数组
* `print key,"\t",state[key]` 打印数组的键和值