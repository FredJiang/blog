---
title: golang 后台运行
date: 2017-05-27 11:02:42
tags: [golang, supervisor]
---




安装 supervisor


```
sudo yum install python-setuptools
sudo easy_install supervisor
```

<!--more-->

查看配置

```
echo_supervisord_conf
```

生成配置文件

```
sudo echo_supervisord_conf > /etc/supervisord.conf
```

在 /etc/supervisord.conf 末尾添加如下配置


```
[program:golang_dataCollector]
command=/home/fred/workspacego/src/dataCollector/dataCollector
autostart=true
autorestart=true
startsecs=10
stdout_logfile=/var/log/golang_dataCollector.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=10
stdout_capture_maxbytes=1MB
stderr_logfile=/var/log/golang_dataCollector.log
stderr_logfile_maxbytes=1MB
stderr_logfile_backups=10
stderr_capture_maxbytes=1MB
```


启动 supervisor（日志文件为 /tmp/supervisord.log）


`sudo /usr/bin/supervisord -c /etc/supervisord.conf`


如果修改了配置文件

`cat /tmp/supervisord.pid | xargs sudo kill -HUP`

查看 supervisor 运行状态

`sudo supervisorctl`


从这抄的

<http://studygolang.com/articles/4480>


另外可参考

* <http://liyangliang.me/posts/2015/06/using-supervisor/>
* <http://supervisord.org/running.html>
* <https://github.com/NanXiao/golang-101-hacks/blob/master/posts/go-build-vs-go-install.md>
