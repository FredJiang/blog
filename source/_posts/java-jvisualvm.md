---
title: java jvisualvm
date: 2019-07-15 11:51:58
tags: [java, jstatd, jvisualvm]
---

```shell
sudo -u tomcat \
/opt/jdk1.8/bin/jstatd -J-Djava.security.policy=/tmp/jstatd.all.policy -J-Djava.rmi.server.logCalls=true -p 1099 -J-Djava.rmi.server.hostname=127.0.0.1

# 开防火墙时，要注意，除了 1099，还有个随机的 port
netstat -nap | grep jstatd

ssh fred@remoteIp -L 1099:127.0.0.1:1099
ssh fred@remoteIp -L 51739:127.0.0.1:51739


jps -J-Djps.debug=true -J-Djps.printStackTrace=true -lm rmi:127.0.0.1:1099

jvisualvm

/opt/visualvm_143/bin/visualvm
```
