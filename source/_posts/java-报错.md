---
title: java 报错
date: 2018-10-19 14:35:17
tags: [java, error]
---

# error

<!--more-->

Error: Could not find or load main class

<http://javarevisited.blogspot.com/2015/04/error-could-not-find-or-load-main-class-helloworld-java.html>


# error

ClassNotFoundException
com.intellij.rt.debugger.agent.CaptureAgent

* <https://intellij-support.jetbrains.com/hc/en-us/community/posts/360000166640-Running-Debug-in-Java-can-t-find-CaptureAgent>

或者去掉 Java Exception Breakpoints 中的 Any exception


# error

```
Caused by: java.lang.IllegalArgumentException: java.util.zip.ZipException: zip file is empty
Caused by: java.util.zip.ZipException: zip file is empty
    at java.util.zip.ZipFile.open(Native Method)
    at java.util.zip.ZipFile.<init>(ZipFile.java:219)
    at java.util.zip.ZipFile.<init>(ZipFile.java:149)
```

查看包

```sh
ls -lh ./target/projectName/WEB-INF/lib
```

里面有空 jar 包，从 maven 的 `~/.m2/repository` 删掉对应的 jar 包，重新安装

# error

org.springframework.web.context.ContextLoader.initWebApplicationContext Context initialization failed

`mvn clean compile`


