---
title: Introducing Spring Framework
date: 2019-03-03 21:50:29
tags: [spring, java, book]
---

* <https://www.apress.com/gp/book/9781430265320>
* <https://github.com/apress/introducing-spring-framework>

<!--more-->

```sh
cd        /Users/Fred/workspaceJava
git clone https://github.com/apress/introducing-spring-framework
cd        /Users/Fred/workspaceJava/introducing-spring-framework
chmod +x  /Users/Fred/workspaceJava/introducing-spring-framework/gradlew
          /Users/Fred/workspaceJava/introducing-spring-framework/gradlew --version
# ------------------------------------------------------------
# Gradle 1.10
# ------------------------------------------------------------

# Build time:   2013-12-17 09:28:15 UTC
# Build number: none
# Revision:     36ced393628875ff15575fa03d16c1349ffe8bb6

# Groovy:       1.8.6
# Ant:          Apache Ant(TM) version 1.9.2 compiled on July 8 2013
# Ivy:          2.2.0
# JVM:          1.8.0_112 (Oracle Corporation 25.112-b16)
# OS:           Mac OS X 10.14.3 x86_64

cd /Users/Fred/workspaceJava/introducing-spring-framework && \
   /Users/Fred/workspaceJava/introducing-spring-framework/gradlew   :ch01:run -DmainClass=com.apress.isf.spring.Application


cd /Users/Fred/workspaceJava/introducing-spring-framework/ch01 && \
   /Users/Fred/workspaceJava/introducing-spring-framework/gradlew         run -DmainClass=com.apress.isf.spring.Application


cp    /Users/Fred/workspaceJava/introducing-spring-framework/gradlew /Users/Fred/workspaceJava/introducing-spring-framework/ch01/ && \
cp -r /Users/Fred/workspaceJava/introducing-spring-framework/gradle  /Users/Fred/workspaceJava/introducing-spring-framework/ch01/
cd    /Users/Fred/workspaceJava/introducing-spring-framework/ch01 && \
      /Users/Fred/workspaceJava/introducing-spring-framework/ch01/gradlew run -DmainClass=com.apress.isf.spring.Application
```

或者 intellij 直接打开 `/Users/Fred/workspaceJava/introducing-spring-framework`
