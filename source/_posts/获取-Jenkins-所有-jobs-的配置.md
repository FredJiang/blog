---
title: 获取 Jenkins 所有 jobs 的配置
date: 2017-06-26 15:56:51
tags: [Jenkins]
---


需求：

整理 Jenkins 中的多个项目

<!--more-->


在 Jenkins 的网页中，依次选择如下选项

* Manage Jenkins  (对应 path 为 /manage)
* Jenkins CLI     (对应 path 为 /cli/)
* list-jobs       (对应 path 为 /cli/command/list-jobs)


然后在

> java -jar jenkins-cli.jar -s http://yousite/ list-jobs [NAME]

上点 jenkins-cli.jar 并下载

在终端执行以下命令

`java -jar jenkins-cli.jar -s http://yousite/ list-jobs`

就可以得到所有的 jobs 了

如果报错的话，可以在 /me/configure 填上自己的 ssh 公钥


接着用

get-job  (对应 path 为 /cli/command/get-job)

获取单个 job 的信息

PS:

如果 xml 的数据看不习惯的话，可以用 <https://codebeautify.org/xmlviewer> 将 xml 数据转成 json 格式的



另外可以用如下命令提取相应信息


```
(java -jar jenkins-cli.jar -s http://yousite/ list-jobs \
| xargs -I param \
bash -c 'echo -e jobName param ; java -jar jenkins-cli.jar -s http://yousite/ get-job param ; echo -e \\n ;' \
| grep -e "jobName" -e "<url>" -e "<name>" -e "<remoteDirectory>" -e "^$" -e "<configName>") \
| sed 's/<url>/git 地址 /g' \
| sed 's/<\/url>//g' \
| sed 's/<configName>/推到服务器 /g' \
| sed 's/<\/configName>//g' \
| sed 's/<remoteDirectory>/的目录 /g' \
| sed 's/<\/remoteDirectory>//g' \
| sed 's/<name>/git 分支 /g' \
| sed 's/<\/name>//g'
```