---
title: java junit
date: 2018-11-21 19:41:01
tags: [java, junit, test, idea, intellij]
---

navigate -> test

`ctrl + command + t`

生成测试类

<!--more-->

```xml
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
```

`@BeforeClass/@AfterClass` 注解的函数必须使用 `static` 修饰

```java
package com.fred.controller;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestControllerTest {
    @BeforeClass
    public static void beforeClass() {
        System.out.println("BeforeClass test....");
    }

    @Test()
    public void testAdd() {
        Assert.assertEquals(2, 3);
    }

    @AfterClass
    public static void afterClass() {
        System.out.println("AfterClass class....");
    }
}
```

{% asset_img "1.png" "" %}
