---
title: intellij tomcat
date: 2018-11-21 00:24:13
tags: [intellij, tomcat, ide, java]
---

* <https://blog.csdn.net/xlgen157387/article/details/56498938>

<!--more-->

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

{% asset_img "4.png" "" %}

{% asset_img "5.png" "" %}


* <https://blog.csdn.net/qq_22627687/article/details/76555886>

* CATALINA_HOME 是 Tomcat 的安装目录
* CATALINA_BASE 是 Tomcat 的工作目录

单独启动 tomcat 时的日志

```
Using CATALINA_BASE:   /opt/tomcat-8.0.53
Using CATALINA_HOME:   /opt/tomcat-8.0.53
Using CATALINA_TMPDIR: /opt/tomcat-8.0.53/temp
Using JRE_HOME:        /Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home
Using CLASSPATH:       /opt/tomcat-8.0.53/bin/bootstrap.jar:/opt/tomcat-8.0.53/bin/tomcat-juli.jar
```

在 intellij 中启动 tomcat 时的日志

```
......log CATALINA_BASE:         /Users/Fred/Library/Caches/IntelliJIdea2018.3/tomcat/Unnamed_shirodemo
......log CATALINA_HOME:         /opt/tomcat-8.0.53
```

```sh
ls /Users/Fred/Library/Caches/IntelliJIdea2018.3/tomcat/Unnamed_[pom->build->finalName]
```



