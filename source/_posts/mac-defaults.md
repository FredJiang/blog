---
title: mac defaults
date: 2019-03-07 20:19:54
tags: [mac]
---


```sh
defaults read   DOMAIN       KEY
defaults write  DOMAIN       KEY              VALUE
defaults delete DOMAIN       KEY

defaults read   -g           AppleEdgeResizing
defaults write  -g           AppleEdgeResizing NO
defaults delete -g           AppleEdgeResizing
```