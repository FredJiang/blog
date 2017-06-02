---
title: 设置 git 的 commit 的用户
date: 2017-05-27 18:02:18
tags: [git]
---


```
echo "" && \
echo "------" && \
echo "original" && \
git config --list && \
git config --global user.email "270130108@qq.com" && \
git config --global user.name "FredJiang" && \
echo "------" && \
echo "changed" && \
git config --list
```