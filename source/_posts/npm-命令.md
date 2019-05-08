---
title: npm 命令
date: 2018-08-30 18:07:16
tags: [node, npm, nvm]
---


```sh
npm list        --depth=0
npm list     -g --depth=0

npm outdated    --depth=0
npm outdated -g --depth=0

npm update      --skip-unused
npm update   -g --skip-unused

npm-check       --skip-unused
npm-check    -g --skip-unused

npm-check       --skip-unused --update
npm-check    -g --skip-unused --update     # Interactive update

npm-check       --skip-unused --update-all --save-exact
npm-check    -g --skip-unused --update-all # Uninteractive update.
```