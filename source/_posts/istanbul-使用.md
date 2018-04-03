---
title: istanbul 使用
date: 2018-01-03 19:02:44
tags: [istanbul, node, test, javascript, mocha, nyc]
---

<https://github.com/gotwarlost/istanbul>

<!--more-->

```
npm install -g istanbul
npm install -g mocha
istanbul cover _mocha test/testFile.js
```


* <https://istanbul.js.org/>
* <https://istanbul.js.org/docs/tutorials/mocha/>

```
npm install -g nyc
npm install -g mocha
nyc --reporter=html --reporter=text mocha test/testFile.js
```


