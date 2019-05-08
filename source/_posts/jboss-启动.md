---
title: jboss 启动
date: 2019-03-23 22:52:07
tags: [ejb, java, jboss]
---

下载 jboss

* <http://jbossas.jboss.org/downloads/>
* <http://wildfly.org/>

<!--more-->

```sh
cd /opt/
axel "https://download.jboss.org/wildfly/16.0.0.Final/wildfly-16.0.0.Final.zip"
unzip wildfly-16.0.0.Final.zip
cd wildfly-16.0.0.Final
```

启动 jboss

* <https://www.baeldung.com/jboss-start-stop>

```sh
# cat standalone/configuration/standalone.xml
./bin/standalone.sh --server-config=standalone.xml -b 0.0.0.0 -bmanagement 0.0.0.0
```

添加用户

```sh
# cat standalone/configuration/application-users.properties
# cat standalone/configuration/mgmt-users.properties
./bin/add-user.sh
```

测试 url

```
http://127.0.0.1:8080
http://127.0.0.1:9990/management
http://127.0.0.1:9990/console/index.html
```

```sh
./bin/jboss-cli.sh --connect --controller=127.0.0.1:9990
./bin/jboss-cli.sh --connect --controller=127.0.0.1:9990 command:shutdown
```

domain

We can manage multiple instances of the server from a single control point. These servers are logically members of a single domain. Here, a single Domain Controller process acts as the central management control point.

The process of starting the server under a managed domain remains the same as the standalone server. However, instead of standalone.sh/domain.bat, we’ll use domain.sh/domain.bat.

Consequently, this will spin up multiple servers instances under a single domain.

```sh
./bin/domain.sh --server-config=standalone.xml -b 0.0.0.0 -bmanagement 0.0.0.0
```


部署 war

<https://www.baeldung.com/jboss-war-deploy>

