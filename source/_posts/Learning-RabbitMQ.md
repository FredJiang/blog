---
title: Learning RabbitMQ
date: 2019-06-19 10:56:00
tags: [java, rabbitmq]
---

* <https://www.packtpub.com/application-development/learning-rabbitmq>

<!--more-->

rabbitmq

* exchanges: These are the RabbitMQ server endpoints to which the clients will connect and send messages. Each endpoint is identified by a unique key.
* queues: These are the RabbitMQ server components that buffer messages coming from one or more exchanges and send them to the corresponding message receivers. The messages in a queue can also be offloaded to a persistent storage (such queues are also called durable queues) that provides a higher degree of reliability in case of a failed messaging server; once the server is running again, the messages from persistent storage are placed back in the corresponding queues for transfer to recipients. Each queue is identified by a unique key.
* bindings: These are the logical link between exchanges and queues. Each binding is a rule that specifies how the exchanges should route messages to queues. A binding may have a routing key that can be used by clients in order to specify the routing semantics of a message.
* virtual hosts: The logical units that divide RabbitMQ server components (such as exchanges, queues, and users) into separate groups for better administration and access control. Each AMQP client connection is bound to a concrete virtual host.


exchanges

* direct exchange: This delivers a message based on a routing key that is provided in the message header (bindings should already be defined between the direct exchange and the queue). There is a pre-created direct exchange with the name .amq.direct. A specialized type of a direct exchange called default exchange with the empty string as the exchange name is also pre-created in the message broker. It has the special property where the binding key that is specified by the client should match the name of the queue to which a message is routed.
* fanout exchange: This delivers a message to all the queues that are bound to the exchange; it can be used to establish a broadcast mechanism for the delivery of messages to the queues. There is a pre-created fanout exchange with name .amq.fanout.
* topic exchange: This delivers the message to queues based on a routing filter specified between the topic exchange and queues; it can be used to establish a multicast mechanism for the delivery of messages. There is a pre-created topic exchange with the name .amq.topic.
* headers exchange: This can be used to deliver messages to queues based on other message header attributes (and not the routing key). There are two pre-created headers exchanges with names .amq.headers and .amq.match.

```shell

```
