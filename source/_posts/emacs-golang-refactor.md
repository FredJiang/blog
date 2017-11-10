---
title: emacs golang refactor
date: 2017-10-18 22:49:06
tags: [emacs, golang, refactor]
---

* <http://gorefactor.org/install.html#install-godoctor>

```
go get -u -v  github.com/godoctor/godoctor
go install    github.com/godoctor/godoctor
```

<!--more-->

godoctor -help

-pos offset,length

`godoctor -w -file main.go -pos 174,7 rename xxx`

将 main.go 文件中的，从第 174 个字符开始的 7 个字符长度的变量，改为 xxx

174 在 emacs 中可以用命令 what-cursor-position 获取

-pos startrow,startcol:endrow,endcol

godoctor -w -file main.go -pos 15,1:15,7 rename xxx # tab 好像不算字符


emacs 插件（使用失败）

<https://github.com/microamp/godoctor.el>

vim 插件（我用的 Vundle）

Plugin 'godoctor/godoctor.vim'

在 vim 中执行 Rename


试用结论，vim 里面好用。。。