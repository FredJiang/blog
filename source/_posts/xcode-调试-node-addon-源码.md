---
title: xcode 调试 node addon 源码
date: 2018-09-07 22:57:34
tags: [node.js, c++, javascript, ide, debug, xcode, lldb, node-gyp]
---

* [node-gyp 使用](../../../../2018/09/06/node-gyp-使用/)
* [vscode-调试-node-addon-源码](../../../../2018/09/07/vscode-调试-node-addon-源码/)
* <https://www.youtube.com/watch?v=DND2H2-XfAc>

<!--more-->

```
cd 1firstBuild

node-gyp clean
node-gyp configure -- -f xcode
open build/binding.xcodeproj/
```

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

{% asset_img "4.png" "" %}

{% asset_img "5.png" "" %}

{% asset_img "6.png" "" %}

{% asset_img "7.png" "" %}

```
mkdir build/Debug
cp /Users/Fred/Library/Developer/Xcode/DerivedData/binding-hagqjxukzliszygmbxejpvveefwj/Build/Products/Debug/first.node build/Debug
```

{% asset_img "8.png" "" %}

