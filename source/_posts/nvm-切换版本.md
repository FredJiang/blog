---
title: nvm 切换版本
date: 2017-09-13 20:18:47
tags: [node, npm, nvm]
---

```
node --version

node --version && \
ls ~/.nvm/versions/node/$(node --version)/lib/node_modules | sort

nvm install v10.4.0 --reinstall-packages-from=$(node --version)

nvm alias default v10.4.0 && \
rm /usr/local/bin/node && \
ln -s ${HOME}/.nvm/versions/node/v10.4.0/bin/node /usr/local/bin/node && \
nvm alias default v10.4.0

ls -lh $(which node)
ls -lh $(which npm)

ls ~/.nvm/versions/node/v6.2.2/lib/node_modules  | sort
ls ~/.nvm/versions/node/v10.4.0/lib/node_modules | sort

ls ~/.nvm/versions/node/v6.2.2/lib/node_modules | xargs npm install -g
```
