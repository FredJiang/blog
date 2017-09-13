---
title: go web 服务器的 hello world
date: 2017-05-07 17:25:10
tags: [golang, web]
---

代码结构

{% asset_img "code.png" "" %}


`helloweb.go`

<!--more-->

```
package main

import (
	"fmt"
	"log"
	"net/http"
	"runtime"
	"strconv"
	"strings"
)

func fileLine() string {
	_, file, line, _ := runtime.Caller(1)
	fileLine := file + " " + strconv.Itoa(line)
	fileLineSlice := strings.Split(fileLine, "/helloweb/")
	return fileLineSlice[len(fileLineSlice)-1]
}

func uploadProcesses(w http.ResponseWriter, r *http.Request) {
	fmt.Println(fileLine(), "path", r.URL.Path)

	r.ParseForm()
	fmt.Println(fileLine(), r.Form)

	for k, v := range r.Form {
		fmt.Println(fileLine(), "key:", k)
		fmt.Println(fileLine(), "val:", strings.Join(v, ""))
	}

	fmt.Fprintf(w, "{ \"code\": 0 }")
}

func main() {
	http.HandleFunc("/", uploadProcesses)
	err := http.ListenAndServe(":3002", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
```

演示

{% asset_img "demo.png" "" %}

参考

* [emacs 配置 go 开发环境](../../../../2017/04/30/emacs-配置-go-开发环境/)
