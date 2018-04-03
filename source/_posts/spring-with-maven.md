---
title: spring with maven
date: 2018-01-15 08:32:50
tags: [spring, java, maven]
---

* <https://spring.io/guides/gs/maven/>
* <https://projects.spring.io/spring-framework/>

<!--more-->

|     命令    |                                                                             说明                                                                            |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| mvn compile | This will run Maven, telling it to execute the compile goal. When it’s finished, you should find the compiled .class files in the target/classes directory. |
| mvn package | The package goal will compile your Java code, run any tests, and finish by packaging the code up in a JAR file within the target directory.                 |


|     命令     |                            说明                           |
|--------------|-----------------------------------------------------------|
| <groupId>    | The group or organization that the dependency belongs to. |
| <artifactId> | The library that is required.                             |
| <version>    | The specific version of the library that is required.     |


```
mvn package
java -jar target/gs-maven-0.1.0.jar
```