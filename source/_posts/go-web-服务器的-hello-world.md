---
title: go web 服务器的 hello world
date: 2017-05-07 17:25:10
tags: [go, web]
---

代码

{% asset_img "code.png" "" %}


`web.go`

<!--more-->

```
package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	fmt.Fprintf(w, "Hello astaxie!")
}

func main() {
	http.HandleFunc("/", sayhelloName)
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
```

演示

{% asset_img "demo.png" "" %}

参考



* <https://astaxie.gitbooks.io/build-web-application-with-golang/en/03.2.html>
* [emacs 配置 go 开发环境](../../../../2017/04/30/emacs-配置-go-开发环境/)
