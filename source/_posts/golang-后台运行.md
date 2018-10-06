---
title: golang 后台运行
date: 2017-05-27 11:02:42
tags: [golang, supervisor, daemon]
---

<http://supervisord.org/index.html>

安装 supervisor

```
sudo yum install -y python-setuptools
sudo easy_install supervisor
supervisord --version
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

将 `/tmp/supervisor.sock` 修改为 `/var/run/supervisor.sock`，避免出现 `unix:///tmp/supervisor.sock no such file`（`/tmp` 下的文件会不定时删除）

其他的 tmp 目录也需要一并修改了

在 /etc/supervisord.conf 末尾添加如下配置

```
[program:golang_dataCollector]
command=sh -c 'HTTP_PORT=10000 /home/fred/workspacego/src/dataCollector/dataCollector'
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


或者打开 /etc/supervisord.conf 中的 include


```
[include]
files=/etc/supervisord.d/*.ini
```

启动 supervisor（日志文件为 /tmp/supervisord.log）

```
# 启动
sudo /usr/bin/supervisord -c /etc/supervisord.conf
# 查看状态
sudo supervisorctl status
# 关闭
pgrep supervisord
sudo kill -9 `pgrep supervisord`
pgrep supervisord
```

进程号

`cat /tmp/supervisord.pid`

查看 supervisor 运行状态

```bash
sudo supervisorctl
help
status

# 或
sudo supervisorctl help
sudo supervisorctl status
```

其他命令

<http://www.onurguzel.com/supervisord-restarting-and-reloading/>

|                               command                               |                                                                                                                                                                                                                                                                |
|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo service supervisor restart`                                   | Restart supervisor service without making configuration changes available. It stops, and re-starts all managed applications.                                                                                                                                   |
| `supervisorctl restart <name>`                                      | Restart application without making configuration changes available. It stops, and re-starts the application.                                                                                                                                                   |
| `sudo service supervisor stop` <br> `sudo service supervisor start` | If you want to apply your configuration changes in both existing and new configurations.                                                                                                                                                                       |
| `sudo supervisorctl reread`                                         | If you do not want to re-start all managed applications, but make your configuration changes available, use this command. This command only updates the changes. It does not restart any of the managed applications, even if their configuration has changed. |
| `sudo supervisorctl update`                                         | Restarts the applications whose configuration has changed. After the update command, new application configurations becomes available to start, but do not start automatically until the supervisor service restarts                                           |


web 操作打开

```
;[inet_http_server]         ; inet (TCP) server disabled by default
;port=127.0.0.1:9001        ; (ip_address:port specifier, *:port for all iface)
;username=user              ; (default is no username (open server))
;password=123               ; (default is no password (open server))
```

另外可参考

* <http://liyangliang.me/posts/2015/06/using-supervisor/>
* <http://supervisord.org/running.html>
* <https://github.com/NanXiao/golang-101-hacks/blob/master/posts/go-build-vs-go-install.md>


