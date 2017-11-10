---
title: pandoc 使用
date: 2017-11-07 17:20:22
tags: [pandoc, markdown, gitbook]
---

markdown 的 table 不支持换行

pandoc 的 table 支持换行

<https://pandoc.org/MANUAL.html#tables>

`brew install pandoc`

`wget "https://pandoc.org/demo/pandoc.css"`

`pandoc -s --toc -c pandoc.css  返回码说明.md -o 返回码说明.html`

<!--more-->

<https://gitbookio.gitbooks.io/documentation/>

在 gitbook 中使用 pandoc（还未搞定）

<https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md>

```
npm install -g gitbook-cli

gitbook -V

mkdir gitbookdemo

cd gitbookdemo

gitbook init

gitbook install # 安装 book.json 中的插件

gitbook serve
```

https://calibre-ebook.com/download_osx

```
sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin

gitbook pdf

gitbook epub

gitbook mobi
```


{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}


book.json

```
{
  "title": "接口文档",
  "description": "接口文档",
  "author": "蒋朋",
  "language": "zh-hans",
  "plugins": ["pandoc", "build"]
}
```


另外 MacDown.app 可以使用如下代码分割页面，并且导出的 html 也是分割的

```
<section style="position:fixed;overflow-y:auto;top:0px;bottom:0px;width:20%;left:5%;">
</section>
<section style="position:absolute;left:25%">
</section>
```



