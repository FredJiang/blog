---
title: v8 笔记 6 -- debug
date: 2018-05-25 08:19:30
tags: [v8, node.js, google]
---

<https://github.com/v8/v8/wiki/Getting-Started-with-Embedding>

<!--more-->

```
cd ~/workspaceC
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# export PATH=$PATH:$HOME/workspaceC/depot_tools

cd depot_tools
fetch v8
cd v8
gclient sync
git checkout -b 6.8 -t branch-heads/6.8
gclient sync
```



```
# x64 是 x86_64 的缩写，指 x86 基础上的改进版（加入64位地址扩展等性能）
tools/dev/v8gen.py list # 显示支持版本
uname -a # 显示当前机器支持的版本
uname -m # 显示当前机器支持的版本

tools/dev/v8gen.py x64.debug # 跑一次

gn args out.gn/x64.debug # 跑一次

ninja -C out.gn/x64.debug
```

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

编译一遍，机器真热。。。
