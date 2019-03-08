---
title: dubbo api
date: 2018-11-15 20:31:12
tags: [java, dubbo, rpc]
---

<https://github.com/dubbo/dubbo-samples/blob/master/dubbo-samples-api/README.md>

<!--more-->

```bash
git clone https://github.com/dubbo/dubbo-samples.git
cd dubbo-samples/dubbo-samples-api
mvn clean package

mvn -Djava.net.preferIPv4Stack=true -Dexec.mainClass=org.apache.dubbo.samples.provider.Application exec:java

mvn -Djava.net.preferIPv4Stack=true -Dexec.mainClass=org.apache.dubbo.samples.consumer.Application exec:java
```

目录结构

```
src
└── main
    └── java
        └── org
            └── apache
                └── dubbo
                    └── samples
                        ├── api
                        │   └── GreetingsService.java
                        ├── consumer
                        │   └── Application.java
                        └── provider
                            ├── Application.java
                            └── GreetingsServiceImpl.java
```
