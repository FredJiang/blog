---
title: Spring Boot in Action
date: 2019-04-01 13:08:29
tags: [book, spring, spring boot]
---

* <https://www.manning.com/books/spring-boot-in-action>
* <https://spring.io/guides/gs/spring-boot/>
* <https://spring.io/guides/gs/gradle/>

<!--more-->

```sh
cd /Users/Fred/workspaceJava/spring-boot-in-action
wget "https://manning-content.s3.amazonaws.com/download/2/3ca7cfb-b414-49e2-95d4-b9e4030a6fb9/sbia_examples.zip"
unzip sbia_examples.zip

cd ch02
mv build.gradle       build.gradlebackup
gradle wrapper --gradle-version=1.12
mv build.gradlebackup build.gradle
```

启动程序

```sh
./gradlew build -x test --refresh-dependencies
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

```sh
./gradlew bootRun
```

```sh
# 在 build.gradle 中添加
# apply plugin: 'application'
# mainClassName = 'readinglist.ReadingListApplication'
./gradlew run
```

测试

`http://127.0.0.1:8080/readingList`

window 下测试

```bat
mv build.gradle build.gradlebackup && gradle wrapper --gradle-version=1.12  && mv build.gradlebackup build.gradle && .\gradlew.bat build -x test --refresh-dependencies
```
