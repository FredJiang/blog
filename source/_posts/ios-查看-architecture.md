---
title: ios 查看 architecture
date: 2019-04-23 18:35:51
tags: [ios, xcode, oc]
---

```shell
lipo  -info libX.a
otool -hv   libX.a
file        libX.a
```