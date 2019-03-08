---
title: java spring junit
date: 2018-11-22 10:12:20
tags: [java, spring, junit, test]
---

pom.xml

<!--more-->

```xml
    <dependencies>
        <!--test-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency><!--spring-test 的版本需要和 spring 一样-->
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.0.5.RELEASE</version>
            <scope>test</scope>
        </dependency>
        <dependency><!--<mvc:annotation-driven /> tag loads different web related resources (view resolvers, handler mappings etc.) and as such requires the servlet api to be available.-->
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.0</version>
            <scope>test</scope>
        </dependency>
        <!--http-request-->
        <dependency>
            <groupId>com.github.kevinsawicki</groupId>
            <artifactId>http-request</artifactId>
            <version>6.0</version>
        </dependency>
        <!--spring-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.0.5.RELEASE</version>
        </dependency>
    </dependencies>
```



```java
package com.fred.controller;

import com.github.kevinsawicki.http.HttpRequest;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring-web-dispatcher-servlet.xml", "file:src/main/webapp/WEB-INF/applicationContext.xml"})
@WebAppConfiguration
public class TestControllerTest {
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Before
    public void before() {
        System.out.println("Before test....");
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @BeforeClass
    public static void beforeClass() {
        System.out.println("BeforeClass test....");
    }

    @Test()
    public void testHelloMockMvc() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andReturn();
        System.out.println(mvcResult.getResponse().getContentAsString());
    }

    @Test()
    public void testHelloHttpRequest() {
        String checkReceiptUrl = "http://127.0.0.1:8080/hello";
        String response = HttpRequest.get(checkReceiptUrl).body();
        System.out.println("url was: " + checkReceiptUrl);
        System.out.println("response was: " + response);
    }

    @AfterClass
    public static void afterClass() {
        System.out.println("AfterClass class....");
    }
}
```