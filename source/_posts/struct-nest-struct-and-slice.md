---
title: struct nest struct and slice
date: 2017-10-05 23:06:32
tags: [golang]
---

demo 代码如下

<!--more-->

```
package main

import (
    "fmt"
    "runtime"
    "strconv"
    "strings"
    "time"
)

func fileLine() string {
    _, file, line, _ := runtime.Caller(1)
    fileLine := file + " " + strconv.Itoa(line)
    fileLineSlice := strings.Split(fileLine, "/sdktest/")
    return time.Now().Format(time.RFC3339) + " " + fileLineSlice[len(fileLineSlice)-1]
}

type ProductIdConfigs struct {
    GameId    string `json:"gameId"`
    ProductId string `json:"productId"`
}

type SdkConfig struct {
    GameId   string `json:"gameId"`
    IOSParam struct {
        ConversionId string `json:"conversionId"`
    } `json:"ios_param"`
    ProductIdConfigs []ProductIdConfigs `json:"productIdConfigs"`
}

func main() {

    var sdkConfig SdkConfig
    sdkConfig.GameId = "gameIdV"
    sdkConfig.IOSParam.ConversionId = "conversionIdV"

    sdkConfig.ProductIdConfigs = make([]ProductIdConfigs, 0)

    sdkConfig.ProductIdConfigs = append(sdkConfig.ProductIdConfigs,
        ProductIdConfigs{
            GameId:    "gameIdV1",
            ProductId: "productIdV1"})

    sdkConfig.ProductIdConfigs = append(sdkConfig.ProductIdConfigs,
        ProductIdConfigs{
            GameId:    "gameIdV2",
            ProductId: "productIdV2"})
    fmt.Println(fileLine(), sdkConfig)
}
```