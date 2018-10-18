---
title: node 内存优化
date: 2018-10-08 19:51:22
tags: [node.js, optimize, heapdump]
---

### [node-heapdump](https://github.com/bnoordhuis/node-heapdump)

<!--more-->

```bash
npm install heapdump
```

#### 通过 signal 触发

在代码中引入

```javascript
require('heapdump');
```

触发

```bash
PID=25475

kill -USR2 $PID

(cat /proc/$PID/environ; echo) | tr '\000' '\n'

我这程序是 pm2 起的，生成的日志在环境变量 pm2_env 下的 PWD 目录里面
```

#### 主动触发

```javascript
const heapdump = require('heapdump');

heapdump.writeSnapshot('/home/nodeuser/heapsnapshot/' + Date.now() + '.heapsnapshot', (err, filename) => {
  if (err) {
    console.log(err);
  }
  console.log('dump written to', filename);
});
```

加载到 chrome 中查看





v8 prof

node-inspector