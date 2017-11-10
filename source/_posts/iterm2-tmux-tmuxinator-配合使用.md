---
title: iterm2 tmux tmuxinator 配合使用
date: 2017-09-20 23:31:35
tags: [iterm2, tmux, tmuxinator]
---

参考

* [tmux 使用](../../../../2017/08/22/tmux-使用/)
* [tmux 源码安装](../../../../2017/08/29/tmux-源码安装/)
* [tmux 插件使用](../../../../2017/08/23/tmux-插件使用/)

假设 iterm2, tmux, tmuxinator 都已经安装了

注意 tmux 和 tmuxinator 版本的搭配

<!--more-->

`mux new test`


注意缩进

```
windows:
  - w1: c1 -t -A 'pm2 logs'
  - w2: t1
```

或

```
windows:
  - w1: beta -t -A 'pm2 logs'
  - w2:
      layout: tiled
      panes:
        - c1
        - t1
```


`mux start test`

退出

`ctrl-b + d`


`tmux -CC attach -t test`



