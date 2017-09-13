---
title: powerline 使用
date: 2017-08-24 22:07:36
tags: [powerline]
---

在 mac 下

```
sudo pip install powerline-status
```

<!--more-->

`pip show powerline-status`

输出

```
Name: powerline-status
Version: 2.6
Summary: The ultimate statusline/prompt utility.
Home-page: https://github.com/powerline/powerline
Author: Kim Silkebaekken
Author-email: kim.silkebaekken+vim@gmail.com
License: MIT

Requires:
```

注意

> Location: /usr/local/lib/python2.7/site-packages

`vim .zshrc`

添加

`. /usr/local/lib/python2.7/site-packages/powerline/bindings/zsh/powerline.zsh`

或

`. $(pip show powerline-status | awk '/Location:/{print $2 "/powerline/bindings/zsh/powerline.zsh"}')`

或

```
powerline_zsh=$(pip show powerline-status | awk '/Location:/{print $2 "/powerline/bindings/zsh/powerline.zsh"}')
if [ -e $powerline_zsh ]
then
    . $(powerline_zsh)
fi
```

安装字体

<https://github.com/powerline/fonts>

```
git clone https://github.com/powerline/fonts.git --depth=1 && \
cd fonts && \
./install.sh && \
cd .. && \
rm -rf fonts
```

在 iTerm2 中选择字体相应的字体





