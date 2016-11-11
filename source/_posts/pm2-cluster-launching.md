---
title: pm2 cluster launching
date: 2016-06-29 15:36:48
tags: [pm2, cluster]
---


由于业务的增长，node 单进程 cpu 已经跑满了，因此需要把其他的 cpu 也要利用起来，这里我用到了 pm2 的 cluster mode。

在测试服务器上，把原来的应用删了，然后重启

```
pm2 delete appname
pm2 start app.js --name appname -i 0
```

遇到了一个问题 appname 这个程序的状态一直是 launching 的，关不掉，删不掉

<!--more-->

处理办法

`pm2 save` 把当前的跑的程序记录到 `~/.pm2/dump.pm2` 中

获取当前 pm2 中启动的程序（apps 为 ~/.pm2/dump.pm2 中的内容）

dump.js

```
var apps = [{
    name: "appname",
    pm_exec_path: "/opt/project/appname/app.js",
    status: "online",
    "其他参数": "xxx",
}]

var appDic = {}

for (var i = 0; i < apps.length; i++) {
    var app = apps[i]
    var newApp = {}
    newApp.status = app.status
    newApp.name = app.name
    newApp.pm_exec_path = app.pm_exec_path
    newApp.script = app.pm_exec_path
    newApp.cmd = 'pm2 start ' + newApp.script + ' --name ' + newApp.name
    var key = app.status
    if (!appDic[key]) {
        appDic[key] = []
    }
    appDic[key].push(newApp)
}
console.log(appDic)

console.log('')
for (var i in appDic.online) {
    console.log(appDic.online[i].cmd)
}
```

```
{ online: 
   [ { status: 'online',
       name: 'appname',
       pm_exec_path: '/opt/project/appname/app.js',
       script: '/opt/project/appname/app.js',
       cmd: 'pm2 start /opt/project/appname/app.js --name appname' } ] }

pm2 start /opt/project/appname/app.js --name appname
```

`node dump.js`

```
pkill -9 PM2
pkill -9 node
```

根据 dump.js 输出的内容，启动其他程序

再以 cluster mode 启动 appname

`pm2 start /opt/project/appname/app.js --name appname -i 0`

参考 

* <https://github.com/Unitech/pm2/issues/1378>
* <http://pm2.keymetrics.io/docs/usage/update-pm2/>
