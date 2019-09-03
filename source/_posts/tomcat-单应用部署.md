---
title: tomcat 单应用部署
date: 2018-12-17 12:51:06
tags: [tomcat, java, deploy]
---

* <https://blog.csdn.net/qq_22627687/article/details/76555886>
* <http://tomcat.apache.org/tomcat-8.5-doc/config/index.html>
* <https://www.baeldung.com/tomcat-root-application>

<!--more-->

文件 /web/tomcat/deploy.test.fred.com_tc8_8112/conf/server.xml

```xml
<Server port="6112" shutdown="SHUTDOWN">
    <Connector port="8112" protocol="HTTP/1.1"
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="false">
        <Context path="" docBase="/export/tomcat_vhost/deploy.test.fred.com_tc8_8112" debug="0" reloadable="false">
```

Context 还可以在另外三个地方配置

* Tomcat’s `CATALINA_HOME/conf/[EngineName]/[Hostname]`
* Your web application’s `WEB-INF/context.xml`
* Your web application’s `META-INF/context.xml`

```sh
ls /export/tomcat_vhost/deploy.test.fred.com_tc8_8112
META-INF  WEB-INF
```

文件 /web/tomcat/deploy.test.fred.com_tc8_8112/bin/startup.sh

```sh
#!/bin/sh

current_user=`whoami`

if [ "$current_user" != "tomcat" ]; then
    echo "[Error]: current user muste be 'tomcat'"
    exit 1
fi
```

文件 /web/tomcat/deploy.test.fred.com_tc8_8112/bin/restart.sh

```sh
#!/bin/sh

sudo -u tomcat /web/tomcat/deploy.test.fred.com_tc8_8112/bin/shutdown.sh
sudo -u tomcat /web/tomcat/deploy.test.fred.com_tc8_8112/bin/startup.sh
```

文件 /web/tomcat/deploy.test.fred.com_tc8_8112/bin/catalina.sh

```sh
echo is_stop: "$is_stop"

if [ "$is_stop" = "true" ] ; then
  echo kill tomcat
  sleep 5
  ps -ef | grep 'deploy.test.fred.com_tc8_8112' | grep 'org.apache.catalina.startup.Bootstrap start' | grep -v grep | awk '{print $2}' | xargs kill -9
else
  echo param1 != "stop" ["$@"]
fi
```

日志在 /web/tomcat/deploy.test.fred.com_tc8_8112/logs
