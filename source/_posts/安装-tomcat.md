---
title: 安装 tomcat
date: 2017-12-31 17:05:45
tags: [java, tomcat]
---

<https://tecadmin.net/steps-to-install-tomcat-server-on-centos-rhel/>

<!--more-->

首先需要安装 java

update

```
sudo yum -y update && \
sudo yum -y upgrade && \
sudo yum -y install rng-tools

sudo systemctl start rngd
```

下载 tomcat <http://tomcat.apache.org/>

```
mkdir -p /opt/tomcat
cd ~
axel "http://mirrors.hust.edu.cn/apache/tomcat/tomcat-8/v8.0.48/bin/apache-tomcat-8.0.48.tar.gz"
tar -zxvf apache-tomcat-8.0.48.tar.gz -C /opt/tomcat --strip-components=1
```

启动 tomcat，如果启动很慢的话，看这里 <http://www.cnblogs.com/jie-fang/p/7211574.html>

```
./bin/catalina.sh run

# 或
./bin/startup.sh
./bin/shutdown.sh
```

在 conf/tomcat-users.xml 的 `<tomcat-users></tomcat-users>` tag 中添加

```
<!-- user manager can access only manager section -->
<role rolename="manager-gui" />
<user username="manager" password="_SECRET_PASSWORD_" roles="manager-gui" />

<!-- user admin can access manager and admin section both -->
<role rolename="admin-gui" />
<user username="admin" password="_SECRET_PASSWORD_" roles="manager-gui,admin-gui" />
```


tomcat 端口在 conf/server.xml

```
  <Connector port="8080"
```


如果报错

```
You are not authorized to view this page.

By default the Manager is only accessible from a browser running on the same machine as Tomcat. If you wish to modify this restriction, you'll need to edit the Manager's context.xml file.
```

可以修改 `webapps/manager/META-INF/context.xml` 中的 ip 限制（不用重启 tomcat）

```
<Context antiResourceLocking="false" privileged="true" >
<!-- 注释掉这里
  <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />
-->
  <Manager sessionAttributeValueClassNameFilter="java\.lang\.(?:Boolean|Integer|Long|Number|String)|org\.apache\.catalina\.filters\.CsrfPreventionFilter\$LruCache(?:\$1)?|java\.util\.(?:Linked)?HashMap"/>
</Context>
```