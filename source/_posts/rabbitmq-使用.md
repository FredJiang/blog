---
title: rabbitmq 使用
date: 2019-01-30 10:09:26
tags: [java, rabbitmq]
---

* <https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html>
* <https://www.cloudamqp.com/blog/2015-05-27-part3-rabbitmq-for-beginners_the-management-interface.html>
* <https://github.com/rabbitmq/rabbitmq-tutorials>
* <https://www.rabbitmq.com/tutorials/tutorial-one-java.html>

<!--more-->

使用 docker 安装

```sh
# docker \
# run \
# --hostname rabbitmq_3.7.8 \
# --name rabbitmq_3.7.8 \
# --restart always \
# -p 5672:5672 \
# -d \
# registry.docker-cn.com/library/rabbitmq:3.7.8

# docker exec -it rabbitmq_3.7.8 /bin/bash
# rabbitmqctl list_queues


docker \
run \
--hostname rabbitmq_management_3.7.8 \
--name rabbitmq_management_3.7.8 \
--restart always \
-e RABBITMQ_DEFAULT_USER=user \
-e RABBITMQ_DEFAULT_PASS=password \
-p 15672:15672 \
-p 5672:5672 \
-d \
registry.docker-cn.com/library/rabbitmq:3.7.8-management
```

浏览器访问

`http://127.0.0.1:15672/`

pom.xml

```xml
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>(5.5.0,)</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.25</version>
        </dependency>
```

java 代码中使用

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Send {

    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("127.0.0.1");
        factory.setUsername("user");
        factory.setPassword("password");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "Hello World!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}

```