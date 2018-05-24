---
title: clion 调试 node 源码
date: 2018-05-21 20:01:04
tags: [node.js, clion, c++, javascript, ide, debug]
---

[node 源码编译](../../../../2018/04/28/node-源码编译/)

<!--more-->

下载代码

```
git clone https://github.com/nodejs/node.git
```

检查工具版本

```
echo ''                   && \
echo 'gcc     --version ' && gcc     --version && echo '' && \
echo 'g++     --version ' && g++     --version && echo '' && \
echo 'clang   --version ' && clang   --version && echo '' && \
echo 'clang++ --version ' && clang++ --version && echo '' && \
echo 'make    --version ' && make    --version && echo '' && \
echo 'python  --version ' && python  --version
```

开始编译

```
./configure --debug
make -j2 -C out BUILDTYPE=Debug
```

测试

```
./out/Debug/node -e "console.log(process.version)"
```

编译好了后，在 clion 导入（是导入） node 项目

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

{% asset_img "4.png" "" %}

{% asset_img "5.png" "" %}

结合 

[chrome 调试 node](../../../../2018/05/21/chrome-调试-node/)

```
node --inspect-brk debug.js
```

{% asset_img "6.png" "" %}

在 chrome 中输入 `chrome://inspect`

{% asset_img "7.png" "" %}

