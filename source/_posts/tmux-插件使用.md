---
title: tmux 插件使用
date: 2017-08-23 08:23:13
tags: [tmux, plugin, tpm, tmux-resurrect]
---

安装插件管理器 <https://github.com/tmux-plugins/tpm>（注意 tmux 版本）

```
cd 
git clone https://github.com/FredJiang/.tmux.git
cd .tmux
./setup
```

<!--more-->

Installing plugins

* Add new plugin to `~/.tmux.conf` with `set -g @plugin '...'`
* Press `prefix` + `I` (capital I, as in Install) to fetch the plugin.

tmux-resurrect 使用

https://github.com/tmux-plugins/tmux-resurrect

* prefix + Ctrl-s - save
* prefix + Ctrl-r - restore