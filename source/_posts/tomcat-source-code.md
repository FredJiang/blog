---
title: tomcat source code
date: 2019-08-25 07:43:21
tags: [tomcat, source, idea, ide, debug]
---

<https://tomcat.apache.org/download-80.cgi>

<!--more-->

```shell
# download binary
cd /opt && wget "http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-8/v8.5.45/bin/apache-tomcat-8.5.45.tar.gz"
cd /opt && tar zxf apache-tomcat-8.5.45.tar.gz

# download source
cd /opt && wget "http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-8/v8.5.45/src/apache-tomcat-8.5.45-src.tar.gz"
cd /opt && tar zxf apache-tomcat-8.5.45-src.tar.gz

rm -rf /opt/apache-tomcat-8.5.45-src/test/*
rm -rf /opt/apache-tomcat-8.5.45-src/webapps/*
mkdir  /opt/apache-tomcat-8.5.45-src/webapps/ROOT
echo "hello" > /opt/apache-tomcat-8.5.45-src/webapps/ROOT/index.html
```

/opt/apache-tomcat-8.5.45-src/pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat8</artifactId>
    <name>tomcat8</name>
    <version>8</version>
    <build>
        <finalName>tomcat8</finalName>
        <sourceDirectory>java</sourceDirectory>
        <testSourceDirectory>test</testSourceDirectory>
        <resources>
            <resource>
                <directory>java</directory>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <directory>test</directory>
            </testResource>
        </testResources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
    <dependencies>
        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant</artifactId>
            <version>1.10.6</version>
        </dependency>
        <dependency>
            <groupId>javax.xml</groupId>
            <artifactId>jaxrpc-api</artifactId>
            <version>1.1</version>
        </dependency>
        <dependency>
            <groupId>wsdl4j</groupId>
            <artifactId>wsdl4j</artifactId>
            <version>1.6.3</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jdt.core.compiler</groupId>
            <artifactId>ecj</artifactId>
            <version>4.6.1</version>
        </dependency>
    </dependencies>
</project>
```

idea run as Application

idea Main class

```
org.apache.catalina.startup.Bootstrap
```

idea VM options（1）

```
-Dcatalina.home=/opt/apache-tomcat-8.5.45-src
-Dcatalina.base=/opt/apache-tomcat-8.5.45-src
-Djava.endorsed.dirs=/opt/apache-tomcat-8.5.45-src/endorsed
-Djava.io.tmpdir=/opt/apache-tomcat-8.5.45-src/temp
-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
-Djava.util.logging.config.file=/opt/apache-tomcat-8.5.45-src/conf/logging.properties
```

访问 `http://127.0.0.1:8080/demo/index.html`

如果不行，可以尝试以下方式

idea VM options（2）

```
-Dcatalina.home=/opt/apache-tomcat-8.5.45
-Dcatalina.base=/opt/apache-tomcat-8.5.45-src
-Djava.endorsed.dirs=/opt/apache-tomcat-8.5.45-src/endorsed
-Djava.io.tmpdir=/opt/apache-tomcat-8.5.45-src/temp
-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager
-Djava.util.logging.config.file=/opt/apache-tomcat-8.5.45-src/conf/logging.properties
```
