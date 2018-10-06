---
title: node-gyp 使用
date: 2018-09-06 08:06:17
tags: [node, node-gyp, javascript, c++]
---

安装

`npm install -g node-gpy`

<!--more-->

|        命令        |                              作用                              |             |
|--------------------|----------------------------------------------------------------|-------------|
| node-gpy -h        |                                                                |             |
| node-gpy build     | 调用 make（unix） 或 msbuild（windows）以构建模块              |             |
| node-gpy clean     | 清理生成的构建文件以及 out 目录                                |             |
| node-gpy configure | 为当前模块生成 Makefile（unix）或 MSVC（windows） 项目配置文件 |             |
| node-gpy rebuild   | 一次性执行 clean/configure build                               |             |
| node-gpy install   | 安装开发环境的文件                                             | ~/.node-gyp |
| node-gpy list      | 输出开发环境的文件                                             |             |
| node-gpy remove    | 移除开发环境的文件                                             |             |

`cat ~/.npmrc`

```
registry=https://registry.npm.taobao.org/
disturl=https://npm.taobao.org/dist
NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
PYTHON_MIRROR=http://npm.taobao.org/mirrors/python
SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
```

设置环境变量

`export NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node`

直接使用临时环境变量

`NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node node-gpy install`


下载代码

<https://github.com/XadillaX/nyaa-nodejs-demo>

`pwd`

`~/workspaceC/nyaa-nodejs-demo/1. first build`



```
node-gyp configure
node-gyp build
```

test.js

```
const first = require('./build/Release/first');

first.first();
```

`node test.js`


