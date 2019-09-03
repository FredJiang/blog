---
title: 从代码中生成 uml 文档
date: 2017-07-27 20:45:16
tags: [uml, plantuml, tool]
---

在代码里添加注释，然后生成 uml 图

<!--more-->

最后的结果如下

{% asset_img "app.png" "" %}

测试文件的内容如下

app.js

```javascript
require('./test1.js');
require('./test2.js');

let number = Math.ceil(Math.random() * 100);

console.log(number);

if (number % 3 === 0) {
  // autoumldoc app 1 if (0) then(true)
  // autoumldoc app 2 :print 0;
  console.log('% 3 >>> 0');
} else if (number % 3 === 1) {
  // autoumldoc app 3 elseif (1) then (true)
  // autoumldoc app 4 :print 1;
  console.log('% 3 >>> 1');
} else {
  // autoumldoc app 5 elseif (2) then (true)
  // autoumldoc app 6 :print 2;
  console.log('% 3 >>> 2');
}
// autoumldoc app 7 endif    

```

test1.js

```javascript
exports.printAge = () => {
  // autoumldoc app 100 :print age;
  console.log('age is 20+');
};

```

test2.js

```javascript
exports.printName = () => {
  // autoumldoc app 200 :print name;
  console.log('name is fred');
};

```

生成 uml 代码的脚本 [autouml](https://github.com/FredJiang/.myshell/blob/master/autouml)

在 autouml 目录下运行 

```sh
autoumldoc . app
```

把生成的内容放到 vscode 中，整理成本文开头处图片中的形式即可

[vscode 编辑 uml](../../../../2017/07/26/vscode-编辑-uml/)
