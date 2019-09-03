---
title: how tomcat works - sequence of methods invocation
date: 2019-09-03 19:56:56
tags: [java, tomcat]
---

For each incoming HTTP request, the connector calls the invoke method of the associated container. The container will then call the invoke methods of all its child containers. For example, if the connector is associated with an instance of StandardContext, the connector will call the invoke method of the StandardContext instance, which then call the invoke methods of all its child containers (in this case, the child containers will be of type StandardWrapper).

<!--more-->

{% asset_img "1.jpg" "" %}
