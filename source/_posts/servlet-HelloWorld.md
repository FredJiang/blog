---
title: servlet HelloWorld
date: 2017-12-31 20:47:57
tags: [servlet, java, tomcat]
---

* <https://www.tutorialspoint.com/servlets/servlets-first-example.htm>
* <https://www.ntu.edu.sg/home/ehchua/programming/howto/Tomcat_HowTo.html>

首先安装 java 和 tomcat

<!--more-->

```
export CATALINA=/opt/tomcat
export CLASSPATH=$CATALINA/lib/servlet-api.jar:$CLASSPATH
```


cat HelloWorld.java

```
// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

// Extend HttpServlet class
public class HelloWorld extends HttpServlet {

   private String message;

   public void init() throws ServletException {
      // Do required initialization
      message = "Hello World";
   }

   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

      // Set response content type
      response.setContentType("text/html");

      // Actual logic goes here.
      PrintWriter out = response.getWriter();
      out.println("<h1>" + message + "</h1>");
   }

   public void destroy() {
      // do nothing.
   }
}
```


`javac HelloWorld.java` 生成 HelloWorld.class


`cd /opt/tomcat && tree webapps/ROOT/WEB-INF`

```
webapps/ROOT/WEB-INF
├── classes
│   └── HelloWorld.class
└── web.xml
```

`vim webapps/ROOT/WEB-INF/web.xml`

在 `<web-app></web-app>` 下添加

```
<servlet>
   <servlet-name>HelloWorld</servlet-name>
   <servlet-class>HelloWorld</servlet-class>
</servlet>

<servlet-mapping>
   <servlet-name>HelloWorld</servlet-name>
   <url-pattern>/HelloWorld</url-pattern>
</servlet-mapping>
```

浏览器访问 <http://localhost:8080/HelloWorld>

如果不想配置 xml 的话，可以参考 <https://www.tutorialspoint.com/servlets/servlets-annotations.htm>

