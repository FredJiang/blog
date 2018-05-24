---
title: chrome 调试 node
date: 2018-05-21 19:32:16
tags: [node, chrome, debug, javascript]
---

debug.js

```
console.log(1);
console.log(2);
console.log(3);
console.log(4);
```

<!--more-->

```
node --version
v8.9.4
node --inspect-brk debug.js
```

输出

```
node --inspect-brk debug.js
Debugger listening on ws://127.0.0.1:9229/ca05fd5c-196b-4728-8b8e-d26b525078fd
For help see https://nodejs.org/en/docs/inspector
```

根据文档 <https://nodejs.org/en/docs/guides/debugging-getting-started/>

找到 Chrome DevTools

在 chrome 中输入 `chrome://inspect`

{% asset_img "start.png" "" %}

{% asset_img "debug.png" "" %}






