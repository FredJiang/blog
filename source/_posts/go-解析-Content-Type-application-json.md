---
title: go 解析 Content-Type application/json
date: 2017-05-25 22:33:58
tags:
---


代码结构

{% asset_img "code.png" "" %}


`server.go`

<!--more-->

```
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"runtime"
	"strconv"
	"strings"
)

func fileLine() string {
	_, file, line, _ := runtime.Caller(1)
	fileLine := file + " " + strconv.Itoa(line)
	fileLineSlice := strings.Split(fileLine, "/dataCollector/")
	return fileLineSlice[len(fileLineSlice)-1]
}

func uploadProcesses(w http.ResponseWriter, r *http.Request) {
	fmt.Println(fileLine(), "path", r.URL.Path)

	var contentType = r.Header.Get("Content-Type")
	fmt.Println(fileLine(), "Content-Type", contentType)

	r.ParseForm()
	fmt.Println(fileLine(), r.Form)

	for k, v := range r.Form {
		fmt.Println(fileLine(), "key:", k)
		fmt.Println(fileLine(), "val:", strings.Join(v, ""))
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(fileLine(), string(body))

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