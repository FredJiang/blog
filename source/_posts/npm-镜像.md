---
title: npm 镜像
date: 2017-09-26 23:00:13
tags: [npm]
---


```
npm config list

cat ~/.npmrc

npm config set registry https://registry.npm.taobao.org && \
npm config set disturl https://npm.taobao.org/dist && \
npm config set NVM_NODEJS_ORG_MIRROR http://npm.taobao.org/mirrors/node && \
npm config set NVM_IOJS_ORG_MIRROR http://npm.taobao.org/mirrors/iojs && \
npm config set PHANTOMJS_CDNURL https://npm.taobao.org/dist/phantomjs && \
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron && \
npm config set SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass && \
npm config set SQLITE3_BINARY_SITE http://npm.taobao.org/mirrors/sqlite3 && \
npm config set PYTHON_MIRROR http://npm.taobao.org/mirrors/python
```