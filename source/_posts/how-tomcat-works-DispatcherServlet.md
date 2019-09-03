---
title: how tomcat works - DispatcherServlet
date: 2019-09-03 08:24:29
tags: [java, tomcat, spring]
---

tomcat 版本

```shell
./catalina.sh version

Using CATALINA_BASE:   /opt/apache-tomcat-8.5.45
Using CATALINA_HOME:   /opt/apache-tomcat-8.5.45
Using CATALINA_TMPDIR: /opt/apache-tomcat-8.5.45/temp
Using JRE_HOME:        /Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home
Using CLASSPATH:       /opt/apache-tomcat-8.5.45/bin/bootstrap.jar:/opt/apache-tomcat-8.5.45/bin/tomcat-juli.jar
Server version: Apache Tomcat/8.5.45
Server built:   Aug 14 2019 22:21:25 UTC
Server number:  8.5.45.0
OS Name:        Mac OS X
OS Version:     10.14.6
Architecture:   x86_64
JVM Version:    1.8.0_112-b16
JVM Vendor:     Oracle Corporation
```

sping 版本

```xml
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>
```

<!--more-->

web.xml

```xml
    <servlet>
        <servlet-name>spring-web</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
```

加载 servlet

```java
org.apache.catalina.startup.ContextConfig#lifecycleEvent(LifecycleEvent event)
org.apache.catalina.startup.ContextConfig#configureStart()
org.apache.catalina.startup.ContextConfig#webConfig()
org.apache.catalina.startup.ContextConfig#configureContext(WebXml webxml)

org.apache.catalina.core.StandardWrapper#loadServlet()
org.apache.catalina.core.StandardWrapper#initServlet(Servlet servlet)
```

```
WebXml.getServiceRefs()
WebXml.getServletMappings()
WebXml.getServlets()
```

使用 servlet

```java
org.apache.catalina.connector.CoyoteAdapter#service(org.apache.coyote.Request req, org.apache.coyote.Response res)

org.apache.catalina.core.StandardHostValve#invoke(Request request, Response response)

org.apache.catalina.core.StandardContext#fireRequestInitEvent(ServletRequest request)

org.springframework.web.servlet.FrameworkServlet#service(HttpServletRequest request, HttpServletResponse response)
org.springframework.web.servlet.FrameworkServlet#processRequest(HttpServletRequest request, HttpServletResponse response)

org.springframework.web.servlet.DispatcherServlet#doService(HttpServletRequest request, HttpServletResponse response)
org.springframework.web.servlet.DispatcherServlet#doDispatch(HttpServletRequest request, HttpServletResponse response)
org.springframework.web.servlet.DispatcherServlet#getHandler(HttpServletRequest request)

org.springframework.web.servlet.handler.AbstractHandlerMapping#getHandler(HttpServletRequest request)
```
