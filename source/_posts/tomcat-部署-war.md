---
title: tomcat 部署 war
date: 2018-05-16 18:48:43
tags: [tomcat, war, java, spring, deploy, nginx]
---

启动 tomcat

```
./bin/catalina.sh run

# 或
./bin/startup.sh
./bin/shutdown.sh
```

打包

`mvn package`

<!--more-->

生成 war 文件

xxxxxx.war

war 文件传到

`tomcat/webapps`

自动生成文件夹

`tomcat/webapps/xxxxxx`

测试接口

`curl "http://127.0.0.1:8080/xxxxxx"`

配置 nginx

<https://stackoverflow.com/questions/37459006/cant-configure-nginx-as-a-proxy-for-tomcat-with-context-path>

```
server {
    client_max_body_size 4G;
    listen 80;
    server_name fred.jiang.com;

    location / {
        proxy_set_header   X-Real-IP          $remote_addr;
        proxy_set_header   X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto  $scheme;
        proxy_set_header   Host               $http_host;
        proxy_set_header   X-NginX-Proxy      true;
        proxy_set_header   Connection         "";
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:8080/xxxxxx/;
    }
}
```

注意 `proxy_pass` 后面的 `/`，否则会重定向到 `fred.jiang.com/xxxxxx`

日志的位置

`tomcat/logs`

或者把 tomcat 的根路径改了 `conf/server.xml`

```
  <!--<Host name="localhost"       appBase="webapps/xxxxxx" -->
      <Host name="fred.jiang.com"  appBase="webapps/xxxxxx"
            unpackWARs="true" autoDeploy="true">

      <Context path="/"
               docBase="/home/nodeuser/tomcat/webapps/xxxxxx"
               workDir="/home/nodeuser/tomcat/webapps/xxxxxx"
               debug="5" reloadable="false" crossContext="true" />

        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />

      </Host>
```

