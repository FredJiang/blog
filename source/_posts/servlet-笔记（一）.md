---
title: servlet 笔记（一）
date: 2018-03-03 23:05:33
tags: [servlet, jsp, java, tomcat]
---

---

`Servlet` 没有 `main()` 方法。它们受控于另一个 Java 应用，这个 Java 应用称为容器。Tomcat 就是这样一个容器。如果 Web 服务器应用（如 Apache）得到一个指向某个 servlet 的请求，此时服务器不是把这个请求交给 servlet 本身，而是交给部署该 servlet 的容器。要由容器向 servlet 提供 HTTP 请求和响应，而且要由容器调用 servlet 的方法，如 doPost() 或 doGet()。

容器全盘控制着 servlet 的一生，它会创建请求和响应对象、为 servlet 创建一个新线程或分配一个线程，另外调用 servlet 的 service() 方法，并传递请求和响应对象的引用作为参数。

---

<!--more-->

`tomcat/webapps/ROOT/`：对应网站的根目录，`tomcat/webapps/ROOT/test.html` 可以通过 `http://localhost:8080/test.html` 访问

---

`tomcat/webapps/test.war`：访问 `http://localhost:8080/test/` 时，会解压生成一个 `tomcat/webapps/test/` 目录

---

`Hello.java`

```
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/hello/*")
public class Hello extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    response.setContentType("text/html");

    PrintWriter out = response.getWriter();

    out.println(
        "<html>\n"
            + "<head>\n"
            + "<title>\n"
            + "this is title\n"
            + "</title>\n"
            + "</head>\n"
            + "<body>\n"
            + "this is body\n"
            + "</body>\n"
            + "</html>");
  }
}
```

编译得到 `Hello.class`

把 `Hello.class` 放到 `tomcat/webapps/ROOT/WEB-INF/classes/` 下，可以通过 `http://localhost:8080/hello` 访问

把 `Hello.class` 放到 `tomcat/webapps/test/WEB-INF/classes` 下，可以通过 `http://localhost:8080/test/hello` 访问

如果没有使用 `@WebServlet` 注解，可在 `tomcat/webapps/test/WEB-INF/web.xml` 中配置请求地址和 `servlet` 的映射关系

---

HelloJSP.java

```
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/hellojsp/*")
public class HelloJSP extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    request.setAttribute("title", "this is jsp title");
    request.setAttribute("body", "this is jsp body");

    RequestDispatcher view = request.getRequestDispatcher("hellojsp.jsp");
    view.forward(request, response);
  }
}
```


hellojsp.jsp

```
<%@ page import="java.util.*" %>
  <html>

  <head>
    <title>
      <% out.print(request.getAttribute("title")); %>
    </title>
  </head>

  <body>
    <% out.print(request.getAttribute("body")); %>
  </body>

  </html>
```

---





