---
title: go test
date: 2018-06-21 14:35:27
tags: [go, test]
---

<https://smartystreets.com/blog/tags/testing-in-go-series>


```
# 测试当前目录下的 package
go test -v

# 测试相对目录下的 package
go test -v ./xxx/packageName1

# 测试 import 路径下(import "xxx/packageName2")的 package
go test -v xxx/packageName2

# 测试多个 package
go test -v ./xxx/packageName1 ./xxx/packageName2

# 测试当前目录下的所有 package
go test -v ./...
```

<!--more-->

测试覆盖率

```
go test -v -cover -coverprofile=gotestcoverage.out

go tool cover -html=gotestcoverage.out -o gotestcoverage.html

open gotestcoverage.html
```


另外在 vscode 里面可以添加如下配置，以便显示 `t.Log("log message")`

```
    "go.testFlags": ["-v", "-count=1"],
```

