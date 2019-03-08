---
title: java testng
date: 2018-11-21 20:21:11
tags: [java, testng, test, idea, intellij]
---

navigate -> test

`ctrl + command + t`

生成测试类

<!--more-->

```xml
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>6.14.3</version>
            <scope>test</scope>
        </dependency>
```

`@BeforeClass/@AfterClass` 注解的函数必须使用 `static` 修饰

```java
package com.fred.controller;

import org.testng.Assert;
import org.testng.annotations.*;

public class TestControllerTest {
    @BeforeClass
    public static void beforeClass() {
        System.out.println("BeforeClass test....");
    }

    @BeforeMethod
    public void beforeTest() {
        System.out.println("BeforeMethod test...");
    }

    @Test(timeOut = 1000 * 10)
    public void testAdd() {
        Assert.assertEquals(2, 3);
    }

    @AfterMethod
    public void afterTest() {
        System.out.println("AfterMethod test....");
    }

    @AfterClass
    public static void afterClass() {
        System.out.println("AfterClass class....");
    }
}
```

{% asset_img "1.png" "" %}
