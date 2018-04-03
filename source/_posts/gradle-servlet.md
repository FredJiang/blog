---
title: gradle servlet
date: 2017-12-30 21:33:11
tags: [java, web, gradle, servlet]
---

{% asset_img "tree.png" "" %}

<!--more-->


```
mkdir -p \
webdemo/src/main/java/ \
webdemo/src/main/webapp/ \
webdemo/src/test/java/
```


cat build.gradle

```
plugins {
    id 'java'
    id 'war'
    id 'org.akhikhl.gretty' version '1.4.2'
}

repositories {
    jcenter()
}

dependencies {
    providedCompile 'javax.servlet:javax.servlet-api:3.1.0'
    testCompile 'junit:junit:4.12'
}
```

cat ./src/main/java/com/gradle/demo/HelloServlet.java


```
package org.gradle.demo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "HelloServlet", urlPatterns = {"hello"}, loadOnStartup = 1)
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        response.getWriter().print("Hello, World!");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        String name = request.getParameter("name");
        if (name == null) name = "World";
        request.setAttribute("user", name);
        request.getRequestDispatcher("response.jsp").forward(request, response);
    }
}
```


cat ./src/main/webapp/index.html

```
<html>

<head>
  <title>Web Demo</title>
</head>

<body>
  <p>Say <a href="hello">Hello</a></p>
  <form method="post" action="hello">
    <h2>Name:</h2>
    <input type="text" id="say-hello-text-input" name="name" />
    <input type="submit" id="say-hello-button" value="Say Hello" />
  </form>
</body>

</html>
```

cat ./src/main/webapp/response.jsp

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Hello Page</title>
    </head>
    <body>
        <h2>Hello, ${user}!</h2>
    </body>
</html>
```

启动程序

```
gradle wrapper --gradle-version=4.4.1 # 或 gradle wrapper

./gradlew appRun
```

访问 <http://localhost:8080/webdemo/>

<https://guides.gradle.org/building-java-web-applications/>