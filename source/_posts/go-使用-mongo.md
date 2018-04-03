---
title: go 使用 mongo
date: 2017-10-03 22:13:20
tags: [golang, mongo]
---

* <http://labix.org/mgo>


安装 `bzr`

`sudo yum install -y bzr`

安装 `mgo`

`go get -u -v gopkg.in/mgo.v2`

<!--more-->

数据库的读写代码

```
package main

import (
    "fmt"
    "log"

    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

type Person struct {
    Name  string
    Phone string
}

func main() {
    session, err := mgo.Dial("127.0.0.1:27017")
    if err != nil {
        panic(err)
    }
    defer session.Close()

    // Optional. Switch the session to a monotonic behavior.
    session.SetMode(mgo.Monotonic, true)

    c := session.DB("test").C("people")
    err := c.Insert(&Person{"Ale", "+55 53 8116 9639"}, &Person{"Cla", "+55 53 8402 8510"})
    if err != nil {
        log.Fatal(err)
    }

    result := Person{}
    err := c.Find(bson.M{"name": "Ale"}).One(&result)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Phone:", result.Phone)
}
```


现有的项目用的 node 的 mongoose，表结构是 json 文件，可以用 <https://github.com/ChimeraCoder/gojson> 将 json 转成对应的 struct
