---
title: golang lock
date: 2017-11-23 14:55:41
tags: [golang]
---


cat lock.go

<!--more-->

```
package main

import (
    "sync"

    "github.com/labstack/gommon/log"
)

var wg sync.WaitGroup

var fetchedUrls = struct {
    urls map[string]bool
    m    sync.Mutex
}{urls: make(map[string]bool)}

func handleURL(index int) {
    defer wg.Done()
    // fetchedUrls.m.Lock()
    if _, ok := fetchedUrls.urls["baidu"]; ok {
    } else {
        log.Info("empty", index)
        fetchedUrls.urls["baidu"] = true
    }
    // fetchedUrls.m.Unlock()
}

func main() {
    for i := 1; i < 5; i++ {
        wg.Add(1)
        go handleURL(i)
    }
    wg.Wait()
}
```


go run lock.go


```
{"time":"2017-11-23T14:55:05.360329777+08:00","level":"INFO","prefix":"-","file":"lock.go","line":"21","message":"empty4"}
{"time":"2017-11-23T14:55:05.360505694+08:00","level":"INFO","prefix":"-","file":"lock.go","line":"21","message":"empty3"}
{"time":"2017-11-23T14:55:05.360546692+08:00","level":"INFO","prefix":"-","file":"lock.go","line":"21","message":"empty1"}
{"time":"2017-11-23T14:55:05.360570425+08:00","level":"INFO","prefix":"-","file":"lock.go","line":"21","message":"empty2"}
```




cat lock.go


```
package main

import (
    "sync"

    "github.com/labstack/gommon/log"
)

var wg sync.WaitGroup

var fetchedUrls = struct {
    urls map[string]bool
    m    sync.Mutex
}{urls: make(map[string]bool)}

func handleURL(index int) {
    defer wg.Done()
    fetchedUrls.m.Lock()
    if _, ok := fetchedUrls.urls["baidu"]; ok {
    } else {
        log.Info("empty", index)
        fetchedUrls.urls["baidu"] = true
    }
    fetchedUrls.m.Unlock()
}

func main() {
    for i := 1; i < 5; i++ {
        wg.Add(1)
        go handleURL(i)
    }
    wg.Wait()
}
```


go run lock.go

```
{"time":"2017-11-23T14:57:33.771973571+08:00","level":"INFO","prefix":"-","file":"lock.go","line":"21","message":"empty4"}
```

