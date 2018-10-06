---
title: screen 使用
date: 2018-07-12 10:52:38
tags: [screen, nohup]
---

<https://www.ibm.com/developerworks/cn/linux/l-cn-screen/index.html>

<!--more-->

命令前缀 ctrl + b

|         作用        |                                   命令                                  |                                    备注                                    |
|---------------------|-------------------------------------------------------------------------|----------------------------------------------------------------------------|
| 创建                | `screen -S logstash`                                                    |                                                                            |
| 显示所有            | `screen -list` 或 `screen -ls`                                          |                                                                            |
| 暂时断开            | `C-a d`（在 session 中运行）                                            |                                                                            |
| 重新进入            | `screen -r 29263.logstash` 或 `screen -r logstash` 或 `screen -r 29263` | 29263 为进程号，可以用 `kill -9 29263` 杀掉，然后该 session 变为 dead 状态 |
| 杀掉                | `C-a k`（在 session 中运行）                                            |                                                                            |
| Remove dead screens | `screen -wipe`                                                          |                                                                            |

分屏

* C-a 然后 shift-s 上下分屏
* 切换到下方 C-a tab
* C-a c 然后新建一个 window


|      Key       |                  Action                  |                     Notes                     |
|----------------|------------------------------------------|-----------------------------------------------|
| Ctrl+a c       | new window                               |                                               |
| Ctrl+a n       | next window                              |                                               |
| Ctrl+a p       | previous window                          |                                               |
| Ctrl+a "       | select window from list                  |                                               |
| Ctrl+a Ctrl+a  | previous window viewed                   |                                               |
| Ctrl+a S       | split terminal horizontally into regions | Ctrl+a c to create new window there           |
| Ctrl+a &#124;  | split terminal vertically into regions   | Requires debian/ubuntu patched screen 4.0     |
| Ctrl+a :resize | resize region                            |                                               |
| Ctrl+a :fit    | fit screen size to new terminal size     | Ctrl+a F is the same. Do after resizing xterm |
| Ctrl+a :remove | remove region                            | Ctrl+a X is the same                          |
| Ctrl+a tab     | Move to next region                      |                                               |


* 注意 screen 中 session、region 和 window 的区别
* 注意 tmux 中 window 和 session 的区别


另外分屏可以结合 tmux 使用

[tmux 使用](../../../../2017/08/22/tmux-使用/)


