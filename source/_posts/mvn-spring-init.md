---
title: mvn spring init
date: 2018-09-25 21:12:25
tags: [maven, spring, java]
---

`mvnnewwar shirodemo`

<!--more-->

mvnnewwar 文件

```bash
#!/bin/bash

DartifactId=$1

DgroupId=com.fred.app
if [ $# -eq 2 ]; then
  DgroupId=$2
fi

mvn \
archetype:generate \
-DgroupId=$DgroupId \
-DartifactId=$DartifactId \
-DarchetypeArtifactId=maven-archetype-webapp \
-DinteractiveMode=false \
&& \
mkdir -p $1/src/main/java \
&& \
mkdir -p $1/src/test/java \
&& \
touch $1/.gitignore \
&& \
touch $1/README.md

```



./pom.xml

```xml
<?xml version="1.0"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.fred.app</groupId>
    <artifactId>shirodemo</artifactId>
    <packaging>war</packaging>
    <version>1.0-SNAPSHOT</version>
    <name>shirodemo Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <!--test-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <!--spring-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.0.5.RELEASE</version>
        </dependency>
    </dependencies>
    <build>
        <finalName>shirodemo</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
        </resources>
        <plugins>
            <plugin>
                <groupId>org.eclipse.jetty</groupId>
                <artifactId>jetty-maven-plugin</artifactId>
                <version>9.4.9.v20180320</version>
                <configuration>
                    <scanIntervalSeconds>10</scanIntervalSeconds>
                </configuration>
            </plugin>
        </plugins>
    </build>
    <profiles>
        <profile>
            <id>dev</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <build>
                <filters>
                    <filter>profiles/profile-dev.properties</filter>
                </filters>
            </build>
        </profile>
    </profiles>
</project>

```




./src/main/webapp/WEB-INF/web.xml

```xml
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >
<web-app>
    <display-name>Archetype Created Web Application</display-name>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/applicationContext*.xml</param-value>
    </context-param>
    <servlet>
        <servlet-name>spring-web-dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>spring-web-dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>

```

./src/main/webapp/WEB-INF/applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd">
</beans>

```

./src/main/webapp/WEB-INF/spring-web-dispatcher-servlet.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context-4.3.xsd
                           http://www.springframework.org/schema/mvc
                           http://www.springframework.org/schema/mvc/spring-mvc-4.3.xsd">
    <context:component-scan base-package="com.fred"/>
    <mvc:annotation-driven/>
</beans>

```


./src/main/java/com/fred/controller/TestController.java

```java
package com.fred.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping(value = "/hello")
    public String hello() {
        return "-_- hello world!";
    }
}

```

```bash
mvn clean jetty:run

curl 'http://127.0.0.1:8080/hello'
```

