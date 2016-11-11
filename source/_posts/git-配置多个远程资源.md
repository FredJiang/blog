---
title: git 配置多个远程资源
date: 2016-08-05 10:13:54
tags: [git, gitlab, deploy]
---


由于项目开发和部署的权限问题，需要将同一个 git 项目放到两个 gitlab 上。

<!--more-->

先直接看下配置文件 `.git/config`

```
[remote "all"]
	url = ssh://git@gitlab.dev/xxx.git
	url = http://gitlab.pro/xxx.git
[remote "origin"]
	url = ssh://git@gitlab.dev/xxx.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```

开发用 gitlab.dev，部署用 gitlab.pro。我这从 origin pull，push 到 all，也就是从 gitlab.dev pull，push 到 gitlab.dev 和 gitlab.pro。

下面看具体怎么使用

直接用 SourceTree 就不敲命令了

{% asset_img "0.png" "" %}

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

{% asset_img "4.png" "" %}