---
title: nvm 切换版本
date: 2017-09-13 20:18:47
tags: [node, nvm]
---

```
node --version

npm list -g --depth=0

node --version && ls ~/.nvm/versions/node/`node --version`/lib/node_modules

nvm install v8.5.0
nvm install v8.5.0 --reinstall-packages-from=`node --version`

nvm alias default v8.5.0

ls ~/.nvm/versions/node/v6.2.2/lib/node_modules | xargs npm install -g
```