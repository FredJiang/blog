---
title: spring boot multi module
date: 2019-02-14 11:58:56
tags: [spring, boot, multi, module]
---

<https://spring.io/guides/gs/multi-module/>

<!--more-->

```sh
cd /Users/Fred/workspaceJava
git clone https://github.com/spring-guides/draft-gs-multi-module.git
cd /Users/Fred/workspaceJava/draft-gs-multi-module/complete

mvn install

ls /Users/Fred/.m2/repository/com/example

mvn spring-boot:run -pl application

curl "http://localhost:8080/"
```
