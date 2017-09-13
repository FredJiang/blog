---
title: 从代码中生成 uml 文档
date: 2017-07-27 20:45:16
tags: [uml, plantuml]
---

这两天在看同事遗留下来的代码，由于代码的逻辑比较复杂，我这通过在代码里添加注释，然后生成 uml 图，便于再后来的同事了解其逻辑

<!--more-->

最后的结果如下

{% asset_img "test.png" "" %}

{% asset_img "app.png" "" %}


测试文件的内容如下

```
➜  autouml ls
app.js  test1.js  test2.js
➜  autouml cat app.js
const test1 = require('./test1.js');
const test2 = require('./test2.js');

let number = Math.ceil(Math.random() * 100);

console.log(number);

if (number % 3 == 0) {
  // autodoc app 000300 if (0) then(true)
  // autodoc app 000400 :print 0;
  console.log('% 3 >>> 0');
} else if (number % 3 == 1) {
  // autodoc app 000500 elseif (1) then (true)
  // autodoc app 000600 :print 1;
  console.log('% 3 >>> 1');
} else {
  // autodoc app 000700 elseif (2) then (true)
  // autodoc app 000800 :print 2;
  console.log('% 3 >>> 2');
}
// autodoc app 001000 endif
➜  autouml cat test1.js
exports.printAge = () => {
  // autodoc test 000100 :print age;
  console.log('age is 20+');
}
➜  autouml cat test2.js
exports.printName = () => {
  // autodoc test 000200 :print name;
  console.log('name is fred');
}
```



生成 uml 代码的脚本 [autouml.sh](https://github.com/FredJiang/myshell/blob/master/autouml.sh)

在 autouml 目录下运行 `autouml.sh`


生成如下内容

```
outputFileMergeDevide /tmp/autodocDevide_20170728183322

app

@startuml
start
// autodoc app 000300 if (0) then(true) '>>>>>>filepath:./app.js 9'
// autodoc app 000400 :print 0; '>>>>>>filepath:./app.js 10'
// autodoc app 000500 elseif (1) then (true) '>>>>>>filepath:./app.js 13'
// autodoc app 000600 :print 1; '>>>>>>filepath:./app.js 14'
// autodoc app 000700 elseif (2) then (true) '>>>>>>filepath:./app.js 17'
// autodoc app 000800 :print 2; '>>>>>>filepath:./app.js 18'
// autodoc app 001000 endif '>>>>>>filepath:./app.js 21'
stop
@enduml



test

@startuml
start
// autodoc test 000100 :print age; '>>>>>>filepath:./test1.js 2'
// autodoc test 000200 :print name; '>>>>>>filepath:./test2.js 2'
stop
@enduml
```


运行 `autouml.sh nocom`

生成如下内容

```
outputFileMergeDevide /tmp/autodocDevide_20170728183334

app

@startuml
start
if (0) then(true)
:print 0;
elseif (1) then (true)
:print 1;
elseif (2) then (true)
:print 2;
endif
stop
@enduml



test

@startuml
start
:print age;
:print name;
stop
@enduml
```



把以上内容放到 vscode 中，整理成本文开头处图片中的形式即可


[vscode 编辑 uml](../../../../2017/07/26/vscode-编辑-uml/)
