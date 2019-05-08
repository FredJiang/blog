---
title: spring framework 源码
date: 2019-02-20 10:44:20
tags: [spring]
---

* <https://github.com/spring-projects/spring-framework>
* <https://github.com/spring-projects/spring-framework/blob/master/import-into-idea.md>
* <https://my.oschina.net/u/3101282/blog/1837893>

<!--more-->

```sh
cd /Users/Fred/workspaceJava/
git clone https://github.com/spring-projects/spring-framework.git
cd /Users/Fred/workspaceJava/spring-framework
```

配置仓库 build.gradle

```groovy
    repositories {
        mavenLocal()
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        maven { url "https://repo.spring.io/plugins-release" }
        maven { url 'https://repo.spring.io/libs-snapshot' }
        maven { url "https://repo.spring.io/snapshot" }
        maven { url "https://repo.spring.io/milestone" }
        mavenCentral()
        jcenter()
        maven {
            url "https://plugins.gradle.org/m2/"
        }
    }
```

```sh
./gradlew projects

./gradlew tasks

./gradlew :spring-oxm:compileTestJava

./gradlew build \
-x test \
-x api -x asciidoctor -x dokka -x groovydoc -x javadoc -x jdiff

./gradlew idea
```
