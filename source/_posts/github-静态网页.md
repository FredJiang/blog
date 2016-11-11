---
title: github 静态网页
date: 2016-11-01 10:32:15
tags: [github, git, jsdoc]
---

### 需求

* 在 github 上创建项目
* 用 jsdoc 生成项目文档
* 在 github 上直接看文档

[最终效果](http://FredJiang.github.io/socketservertool/docs/index.html)

<!--more-->


### 步骤

```
git checkout --orphan gh-pages
git push -u origin gh-pages
```

从浏览器打开 <http://FredJiang.github.io/socketservertool/docs/index.html>

`socketservertool` 是我的项目的名字

参考

* <http://stackoverflow.com/questions/8446218/how-to-see-an-html-page-on-github-as-a-normal-rendered-html-page-to-see-preview>
* <https://help.github.com/articles/creating-project-pages-using-the-command-line/>