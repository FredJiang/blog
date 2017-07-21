---
title: zsh 安装
date: 2017-07-11 14:24:46
tags: [zsh, shell, iterm2]
---


<https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH>

```
sudo apt-get install -y zsh
# 或
sudo yum install -y zsh
# 或
brew install zsh zsh-completions
```

`chsh -s $(which zsh)`

<!--more-->


<https://github.com/robbyrussell/oh-my-zsh>

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`


另外在 `~/.zshrc` 文件中加上之前的相应配置

```
source ~/.bash_profile
source ~/.bashrc
source ~/.profile
```


再

`source ~/.zshrc`

不过可能会遇到如下问题

> /etc/bashrc:35: command not found: shopt
>
> /etc/bashrc:46: command not found: shopt



原因如下

> shopt is not a command, but a shell built-in. bash knows what to do with it because it's a bash built-in , but zsh has no idea what it is. You'll want to look into setopt which is a zsh Built-in, and put those values into a new .zshrc script.


由于我在之前的 `~/.bash_profile` 和 `~/.bashrc` 中有一些配置了，又不想移到 `~/.zshrc` 里面，所以就在 `~/.zshrc` 里面直接 source 一下，这个报错，我这也能接受，so 。。。就这样吧