---
title: node pm2 使用参数和环境变量
date: 2016-08-10 10:33:09
tags: [pm2, node, args, environment]
---


#### 需求

同一份代码需要部署到不同的服务器上面。比如同时部署到 A 服务器和 B 服务器，在 A 上标题为 A，在 B 上标题为 B。

<!--more-->

#### 实现

##### 给 node 传参数

要执行的代码 app.js

```
// app.js
setInterval(function() {
    console.log(process.argv)
}, 2000)
```

---

运行

`node app.js`

输出

```
[ '/usr/local/bin/node',
  '/Users/Fred/Desktop/nodeArgsTest/app.js' ]
```
---
运行

`node app.js arg1 arg2 arg3`

输出

```
[ '/usr/local/bin/node',
  '/Users/Fred/Desktop/nodeArgsTest/app.js',
  'arg1',
  'arg2',
  'arg3' ]
```
---
运行

`pm2 start app.js -- arg1 arg2 arg3`

输出

```
app-0 [ '/usr/local/bin/node',
app-0   '/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js',
app-0   'arg1',
app-0   'arg2',
app-0   'arg3' ]
```


##### 以 pm2 配置文件的形式执行

---
app1.json

```
{
    "apps": [{
        "name": "app1",
        "script": "/Users/Fred/Desktop/nodeArgsTest/app.js"
    }]
}

```

运行

`pm2 start app1.json`

输出

```
app1-0 [ '/usr/local/bin/node',
app1-0   '/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js' ]
```

---
app2.json

```
{
    "apps": [{
        "name": "app2",
        "script": "/Users/Fred/Desktop/nodeArgsTest/app.js",
        "args": "arg1 arg2 arg3"
    }]
}

```


运行

`pm2 start app2.json`

输出

```
app2-0 [ '/usr/local/bin/node',
app2-0   '/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js',
app2-0   'arg1',
app2-0   'arg2',
app2-0   'arg3' ]
```

---

app3.json

```
{
    "apps": [{
        "name": "app3",
        "script": "/Users/Fred/Desktop/nodeArgsTest/app.js",
        "args": "gameid:1 nodeport:3001"
    }]
}
```

运行

`pm2 start app3.json`

输出

```
app3-0 [ '/usr/local/bin/node',
app3-0   '/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js',
app3-0   'gameid:1',
app3-0   'nodeport:3001' ]
```
---

##### 使用环境变量

要执行的代码 app.js

```
setInterval(function() {
    console.log(process.argv)
    console.log(process.env.GAME_ID)
    console.log(process.env.NODE_PORT)
}, 2000)
```


运行

`GAME_ID='1' NODE_PORT='3001' node app.js`

输出

```
[ '/usr/local/bin/node',
  '/Users/Fred/Desktop/nodeArgsTest/app.js' ]
1
3001
```

---





运行

`GAME_ID='1' NODE_PORT='3001' pm2 start app.js`

输出

```
app-0 [ '/usr/local/bin/node',
app-0   '/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js' ]
app-0 1
app-0 3001
```


##### 以 pm2 配置文件的形式执行


app4.json

```
{
    "apps": [{
        "name": "app4",
        "script": "/Users/Fred/Desktop/nodeArgsTest/app.js",
        "env": {
            "GAME_ID": "1",
            "NODE_PORT": "3001"
        }
    }]
}

```

运行

`pm2 start app4.json`

输出

```
app4-0 [ '/usr/local/bin/node',
app4-0   '/usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js' ]
app4-0 1
app4-0 3001
```