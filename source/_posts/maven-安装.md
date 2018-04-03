---
title: maven 安装
date: 2017-12-26 16:00:10
tags: [maven, java]
---

* <https://maven.apache.org/download.cgi>
* <https://maven.apache.org/install.html>

<!--more-->

在 centos 上

```
axel 'http://mirrors.hust.edu.cn/apache/maven/maven-3/3.5.2/binaries/apache-maven-3.5.2-bin.tar.gz'
tar xzvf apache-maven-3.5.2-bin.tar.gz
```

如果没有 `echo $JAVA_HOME`

可以使用以下命令

```
> which java
/usr/bin/java
> ls -lh /usr/bin/java
lrwxrwxrwx. 1 root root 22 Dec 26 00:17 /usr/bin/java -> /etc/alternatives/java
> ls -lh /etc/alternatives/java
lrwxrwxrwx. 1 root root 46 Dec 26 00:17 /etc/alternatives/java -> /usr/lib/jvm/jre-1.8.0-openjdk.x86_64/bin/java
> ls -lh /usr/lib/jvm/jre-1.8.0-openjdk.x86_64/bin/java
-rwxr-xr-x. 1 root root 9.3K Oct 20 22:58 /usr/lib/jvm/jre-1.8.0-openjdk.x86_64/bin/java
```

或使用 `locate bin/java` 找到 jdk 的位置

我这是 `/usr/lib/jvm/jre-1.8.0-openjdk.x86_64`

`ls -lh /usr/lib/jvm/jre-1.8.0-openjdk.x86_64`

`export JAVA_HOME="/usr/lib/jvm/jre-1.8.0-openjdk.x86_64"`

添加 maven 的 PATH

`export PATH=$PATH:~/apache-maven-3.5.2/bin:`


在 mac 上

`brew install maven`
