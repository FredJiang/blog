---
title: tomcat 多应用部署
date: 2019-08-09 08:22:50
tags: [tomcat]
---

Tomcat The Definitive Guide, 2nd Edition

<!--more-->

To have one Tomcat distribution installed and run two or more Tomcat JVM instances that are configured differently, you must keep each JVM instance’s files separate. During normal usage of Tomcat, the server reads configuration from the conf and webapps directories and writes files to the logs, temp, and work directories. Also, some jar files and class files may need to be loaded from the shared, server, and common directory trees. This means that for multiple instances to work, each Tomcat instance has to have its own set of these directories; they cannot be shared by two differently configured Tomcat JVM instances.

The trick to making this work is that you must set the CATALINA_HOME environment variable to where you installed the Tomcat binary distribution(these files come from http://tomcat.apache.org), and you must set the CATALINA_BASE environment variable to a different path where you are storing a JVM instance’s files (these files come from you). When you have both of these environment variables set and you start Tomcat, it will run using your files in CATALINA_BASE, on top of the Tomcat binary distribution in CATALINA_HOME. This is built-in feature of Tomcat allows you to keep Tomcat’s files separate from your files, but still makes it possible to modify everything you need to modify to configure everything the way you need it to be.

