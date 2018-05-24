---
title: intellij 用 maven 运行程序
date: 2018-05-16 09:52:18
tags: [jetbrain, ide, intellij, java, maven]
---

### 使用 jetty 运行程序

配置 jetty

<!--more-->

{% asset_img "jetty_config.png" "" %}

运行或者调试程序

{% asset_img "jetty_run_debug.png" "" %}


### 运行测试用例

配置

{% asset_img "test_config.png" "" %}

### debug 测试用例

参考

* <http://www.grygoriy.com/blog/2011/01/20/how-to-debug-tests-maven-test-via-intellij-idea/>
* <http://tharikasblogs.blogspot.hk/p/hwo-ot-debug-tests-in-maven-project.html>

运行

`mvn clean install -Dmaven.surefire.debug`

配置 remote

{% asset_img "remote_config.png" "" %}

运行步骤

{% asset_img "test_debug_waiting.png" "" %}

运行结果

{% asset_img "test_debug_result.png" "" %}












