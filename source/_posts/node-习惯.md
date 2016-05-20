---
title: node 习惯
date: 2016-04-19 10:06:02
tags: [node, nodejs, npm]
---


###### 1. 用 `npm init` 开始新项目

Npm 的 init 命令能为项目生成一个 package.json 文件。

```
mkdir my-awesome-app
cd my-awesome-app
npm init --yes
```

然后编辑 package.json 文件，如添加 node 版本

```
"engines": {
"node": "4.2.1"
}
```

<!--more-->

###### 2. 使用 .npmrc 文件

在项目中，用户 A `npm install foobar` 之后，然后提交代码。用户 B pull 代码，运行项目会报找不到模块 foobar 的错误。在这种情况下，用户 B 也需要运行 `npm install foobar`。用户 B 运行一次 npm install 好像还可以接受，但是如果用户 A 一次 install 了很多模块怎么办？还有就是在用户 A 和用户 B 的机器上，怎么确保 foobar 的版本是一样的？

用下面的命令可以解决这个问题
`npm install foobar --save --save-exact`

--save 会在 package.json 中添加模块，--save-exact 会确定版本号。

在此基础上用户 B 只需要运行 `npm install` 即可。

更好的做法是配置 `~/.npmrc` 文件

```
npm config set save-exact=true
npm config set save=true
```

###### [3. Hop on the ES6 train](https://blog.heroku.com/archives/2015/11/10/node-habits-2016#3-hop-on-the-es6-train)

###### 4. 文件名用小写字母

在 OSX 和 Windows 下，文件名是不区分大小写的，因此 'myclass.js' 和 'MyClass.js' 被看成是一样的，但在 Linux 下这两个文件是不一样的。想要跨平台的话，文件名最好小写。

###### 5. Cluster your app

因为 node runtime 被限制只能使用单个 CPU 和 1.5GB 内存，因此在大的服务器上部署 non-clustered 程序就有点浪费资源了。可以尝试使用 [Cluster](https://nodejs.org/api/cluster.html)


###### [6. Be environmentally aware](https://blog.heroku.com/archives/2015/11/10/node-habits-2016#6-be-environmentally-aware)

###### 7. 垃圾回收

Node (V8) 使用 lazy 和 greedy 垃圾回收机制。默认内存上限是 1.5 GB，有时直到使用了 1.5GB 时，才开始回收内存。因此如果使用的内存一直增长的话，不一定是内存泄露，只是垃圾回收还没开始而已。

通过传递 flags 给 V8，可以控制垃圾回收机制，特别是你的机器总内存不足 1.5GB 的情况下

```
web: node --optimize_for_size --max_old_space_size=920 --gc_interval=100 server.js
```

###### 8. Hook things up

Npm 的 [lifecycle scripts](https://docs.npmjs.com/misc/scripts) 可以做一些自动化的事情。如下示例会在 `npm install` 后自动运行 `bower install && grunt build`

```
"scripts": {
"postinstall": "bower install && grunt build"
}
```

还可以用环境变量来做进一步的控制

```
"postinstall": "if $BUILD_ASSETS; then npm run build-assets; fi",
"build-assets": "bower install && grunt build"
```

也可以使用单独的脚本文件

```
"postinstall": "scripts/postinstall.sh"
```


###### 9. 在 git 中忽略掉不必要的文件，如

* node_modules
* npm-debug.log
* 等其他不必要的文件



[原文](https://blog.heroku.com/archives/2015/11/10/node-habits-2016)