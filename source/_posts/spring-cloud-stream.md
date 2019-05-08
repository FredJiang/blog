---
title: spring cloud stream
date: 2019-02-14 21:13:25
tags: [spring, cloud, stream]
---

* <https://www.baeldung.com/spring-cloud-stream>

<!--more-->

```sh
cd /Users/Fred/workspaceJava
#            https://github.com/eugenp/tutorials/tree/master/spring-cloud/spring-cloud-stream/spring-cloud-stream-rabbit
svn checkout https://github.com/eugenp/tutorials/trunk/spring-cloud/spring-cloud-stream/spring-cloud-stream-rabbit # tree/master -> trunk
cd /Users/Fred/workspaceJava/spring-cloud-stream-rabbit

mvn clean compile exec:java -Dexec.cleanupDaemonThreads=false -Dexec.mainClass=com.baeldung.spring.cloud.stream.rabbit.MyLoggerServiceApplication
```

To test the application, we can use the RabbitMQ management site to publish a message. In the Publish Message panel of the exchange queue.log.messages, we need to enter the request in JSON format.
