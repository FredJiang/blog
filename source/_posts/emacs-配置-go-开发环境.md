---
title: emacs 配置 go 开发环境
date: 2017-04-30 11:16:14
tags: [emacs, golang]
---


参考 <https://golang.org/doc/install>

下载 go <https://golang.org/dl/>

```
wget "https://storage.googleapis.com/golang/go1.8.1.linux-amd64.tar.gz"
tar -xvf go1.8.1.linux-amd64.tar.gz
mv go go1.8.1
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
go get -u -v github.com/nsf/gocode
go get -u -v github.com/rogpeppe/godef
go get -u -v github.com/kisielk/errcheck
go get -u -v golang.org/x/tools/cmd/goimports
go get -u -v golang.org/x/tools/cmd/godoc
go get -u -v golang.org/x/lint/golint
```

如果被墙了

由规则 `golang.org/x/PATH_TO_PACKAGE —> github.com/golang/PATH_TO_PACKAGE`

可以使用如下地址

```
go get -u -v github.com/nsf/gocode
go get -u -v github.com/rogpeppe/godef
```

下面三个，参考 <http://golangtc.com/t/56f3c175b09ecc66b9000181> 安装

```
go get -u -v github.com/golang/tools/cmd/goimports
go get -u -v github.com/golang/tools/cmd/godoc
go get -u -v github.com/golang/lint/golint
```



使用如下方式安装

```
cd $GOPATH/src/github.com/golang
git clone https://github.com/golang/tools
git clone https://github.com/golang/lint
git clone https://github.com/golang/crypto
git clone https://github.com/golang/net


cp -r $GOPATH/src/github.com/golang/lint/ $GOPATH/src/golang.org/x/lint/
cp -r $GOPATH/src/github.com/golang/tools/ $GOPATH/src/golang.org/x/tools/
cp -r $GOPATH/src/github.com/golang/crypto/ $GOPATH/src/golang.org/x/crypto/
cp -r $GOPATH/src/github.com/golang/net/ $GOPATH/src/golang.org/x/net/

ls $GOPATH/bin

cd $GOPATH/src/golang.org/x/lint/golint && go build && go install && ls $GOPATH/bin

cd $GOPATH/src/golang.org/x/tools/cmd/goimports && go build && go install && ls $GOPATH/bin

cd $GOPATH/src/golang.org/x/tools/cmd/godoc && go build && go install && ls $GOPATH/bin

```







### 在开发过程中查看 API 文档

文档在这里

<https://golang.org/pkg/>


以以下代码为例

```
import (
	"net/http"
)
func sayhelloName(w http.ResponseWriter, r *http.Request) {
}
```

可以在 <https://golang.org/pkg/net/http/#Request>

找到 `net.http.Request` 下有什么字段








 
在 emacs 中查看 API 文档

<https://github.com/dominikh/go-mode.el>

* `gofmt` 格式化代码
* `godef` 查看文档
* `godoc` 查看文档
* `go-goto-[]`

[flycheck](https://github.com/flycheck/flycheck)


{% asset_img "flycheck_1.png" "" %}


{% asset_img "flycheck_2.png" "" %}



go 教程

* <https://tour.golang.org/welcome/1>
* <https://www.tutorialspoint.com/go/index.htm>