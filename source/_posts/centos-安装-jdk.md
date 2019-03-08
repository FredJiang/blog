---
title: centos 安装 jdk
date: 2017-12-26 10:25:00
tags: [java, jdk]
---

* <https://www3.ntu.edu.sg/home/ehchua/programming/howto/JDK_Howto.html>
* <https://tecadmin.net/install-java-8-on-centos-rhel-and-fedora/>

```
yum search java | grep 'java-'
sudo yum install -y java-1.8.0*
```

<!--more-->

如果没有 `echo $JAVA_HOME`

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

或通过 `locate bin/java` 找到 jdk 的位置

我这是 `/usr/lib/jvm/jre-1.8.0-openjdk.x86_64`

`ls -lh /usr/lib/jvm/jre-1.8.0-openjdk.x86_64`


`echo $JAVA_HOME && echo $CLASSPATH`


```
export JAVA_HOME="/usr/lib/jvm/jre-1.8.0-openjdk.x86_64"
export PATH="$JAVA_HOME/bin:$PATH"
export CLASSPATH=".:$JAVA_HOME/lib"
```

如果有多个 java 版本，切换 `JAVA_HOME` 即可

在 mac 上

```
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH="$JAVA_HOME/bin:$PATH"
export CLASSPATH=".:$JAVA_HOME/lib"
```

ubuntu

```
sudo apt-get -y update
# sudo apt-get install -y default-jre
sudo apt-get install -y default-jdk
sudo update-alternatives --config java # 管理 java 版本
```

