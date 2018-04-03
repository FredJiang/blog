---
title: pm2 说明
date: 2017-09-14 12:02:12
tags: [node.js, pm2]
---


```
which pm2
# ~/.nvm/versions/node/v8.5.0/bin/pm2

pwd
# /home/fred/.nvm/versions/node/v8.5.0

ls -lh ./bin
lrwxrwxrwx 1 fred fred  31 Sep 13 23:26 pm2 -> ../lib/node_modules/pm2/bin/pm2
lrwxrwxrwx 1 fred fred  35 Sep 13 23:26 pm2-dev -> ../lib/node_modules/pm2/bin/pm2-dev
lrwxrwxrwx 1 fred fred  38 Sep 13 23:26 pm2-docker -> ../lib/node_modules/pm2/bin/pm2-docker
lrwxrwxrwx 1 fred fred  39 Sep 13 23:26 pm2-runtime -> ../lib/node_modules/pm2/bin/pm2-runtime

pwd
# /home/fred/.nvm/versions/node/v8.5.0/lib/node_modules/pm2
```

可以看到 pm2 是个 node 程序

那来 看看  pm2 start app.js 到底做了什么

