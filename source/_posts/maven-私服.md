---
title: maven 私服
date: 2018-12-13 10:01:35
tags: [maven, mvn, java, nexus]
---

* <https://www.jianshu.com/p/e4a3ab0298df>
* <https://www.jianshu.com/p/66db8a768f92>

<!--more-->

有了私服之后，当 maven 需要下载构件时，直接请求私服，私服上存在则下载到本地仓库；否则，私服请求外部的远程仓库，将构件下载到私服，再提供给本地仓库下载。

```sh
# download
# https://www.sonatype.com/
# https://www.sonatype.com/nexus-repository-oss
# https://www.sonatype.com/download-oss-sonatype
cd /opt

aria2c -x16 'https://sonatype-download.global.ssl.fastly.net/repository/repositoryManager/3/nexus-3.14.0-04-unix.tar.gz'

tarx nexus-3.14.0-04-unix.tar.gz

# start service 
cd nexus-3.14.0-04/bin
./nexus start
./nexus stop

# http://10.2.44.32:8081
# admin/admin123
```





