---
title: spring boot
date: 2018-03-25 12:19:47
tags: [spring, spring-boot, java, maven]
---

[Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)

<!--more-->

生成项目模板

<https://start.spring.io/>

运行项目

```sh
mvn spring-boot:run
```

测试

```sh
curl -v http://localhost:8080
```

Add production-grade services

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

测试

```sh
curl "http://localhost:8080/actuator"
```
