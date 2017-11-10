---
title: go 处理 json 数据
date: 2017-10-03 16:44:53
tags: [json, http, golang, node.js]
---

go 客户端

{% asset_img "go.png" "" %}

<!--more-->

node.js server 端

{% asset_img "node.png" "" %}

go 客户端 代码

```
package Invite

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "reflect"
    "runtime"
    "strconv"
    "strings"
    "testing"
    "time"
)

func fileLine() string {
    _, file, line, _ := runtime.Caller(1)
    fileLine := file + " " + strconv.Itoa(line)
    fileLineSlice := strings.Split(fileLine, "/activity/")
    return time.Now().Format(time.RFC3339) + " " + fileLineSlice[len(fileLineSlice)-1]
}

func TestInvite(t *testing.T) {
    reqMap := map[string]interface{}{"username": "fred", "age": 28}

    reqJSONBytes, _ := json.Marshal(reqMap)

    res, _ := http.Post("http://127.0.0.1:3000", "application/json", bytes.NewBuffer(reqJSONBytes))

    resBodyBytes, _ := ioutil.ReadAll(res.Body)
    resMap := map[string]interface{}{}
    _ = json.Unmarshal(resBodyBytes, &resMap)

    fmt.Println(fileLine(), resMap)
    fmt.Println(fileLine(), resMap["code"])
    fmt.Println(fileLine(), resMap["message"])

    fmt.Println(fileLine(), reflect.TypeOf(resMap))
    fmt.Println(fileLine(), reflect.TypeOf(resMap["code"]))
    fmt.Println(fileLine(), reflect.TypeOf(resMap["message"]))

    if resMap["code"] != 0.0 {
        t.Error("Expected 0, got ", resMap["code"])
    }
}
```




node.js server 端 代码


`cat routes/index.js`


```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function (req, res, next) {
  console.log(req.body);
  console.log(req.body.age);

  res.send({ code: 0, message: 'success' });
});

module.exports = router;
```
