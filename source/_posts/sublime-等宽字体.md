---
title: sublime 等宽字体
date: 2017-05-24 21:32:54
tags: [sublime, fonts]
---

在 mac 上，用 sublime 写 markdown 的 table 表格的时候，`|` 总是对不齐，原因是字体的问题，解决办法就是使用等宽字体。


<!--more-->

首先下载字体

<https://fonts.google.com/?query=ubuntu+mono>

如果不能翻墙的话，可以用下面这个

<http://font.ubuntu.com>


然后解压缩字体文件，依次双击安装以下四个字体

* UbuntuMono-Bold.ttf
* UbuntuMono-BoldItalic.ttf
* UbuntuMono-Italic.ttf
* UbuntuMono-Regular.ttf


接着设置 sublime

`command + ,` 打开 sublime 的设置面板

添加以下配置

```
"font_face": "Ubuntu Mono"
"font_size": 16
```

其中字体大小可以不改，但是，如果改的话，要是偶数的


参考

* <https://support.apple.com/zh-cn/HT201749>
* <https://ruby-china.org/topics/32230>


