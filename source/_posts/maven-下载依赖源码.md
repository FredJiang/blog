---
title: maven 下载依赖源码
date: 2018-03-14 08:40:27
tags: [maven, plugin, java]
---

下载源码

<http://maven.apache.org/plugins/maven-dependency-plugin/sources-mojo.html>

<!--more-->

```
mvn dependency:sources -DincludeGroupIds=javax.servlet -DincludeArtifactIds=servlet-api

mvn dependency:sources
```

解压源码

`jar xvf xxx.jar`

下载文档

<https://maven.apache.org/plugins/maven-dependency-plugin/resolve-mojo.html>

```
mvn dependency:resolve -Dclassifier=javadoc -DincludeGroupIds=javax.servlet -DincludeArtifactIds=servlet-api

mvn dependency:resolve -Dclassifier=javadoc
```
