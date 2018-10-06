---
title: svg 转 png（二）
date: 2018-09-21 16:07:42
tags: [librsvg, svg, png, linux, javascript, phantom, phantomjs]
---

用的 phantomjs 报错

```
Error: write EPIPE
    at exports._errnoException (util.js:1007:11)
    at WriteWrap.afterWrite (net.js:793:14)
```

<!--more-->

在 phantomjs 中添加日志，得到如下信息

> /projectPath/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs: error while loading shared libraries: libfontconfig.so.1: cannot open shared object file: No such file or directory

安装库

```bash
sudo yum install -y fontconfig fontconfig-devel freetype freetype-devel libstdc++
```

直接用命令测试

```
./node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs ./node_modules/svg2png/lib/converter.js '{"maxBuffer":"Infinity"}'
```

输入如下 svg 内容

```html
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="119" height="58">
  <rect x="0" y="0" width="119" height="58" style="stroke: none; fill: none;"></rect>
  <line x1="48" y1="22" x2="49" y2="22" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="105" y1="19" x2="106" y2="19" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="38" y1="47" x2="39" y2="47" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="102" y1="3" x2="103" y2="3" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="38" y1="2" x2="39" y2="2" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="108" y1="30" x2="109" y2="30" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="67" y1="8" x2="68" y2="8" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="16" y1="28" x2="17" y2="28" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="77" y1="35" x2="78" y2="35" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="68" y1="7" x2="69" y2="7" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="68" y1="3" x2="69" y2="3" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="35" y1="2" x2="36" y2="2" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="21" y1="20" x2="22" y2="20" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="60" y1="45" x2="61" y2="45" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="13" y1="32" x2="14" y2="32" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="108" y1="21" x2="109" y2="21" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="90" y1="13" x2="91" y2="13" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="78" y1="22" x2="79" y2="22" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="64" y1="56" x2="65" y2="56" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="79" y1="36" x2="80" y2="36" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="69" y1="6" x2="70" y2="6" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="45" y1="7" x2="46" y2="7" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="26" y1="19" x2="27" y2="19" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="61" y1="19" x2="62" y2="19" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="32" y1="23" x2="33" y2="23" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="109" y1="25" x2="110" y2="25" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="46" y1="27" x2="47" y2="27" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="32" y1="31" x2="33" y2="31" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="89" y1="22" x2="90" y2="22" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="94" y1="56" x2="95" y2="56" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="39" y1="11" x2="40" y2="11" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="24" y1="16" x2="25" y2="16" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="21" y1="52" x2="22" y2="52" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="86" y1="40" x2="87" y2="40" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="31" y1="27" x2="32" y2="27" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="56" y1="3" x2="57" y2="3" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="19" y1="31" x2="20" y2="31" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="61" y1="53" x2="62" y2="53" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="100" y1="1" x2="101" y2="1" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="84" y1="46" x2="85" y2="46" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="93" y1="21" x2="94" y2="21" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="60" y1="21" x2="61" y2="21" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="77" y1="10" x2="78" y2="10" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="38" y1="49" x2="39" y2="49" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="23" y1="57" x2="24" y2="57" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="91" y1="28" x2="92" y2="28" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="87" y1="52" x2="88" y2="52" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="85" y1="35" x2="86" y2="35" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="103" y1="27" x2="104" y2="27" style="stroke:rgb(0,0,0);stroke-width:2" />
  <line x1="105" y1="57" x2="106" y2="57" style="stroke:rgb(0,0,0);stroke-width:2" />
  <text style="fill:#B7A27F;" x="5" y="30" font-size="33" transform="translate(5, 33) rotate(-18) translate(-5, -33)">k</text>
  <text style="fill:#387026;" x="25" y="30" font-size="39" transform="translate(25, 25) rotate(18) translate(-25, -25)">k</text>
  <text style="fill:#D9DFB9;" x="45" y="30" font-size="24" transform="translate(45, 31) rotate(-23) translate(-45, -31)">5</text>
  <text style="fill:#82FE18;" x="65" y="30" font-size="29" transform="translate(65, 30) rotate(23) translate(-65, -30)">d</text>
</svg>

```

结束输入

ctrl + d

得到如下 base64 内容

```
data:image/png;base64,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
```

在 <https://codebeautify.org/base64-to-image-converter> 中查看以上 base64 的内容

如果字体不显示，需要安装对应字体

```bash
yum grouplist

# Installed Language Groups:
# Available Language Groups:

sudo yum groupinstall -y 'Arabic Support' && \
sudp yum groupinstall -y 'English (UK) Support'
```

其他使用方法

vim ~/phantomtest.js

```javascript
var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1080 };
page.open("http://www.google.com", function start(status) {
  page.render('googleHome.png', {format: 'png', quality: '50'});
  phantom.exit();
});
```

```bash
./node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs --ssl-protocol=any --ignore-ssl-errors=true ~/phantomtest.js
```
