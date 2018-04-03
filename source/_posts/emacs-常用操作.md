---
title: emacs 常用操作
date: 2017-08-30 17:14:27
tags: [emacs]
---

* [Search / Highlight Words](http://ergoemacs.org/emacs/emacs_search_current_word.html)
* [File Manager, dired](http://ergoemacs.org/emacs/file_management.html)
* [Find and Replace Commands](http://ergoemacs.org/emacs/emacs_find_replace.html)
* [Find Replace Text in Directory](http://ergoemacs.org/emacs/find_replace_inter.html)
* [Dired Search And Replace](https://www.emacswiki.org/emacs/DiredSearchAndReplace)

<!--more-->

### 替换多个文件的内容

|                命令               | 快捷键 |    输入   |         说明         |
|-----------------------------------|--------|-----------|----------------------|
| M-x find-name-dired               |        | *go       | find go file         |
|                                   | t      |           | mark/unmark all file |
|                                   | %m     | go 或 go$ | mark go file         |
| M-x dired-do-query-replace-regexp | Q      |           |                      |
|                                   | y      |           | replace              |
|                                   | n      |           | skip                 |
|                                   | !      |           | replace all          |

