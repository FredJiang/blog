title: pm2-web 安装
date: 2015-02-01 23:54:08
tags: [nodejs,pm2,pm2-web]
---

参考地址 <https://www.npmjs.com/package/pm2-web>

### 安装 pm2-web

<!--more-->

我安装 pm2-web 的时候，遇到了 node 版本的问题，在这里，我先安装 node 版本管理工具 <https://github.com/tj/n>

然后切换到 node 的稳定版本

```
sudo n stable
```

接着安装 pm2-web 和其依赖库 node-inspector

```
sudo npm install -g node-inspector
sudo npm install -g pm2-web
```

### 运行 pm2-web，并修改配置文件

通过 pm2-web 运行 pm2-web

```
pm2-web
```

pm2-web 运行后，在 terminal 打印的日志中可以看到配置文件的位置

修改配置文件

```
sudo vim  /usr/local/lib/node_modules/pm2-web/server/components/../../config.json
```

<span style="color: red">"enabled": true,</span>


```
"authentication": {
        // set to true to enable basic http auth
        //"enabled": false,
        "enabled": true,
        // basic http auth credentials
        "username": "a_user_name",
        "password": "a_password"
},
```

### 通过 pm2 来运行 pm2-web

我这已经安装 pm2 了，没有安装的可以参考 <https://github.com/Unitech/pm2>

首先找到 pm2-web 的 path

```
which pm2-web
```

我这 pm2-web 的 path 为 /usr/local/bin/pm2-web

通过 pm2 来运行 pm2-web

```
pm2 start /usr/local/bin/pm2-web --name pm2-web
```

通过 localhost:9000 来查看 pm2-web 运行结果