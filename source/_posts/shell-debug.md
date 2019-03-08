---
title: shell debug
date: 2019-01-24 10:04:52
tags: [shell, debug]
---

* <https://www.tecmint.com/enable-shell-debug-mode-linux/>

<!--more-->

```sh
PS4='>$LINENO: ' bash -x ./script.sh

PS4='>$LINENO: ' sh   -x ./script.sh
```

```sh
# https://sourceforge.net/projects/bashdb/files/bashdb

cd /opt/ && \
wget "https://jaist.dl.sourceforge.net/project/bashdb/bashdb/4.4-1.0.1/bashdb-4.4-1.0.1.tar.gz" && \
tar zxvf bashdb-4.4-1.0.1.tar.gz && \
cd bashdb-4.4-1.0.1 && \
./configure --prefix=/usr/local && \
make check && \
make && \
sudo make install

brew install bashdb

bashdb script.sh
# Type "help" followed by command name for full documentation.
h continue
```

| 命令 |   命令缩写   |                             命令说明                            |
|------|--------------|-----------------------------------------------------------------|
|      | l            | List source code.                                               |
|      | s            | Single step an statement. This is sometimes called 'step into'. |
|      | print $VAR   |                                                                 |
|      | b <line num> | Set a breakpoint at *loc-spec*.                                 |
|      | c            | Continue script execution.                                      |
|      | i b          | info breakpoints (h i b)                                        |
|      | d <line num> | clear all breakpoints at a line LINE.                           |
| exit |              |                                                                 |

