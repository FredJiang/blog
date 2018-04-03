---
title: golang 跨平台编译
date: 2017-11-19 12:32:22
tags: [golang]
---

<http://golangcookbook.com/chapters/running/cross-compiling/>

<!--more-->

// 本机环境

`go build crossCompiling.go`

// mac os

`GOOS=darwin GOARCH=386 go build crossCompiling.go`

// windows

`GOOS=windows GOARCH=386 go build crossCompiling.go`

{% asset_img "1.png" "" %}