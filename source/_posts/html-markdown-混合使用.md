---
title: html markdown 混合使用
date: 2017-06-21 09:44:04
tags: [html, markdown]
---

demo 可以参考这

<https://github.com/FredJiang/html_markdown_mixer>

<!--more-->

启动一个静态资源服务端

`python -m SimpleHTTPServer 8000`


将图片转成 base64 的文本

`echo "data:image/jpeg;base64,$(base64 服务器部署gm.png)"`

在 html 或 md 中使用 base64 图片

```
<img alt="" src="data:image/jpeg;base64,iVBO...">
```