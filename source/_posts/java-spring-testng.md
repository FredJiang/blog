---
title: java spring testng
date: 2018-11-22 10:18:46
tags: [java, spring, testng, test]
---

<https://www.tutorialspoint.com/testng/index.htm>

<!--more-->

pom.xml

```xml
    <dependencies>
        <!--test-->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>6.14.3</version>
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@EnableWebMvc
@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring-web-dispatcher-servlet.xml", "file:src/main/webapp/WEB-INF/applicationContext.xml"})
public class TestControllerTest extends AbstractTestNGSpringContextTests {
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @BeforeMethod
    public void beforeMethod() {
        System.out.println("BeforeMethod test...");
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

    @Test(expectedExceptions = HttpRequest.HttpRequestException.class)
    public void testHelloHttpRequest() {
        // 容器没启动，这种方式是无效的
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