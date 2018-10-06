---
title: lldb 调试 node addon 源码
date: 2018-09-09 21:43:41
tags: [node.js, c++, javascript, ide, debug, xcode, lldb, node-gyp]
---

* [node-gyp 使用](../../../../2018/09/06/node-gyp-使用/)
* [vscode 调试 node addon 源码](../../../../2018/09/07/vscode-调试-node-addon-源码/)
* [xcode 调试 node addon 源码](../../../../2018/09/07/xcode-调试-node-addon-源码/)

<!--more-->

terminal 调试


* <http://lldb.llvm.org/lldb-gdb.html>
* <http://lldb.llvm.org/tutorial.html>


```sh
node-gyp clean && \
node-gyp configure --debug && \
node-gyp build --debug && \
mkdir build/Debug && \
cp build/Debug/first.node build/Debug

lldb -- /usr/local/bin/node /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/test.js
```


```
b first.cpp:14

b first.cpp:21
```
{% asset_img "1.png" "" %}
