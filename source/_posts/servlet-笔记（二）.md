---
title: servlet 笔记（二）
date: 2018-03-05 07:21:40
tags: [servlet, jsp, java, tomcat]
---

---

servlet 初始化参数

在 web.xml 中

```
<servlet>
    <init-param>
        <param-name>adminEmail</param-name>
        <param-value>270130108@qq.com</param-value>
    </init-param>
</servlet>
```

<!--more-->

在 servlet 代码中

```
getServletConfig().getInitParameter("adminEmail");
```

`getServletConfig()` 需要在 servlet 的 `init()` 方法之后才能调用。容器初始化一个 servlet 时，会为这个 servlet 建一个唯一的 ServletConfig。容器从 web.xml 中读出 servlet 初始化参数，并把这些参数交给 ServletConfig，然后把 ServletConfig 传递给 servlet 的 `init()` 方法。

---

上下文初始化参数

上下文初始化参数与 servlet 初始化参数很类似，只不过上下文参数对整个 web 应用可用，而不只是针对一个 servlet。所以，这说明应用中的所有 servlet 和 JSP 都能自动地访问上下文初始化参数。

每个 servlet 有一个 ServletConfig，每个 web 应用有一个 ServletContext

```
<web-app>
    <context-param>
        <param-name>adminEmail</param-name>
        <param-value>270130108@qq.com</param-value>
    </context-param>
</web-app>
```

在 servlet 代码中

```
getServletContext().getInitParameter("adminEmail");
```

---