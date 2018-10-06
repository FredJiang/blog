---
title: java 笔记
date: 2018-01-28 22:14:06
tags: [java, maven, bean, spring, jetty]
---

#### 启动 jetty

`mvn jetty:run`

<!--more-->

#### 使用指定的 profile

`mvn command -PprofileId`

#### pom.xml 的 build 说明

<http://blog.csdn.net/tomato__/article/details/13625497>

#### web.xml 说明

<https://docs.oracle.com/cd/E13222_01/wls/docs81/webapp/web_xml.html>

* 名为 ContextLoaderListener 的 ServletListener 来自 spring-web，它用来为 Web 项目启动 Spring 的 IoC 容器，从而实现 Bean 的注入
* 名为 contextConfigLocation 的 context-params 用来指定 Spring 配置文件的位置

#### java bean

* [Java 帝国之Java bean (上）](http://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513115&idx=1&sn=da30cf3d3f163d478748fcdf721b6414#rd)
* [Java 帝国之Java bean（下）](http://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513118&idx=1&sn=487fefb8fa7efd59de6f37043eb21799#rd)

#### 日志

`slf4j` 配合 `logback` 使用

配置文件为 `src/main/resources/logback.xml`，其中注意字段 `LOG_HOME`

#### How does Spring MVC controller method parameter work?

* <https://stackoverflow.com/questions/8372957/how-does-spring-mvc-controller-method-parameter-work>
* <https://docs.spring.io/spring/docs/3.1.x/spring-framework-reference/html/mvc.html>
* <https://docs.spring.io/spring/docs/3.1.x/spring-framework-reference/html/mvc.html#mvc-ann-methods>
* <https://docs.spring.io/spring/docs/3.1.x/spring-framework-reference/html/mvc.html#mvc-ann-arguments>
* <https://docs.spring.io/spring/docs/3.1.x/spring-framework-reference/html/mvc.html#mvc-ann-return-types>

#### mybatis-spring

* <https://stackoverflow.com/questions/6583950/how-does-springs-autowired-work-with-interfaces-that-have-no-implementation>
* <http://www.mybatis.org/spring/getting-started.html>

#### spring ioc

* <http://jinnianshilongnian.iteye.com/blog/1413846>
* <http://www.martinfowler.com/articles/injection.html>
* <https://en.wikipedia.org/wiki/Dependency_injection>
* <https://www.zhihu.com/question/23277575>
* [Spring 的本质系列(1) -- 依赖注入](http://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513179&idx=1&sn=772226a5be436a0d08197c335ddb52b8#rd)
* [Spring本质系列(2)-AOP](http://mp.weixin.qq.com/s/Hiug-ed9gUPg8IA3PW-msA)


