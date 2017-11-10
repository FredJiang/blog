---
title: tmuxinator 查看远端日志
date: 2017-09-22 11:15:35
tags: [tmuxinator, tmux]
---

tmuxinator 的配置文件

```
windows:
  - editor:
      layout: tiled
      panes:
        - ssh fred@dev1 -t -A 'pm2 logs xx1'
        - ssh fred@dev2 -t -A 'pm2 logs xx2'
        - ssh fred@dev2 -t -A 'pm2 logs xx3'
```

<!--more-->

我用的 zsh 和 nvm，报的 `pm2` 和 `node` 命令找不到

处理方式如下

```
ls -l /usr/local/bin/ | grep -e "node" -e "pm2"
sudo ln -s "$(which node)" /usr/local/bin/node
sudo ln -s "$(which pm2)" /usr/local/bin/pm2
ls -l /usr/local/bin/ | grep -e "node" -e "pm2"
```

输出

```
lrwxrwxrwx.   1 root root       49 Sep 22 10:50 node -> /home/nodeuser/.nvm/versions/node/v6.6.0/bin/node
lrwxrwxrwx.   1 root root       48 Sep 22 10:51 pm2 -> /home/nodeuser/.nvm/versions/node/v6.6.0/bin/pm2
```