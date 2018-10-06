---
title: golang 包管理
date: 2017-11-29 10:15:06
tags: [golang, dep, manager, package]
---

<https://github.com/golang/dep>

<!--more-->

```
go get -u github.com/golang/dep/cmd/dep # 或 brew install dep && brew upgrade dep
cd projectDir
```

第一次使用

`dep init`

如果有 `Gopkg.lock` 和 `Gopkg.toml`
 
`dep ensure`

添加依赖

`dep ensure -add github.com/foo/bar`

查看已有依赖

`dep status`

更新指定版本的依赖

修改 Gopkg.toml 然后 `dep ensure`

更新依赖

```
dep ensure -update github.com/some/project github.com/other/project
dep ensure -update
```

查看依赖关系

```
sudo yum install -y graphviz

dep status -dot | dot -T png > dep.png
imgcat dep.png # imgcat 是我在 terminal 中看图片的工具

dep status -dot | dot -T png | imgcat
```


