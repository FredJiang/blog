---
title: tomcat restart
date: 2019-08-08 21:27:20
tags: [tomcat]
---

Tomcat The Definitive Guide, 2nd Edition

<!--more-->

At the time of this writing, there is no restart script that is part of the Tomcat 6.0 distribution because it is tough to write a script that can make sure that when Tomcat stops, it shuts down properly before being started up again. The reasons outlined below for Tomcat shutdowns being unreliable are almost exclusively edge conditions. That means they don’t usually happen, but that they can occur in unusual situations. Here are some reasons why shutdowns may be unreliable:

* The Java Servlet Specification does not mandate any time limit for how long a Java servlet may take to perform its work. Writing a servlet that takes forever to perform its work does not break compliance with the Java Servlet Specification, but it can prevent Tomcat from shutting down.
* The Java Servlet Specification also dictates that on shutdowns, servlet containers must wait for each servlet to finish serving all requests that are in progress before taking the servlet out of service, or wait a container-specific timeout duration before taking servlets out of service. For Tomcat 6, that timeout duration is a maximum of a half-second per servlet. When a servlet misbehaves and takes too long to finish serving requests, it’s up to Tomcat to figure out that the serv let has taken too long and forcibly take it out of service so that Tomcat can shut down. This processing takes time, though, and slows Tomcat’s own shutdown processing.
* Multithreading in Java virtual machines is specified in a way that means that Java code will not always be able to tell exactly how much real time is going by (Java SE is not a real-time programming environment). Also, due to the way Java threads are scheduled on the CPU, threads can become blocked and stay blocked. Because of these limitations, the Java code that is called on invocations of shutdown.sh will not always know how long to wait for Tomcat to shut down, nor can Tomcat always know it’s taking too long to shut down. That means that shutdowns are not completely reliable when written in pure Java. An external program would need to be written in some other programming language to reliably shut down Tomcat.
* Because Tomcat is an embeddable servlet container, it tries not to call System. exit(0) when shutting down the server because Tomcat does not know what else may need to stay running in the same Java virtual machine. Instead, Tomcat shuts down all of its own threads so that the VM can exit gracefully if nothing else needs to run. Because of that, a servlet could spawn a thread that would keep the VM from exiting even when Tomcat’s threads are all shut down.
* The Java Servlet Specification allows servlets to create additional Java threads that perform work as long as any security manager allows it. Once another thread is spawned from a servlet, it can raise its own priority higher than Tomcat’s threads’ priorities (if the security manager allows) and could keep Tomcat from shutting down or from running at all. Usually if this happens, it’s not malicious code but buggy code. Try not to do this!
* If your Tomcat instance has run completely out of memory (as evidenced by the dreaded “Permgen memory” error in the logs), it will usually be unable to accept new connections on its web port or on its shutdown port.



Tomcat knows how to shut down each of its own threads but not necessarily how to handle those of your web application. The JVM process is designed to exit automatically once all of the nondaemon threads exit. Once Tomcat receives a shutdown request, it makes sure to shut down all of its own nondaemon threads, but it doesn’t know about any threads that its web applications may have created. If an application created one or more nondaemon threads, they will indeed keep the JVM from exiting. It’s best that your web application invoke the setDaemon(true) method on any Thread objects it creates to keep them from hanging the JVM.

Even if you take care of the threads in your own code, remember the libraries and packages that you use may themselves use threads. In some cases, you can modify this code, and in some cases, you can’t; either way, be aware of what libraries are doing with threads.


Send a TERM signal to the processes you find, asking the JVM to perform a shutdown

`kill -TERM <process-ID-list>`

Use the kill command to tell the kernel to kill the processes

`kill -KILL <process-ID-list>`

在 catalina.out 中看 tomcat 的线程栈信息

```
ps auwwx | grep java | grep org.apache.catalina.startup.Bootstrap
kill -SIGQUIT 14348
```
