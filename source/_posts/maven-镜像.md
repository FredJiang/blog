---
title: maven 镜像
date: 2018-01-15 23:09:38
tags: [maven, gradle, java]
---

maven 单个项目

```
<repositories>
    <repository>
        <id>aliyunmaven</id>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    </repository>
</repositories>
```

gradle 单个项目

```
repositories {
    // mavenCentral()
    maven {
        url 'http://maven.aliyun.com/nexus/content/groups/public/'
    }
}
```


<!--more-->





或者修改 `setting.xml`，对所有项目生效

如果 maven 是通过普通下载压缩包安装的话

默认配置文件是 `~/apache-maven-3.5.2/conf/setting.xml`

如果在 mac 上通过 brew 安装

```
which mvn
ls -lh /usr/local/bin/mvn
cp /usr/local/Cellar/maven/3.5.2/libexec/conf/settings.xml ~/.m2/
```


```
mvn --version

Maven home: /usr/local/Cellar/maven/3.5.2/libexec
```


在 setting.xml 中添加如下配置

```
<mirrors>
  <mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>
```