---
title: emacs 配置 go 开发环境
date: 2017-04-30 11:16:14
tags: [emacs, go]
---


参考 <https://golang.org/doc/install>

下载 go <https://golang.org/dl/>

```
wget "https://storage.googleapis.com/golang/go1.8.1.linux-amd64.tar.gz"
```

<!--more-->

解压后，配置环境变量

```
export GOROOT=$HOME/go1.8.1/
export PATH=$PATH:$GOROOT/bin:
export GOPATH=$HOME/workspacego
export PATH=$PATH:$GOPATH/bin:
export GOBIN=$GOPATH/bin
```

安装 emacs 插件

`auto-complete` `go-mode` `go-eldoc` `go-autocomplete`


安装 go tool

```
go get -u -v golang.org/x/tools/cmd/goimports
go get -u -v golang.org/x/tools/cmd/godoc
go get -u -v golang.org/x/lint/golint
go get -u -v github.com/nsf/gocode
go get -u -v github.com/rogpeppe/godef
```

如果被墙了

由规则 `golang.org/x/PATH_TO_PACKAGE —> github.com/golang/PATH_TO_PACKAGE`

可以使用如下地址

```
go get -u -v github.com/golang/tools/cmd/goimports ; \
go get -u -v github.com/golang/tools/cmd/godoc ; \
go get -u -v github.com/golang/lint/golint ; \
go get -u -v github.com/nsf/gocode ; \
go get -u -v github.com/rogpeppe/godef
```


如果还不行的话，参考 <http://golangtc.com/t/56f3c175b09ecc66b9000181>

使用如下方式安装

```
cd $GOPATH/src/github.com
git clone https://github.com/golang/tools
# 这里安装 lint
cp -r $GOPATH/src/github.com/golang/lint/ $GOPATH/src/golang.org/x/lint/
cd $GOPATH/src/golang.org/x/lint/golint
go build
go install
```

