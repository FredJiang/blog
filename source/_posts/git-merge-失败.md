---
title: git merge 失败
date: 2018-07-09 12:25:49
tags: [git, merge, sourcetree]
---

使用 sourcetree 合并两个分支时失败了

<!--more-->

直接使用命令

```
git merge 5.0.1

# 报错
# warning: refname '5.0.1' is ambiguous.
# Already up to date.

# 使用命令
git show-ref --heads --tags | grep '5.0.1'

# 有个分支和 tag 名字重复了
# bf18fa1e2039f0cd6f415b17b29435aa5a0d3549 refs/heads/5.0.1
# 6d5556df05bf8e3a1f723c344bd61e71d094c81c refs/tags/5.0.1

# 合并 5.0.1 分支
git merge refs/heads/5.0.1
```
