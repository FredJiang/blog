---
title: zabbix agent 安装
date: 2017-01-10 13:53:18
tags: [zabbix, agent, linux]
---


安装 agent

```
wget http://repo.zabbix.com/zabbix/3.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_3.2-1+xenial_all.deb && \
sudo dpkg -i zabbix-release_3.2-1+xenial_all.deb && \
sudo apt-get update -y && \
sudo apt-get install -y zabbix-agent
```

<!--more-->


备份配置文件

```
cat /etc/zabbix/zabbix_agentd.conf | egrep -e "^Server=" -e "^ServerActive=" && \
sudo cp /etc/zabbix/zabbix_agentd.conf /etc/zabbix/zabbix_agentd.confbackup
```


修改配置文件

```
cat /etc/zabbix/zabbix_agentd.confbackup | \
sed "s/^Server=.*/Server=127.0.0.1,yourIp/g" | \
sed "s/^ServerActive=.*/ServerActive=yourIp/g" | \
sed "s/^Hostname=.*/Hostname=mylinuxserver/g" \
> /etc/zabbix/zabbix_agentd.conf && \
diff /etc/zabbix/zabbix_agentd.confbackup /etc/zabbix/zabbix_agentd.conf
```

Server=127.0.0.1          # 被动模式，允许哪台服务器连接 agent，可同时允许多个服务器连接，例如：Server=127.0.0.1,192.168.0.100
ServerActive=127.0.0.1    # 主动模式，向哪台服务器传送数据

如果 zabbix-server 是用 docker 安装的，和 zabbix-server 同一个机器上的 zabbix-agent 注意加上 docker 的 ip 地址

默认的机器名字

```
cat /etc/zabbix/zabbix_agentd.confbackup | \
sed "s/^Server=.*/Server=127.0.0.1,yourIp/g" | \
sed "s/^ServerActive=.*/ServerActive=yourIp/g" | \
sed "s/^Hostname=.*/# Hostname=Zabbix server/g" | \
sed "s/^# HostnameItem=system\.hostname.*/HostnameItem=system.hostname/g" \
> /etc/zabbix/zabbix_agentd.conf && \
diff /etc/zabbix/zabbix_agentd.confbackup /etc/zabbix/zabbix_agentd.conf
```

重启服务

```
sudo service zabbix-agent status
```

查看日志

`cat /etc/zabbix/zabbix_agentd.conf  | grep '^LogFile='`

`tail -f /var/log/zabbix/zabbix_agentd.log`