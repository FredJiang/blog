---
title: atom 编辑 uml
date: 2016-12-21 17:57:22
tags: [atom, editor, uml, plantuml]
---

之前一直用 emacs 来编辑 uml（[emacs 配置 PlantUML](../../../../2016/08/04/emacs-配置-PlantUML/)），由于 uml 的复杂度增加，就换了 atom。

<!--more-->

安装过程

```
brew install graphviz
```

在 atom 已经安装的前提下

```
apm install language-plantuml
apm install plantuml-viewer
```

如果 `apm install plantuml-viewer` 太慢

新建或编辑 `~/.atom/.apmrc` 文件，加入以下两行：

```
registry=https://registry.npm.taobao.org/
strict-ssl=false
```

还不行的话

编辑 `~/.npmrc` 文件，写入以下内容：

```
registry=https://registry.npm.taobao.org
cache=~/.npm/cache/
disturl=https://npm.taobao.org/dist
```


