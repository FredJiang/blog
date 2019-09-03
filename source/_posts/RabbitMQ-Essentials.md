---
title: RabbitMQ Essentials
date: 2019-06-10 16:30:06
tags: [java, rabbitmq]
---

* Broker: This is a middleware application that can receive messages produced by publishers and deliver them to consumers or to another broker.
* Virtual host: This is a virtual division in a broker that allows the segregation of publishers, consumers, and all the AMQP constructs they depend upon, usually for security reasons (such as multitenancy).
* Connection: This is a physical network (TCP) connection between a publisher/consumer and a broker. The connection only closes on client disconnection or in the case of a network or broker failure.
* Channel: This is a logical connection between a publisher/consumer and a broker. Multiple channels can be established within a single connection. Channels allow the isolation of the interaction between a particular client and broker so that they don't interfere with each other. This happens without opening costly individual TCP connections. A channel can close when a protocol error occurs.
* Exchange: This is the initial destination for all published messages and the entity in charge of applying routing rules for these messages to reach their destinations. Routing rules include the following: direct (point-to-point), topic (publish-subscribe) and fanout (multicast).
* Queue: This is the final destination for messages ready to be consumed. A single message can be copied and can reach multiple queues if the exchange's routing rule says so.
* Binding: This is a virtual connection between an exchange and a queue that enables messages to flow from the former to the latter. A routing key can be associated with a binding in relation to the exchange routing rule.

{% asset_img "rabbitmq.png" "" %}

<!--more-->

使用 docker 安装

```shell
docker \
run \
--hostname rabbitmq_management_3.7.8 \
--name     rabbitmq_management_3.7.8 \
--restart always \
-e RABBITMQ_DEFAULT_USER=user \
-e RABBITMQ_DEFAULT_PASS=password \
-p 15672:15672 \
-p 5672:5672 \
-d \
rabbitmq:3.7.8-management

# http://127.0.0.1:15672/
```

```shell
# https://www.rabbitmq.com/rabbitmqctl.8.html

rabbitmqctl list_users

rabbitmqctl add_user  ccm-admin     hare123
rabbitmqctl add_user  ccm-dev       coney123

rabbitmqctl add_vhost          ccm-dev-vhost
rabbitmqctl set_permissions -p ccm-dev-vhost ccm-admin ".*" ".*" ".*"
rabbitmqctl set_permissions -p ccm-dev-vhost ccm-dev   ".*" ".*" ".*"
```
