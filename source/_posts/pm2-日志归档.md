---
title: pm2 日志归档
date: 2016-09-14 13:42:03
tags: [pm2, log, logrotate]
---

参考

* <http://pm2.keymetrics.io/docs/usage/log-management/#pm2-logrotate-module>
* <https://github.com/pm2-hive/pm2-logrotate>

<!--more-->


直接安装上，会用默认的参数，对当前的 pm2 进程生效

`
pm2 install pm2-logrotate
`


参数的配置，看文档 <https://github.com/pm2-hive/pm2-logrotate>

```
pm2 set pm2-logrotate:max_size 4G
pm2 set pm2-logrotate:retain 30
```

参数的查看

`cat /youpath/.pm2/module_conf.json`

```
{
    "module-db": {
        "pm2-logrotate": "true"
    },
    "pm2-logrotate": {
        "max_size": "10G",
        "retain": "30"
    }
}
```


```bash
pm2 set pm2-logrotate:"max_size": "4G"
pm2 set pm2-logrotate:"retain": "all"
pm2 set pm2-logrotate:"compress": "false"
pm2 set pm2-logrotate:"rotateInterval": "00 00 01 * * *"
pm2 set pm2-logrotate:"dateFormat": "YYYY-MM-DD"
```
