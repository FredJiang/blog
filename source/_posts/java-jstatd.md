---
title: java jstatd
date: 2019-07-12 13:13:15
tags: [java, jstatd]
---

* <https://docs.oracle.com/javase/7/docs/technotes/tools/share/jstatd.html>
* <https://docs.oracle.com/en/java/javase/12/tools/tools-and-command-reference.html>

<!--more-->

```shell
echo $JAVA_HOME
```

/tmp/jstatd.all.policy

```
grant codebase "file:${java.home}/../lib/tools.jar" {
   permission java.security.AllPermission;
};
```

```shell
jstatd -J-Djava.security.policy=/tmp/jstatd.all.policy -J-Djava.rmi.server.logCalls=true

sudo -u tomcat \
/opt/jdk1.8/bin/jps -lm

sudo -u resin \
/opt/jdk1.8/bin/jps -lm

/opt/jdk1.8/bin/jps -lm


hostname
hostname -i
jstatd -J-Djava.security.policy=/tmp/jstatd.all.policy -J-Djava.rmi.server.logCalls=true -p 1099 -J-Djava.rmi.server.hostname=remoteIp
# 开防火墙时，要注意，除了 1099，还有个随机的 port
netstat -nap | grep jstatd
lsof -i      | grep jstatd
jps -lm rmi:remoteIp:1099


sudo -u tomcat \
/opt/jdk1.8/bin/jstatd -J-Djava.security.policy=/tmp/jstatd.all.policy -J-Djava.rmi.server.logCalls=true -p 1099 -J-Djava.rmi.server.hostname=127.0.0.1

sudo -u resin \
/opt/jdk1.8/bin/jstatd -J-Djava.security.policy=/tmp/jstatd.all.policy -J-Djava.rmi.server.logCalls=true -p 1099 -J-Djava.rmi.server.hostname=127.0.0.1

/opt/jdk1.8/bin/jstatd -J-Djava.security.policy=/tmp/jstatd.all.policy -J-Djava.rmi.server.logCalls=true -p 1099 -J-Djava.rmi.server.hostname=127.0.0.1

netstat -nap | grep jstatd

ssh fred@remoteIp -L 1099:127.0.0.1:1099
ssh fred@remoteIp -L 39541:127.0.0.1:39541

jps -J-Djps.debug=true -J-Djps.printStackTrace=true -lm rmi:127.0.0.1:1099
```




在 windows 上

```
echo $JAVA_HOME

/c/Program\ Files/Java/jdk1.8.0_201/bin/jps

"$JAVA_HOME"/bin/jps

"$JAVA_HOME"/bin/jstatd -J-Djava.security.policy=/c/Users/fred/Desktop/jstatd.all.policy -J-Djava.rmi.server.logCalls=true -p 1099 -J-Djava.rmi.server.hostname=remoteIp
```




