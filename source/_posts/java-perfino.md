---
title: java perfino
date: 2019-07-15 19:58:13
tags: [java, jvm, perfino]
---

下载安装

<https://www.ej-technologies.com/products/perfino/overview.html>

<!--more-->

两个端口

* UI     端口：`http://127.0.0.1:8020/`
* server 端口：8847

```shell
tar zxvf agent.tar.gz

# maven
echo   $MAVEN_OPTS
export  MAVEN_OPTS="${MAVEN_OPTS} -javaagent:/home/tomcat/perfino/perfino.jar=server=perfinoServerIp,name=name,group=group"
echo   $MAVEN_OPTS
mvn tomcat7:run -Pdev -Dmaven.tomcat.path='/' -Dmaven.tomcat.port=8111 -Dmaven.tomcat.ajp.port=7111

# tomcat
echo   $JAVA_OPTS
export  JAVA_OPTS="${JAVA_OPTS} -javaagent:/home/tomcat/perfino/perfino.jar=server=perfinoServerIp,name=name,group=group"
echo   $CATALINA_OPTS
export  CATALINA_OPTS="${CATALINA_OPTS} -javaagent:/home/tomcat/perfino/perfino.jar=server=perfinoServerIp,name=name,group=group"

# java
# java [Options] -jar  [jarfile] [Command Line Arguments]
java -javaagent:/home/tomcat/perfino/perfino.jar=server=perfinoServerIp,name=name,group=group -jar zkui-2.0-SNAPSHOT-jar-with-dependencies.jar
```
