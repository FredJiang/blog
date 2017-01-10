---
title: zabbix agent 安装
date: 2017-01-10 13:53:18
tags: [zabbix, agent, linux]
---


安装 agent

```
wget http://repo.zabbix.com/zabbix/3.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_3.2-1+xenial_all.deb && \
sudo dpkg -i zabbix-release_3.2-1+xenial_all.deb && \
sudo apt-get update && \
sudo apt-get install zabbix-agent
```

<!--more-->


备份配置文件

```
cat /etc/zabbix/zabbix_agentd.conf | egrep -e "^Server=" -e "^ServerActive=" && \
cd /etc/zabbix && \
cp zabbix_agentd.conf zabbix_agentd.confbackup
```


修改配置文件

```
cat zabbix_agentd.confbackup | \
sed "s/^Server=.*/Server=127.0.0.1,yourIp/g" | \
sed "s/^ServerActive=.*/ServerActive=yourIp/g" | \
sed "s/^Hostname=.*/Hostname=mylinuxserver/g" \
> zabbix_agentd.conf && \
diff zabbix_agentd.confbackup zabbix_agentd.conf
```

重启服务

```
sudo service zabbix-agent status
```

查看日志

`tail -f /var/log/zabbix-agent/zabbix_agentd.log`