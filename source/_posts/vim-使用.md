---
title: vim 使用
date: 2017-08-20 12:56:50
tags: [vim, bash]
---

之前一直使用 emacs 做开发，emacs 是挺好用的，但由于不是 linux 自带的，不想在生产环境下安装，所以只能在开发环境下使用，如果要在生产环境下使用的话，我还是倾向于使用 vim

那就试试怎么用 vim 吧

<!--more-->

首先安装 [Vundle](https://github.com/VundleVim/Vundle.vim)

```
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```


修改配置文件 `~/.vimrc`

```
set nocompatible              " be iMproved, required
filetype off                  " required
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
call vundle#end()            " required
filetype plugin indent on    " required


" added by fred
Plugin 'scrooloose/nerdtree'
map <C-n> :NERDTreeToggle<CR>

Plugin 'Xuyuanp/nerdtree-git-plugin'


" default
execute pathogen#infect()
syntax on
filetype plugin indent on
```

打开 vim

`vim`

安装插件

`:BundleInstall!`

其他命令

|        命令        |                 作用                 |
|--------------------|--------------------------------------|
| :BundleList        | 列举出列表中(.vimrc中)配置的所有插件 |
| :BundleInstall     | 安装列表中全部插件                   |
| :BundleInstall!    | 更新列表中全部插件                   |
| :BundleSearch foo  | 查找foo插件                          |
| :BundleSearch! foo | 刷新foo插件缓存                      |
| :BundleClean       | 清除列表中没有的插件                 |
| :BundleClean!      | 清除列表中没有的插件                 |



通过 git 来管理配置文件

<https://github.com/FredJiang/.vim>


vim 多窗口操作

|        命令       |                     作用                    |
|-------------------|---------------------------------------------|
| vim -O a.js b.js  | 垂直分屏                                    |
| vim -o a.js b.js  | 水平分屏                                    |
| vim -On a.js b.js | 垂直分屏(n是数字，表示分成几个屏)           |
| vim -on a.js b.js | 水平分屏(n是数字，表示分成几个屏)           |
|===================|=============================================|
| :sp[lit] {file}   | 水平分屏                                    |
| :nsp              | 打开一个高度为 n 行的新窗口                 |
| :new {file}       | 水平分屏                                    |
| :sv[iew] {file}   | 水平分屏，以只读方式打开                    |
| :vs[plit] {file}  | 垂直分屏                                    |
| :clo[se]          | 关闭当前窗口                                |
| :only             | 关闭除当前窗口之外的所有窗口                |
|===================|=============================================|
| Ctrl+w s          | 水平分割当前窗口                            |
| Ctrl+w v          | 垂直分割当前窗口                            |
| Ctrl+w n          | 打开一个新窗口（空文件）                    |
| Ctrl+w T          | 当前窗口移动到新标签页                      |
|===================|=============================================|
| Ctrl+W c          | 关闭当前窗口                                |
| Ctrl+W q          | 关闭当前窗口，如果只剩最后一个了，则退出Vim |
| Ctrl+w o          | 关闭除当前窗口之外的所有窗口                |
|===================|=============================================|
| Ctrl+w h          | 切换到左边窗口                              |
| Ctrl+w j          | 切换到下边窗口                              |
| Ctrl+w k          | 切换到上边窗口                              |
| Ctrl+w l          | 切换到右边窗口                              |
| Ctrl+w b          | 切换到底部窗口                              |
| Ctrl+w t          | 切换到顶部窗口                              |
| Ctrl+w w          | 遍历切换窗口                                |
|===================|=============================================|
| Ctrl+w H          | 向左移动当前窗口                            |
| Ctrl+w J          | 向下移动当前窗口                            |
| Ctrl+w K          | 向上移动当前窗口                            |
| Ctrl+w L          | 向右移动当前窗口                            |
|===================|=============================================|
| Ctrl+w +          | 增加窗口高度                                |
| {n} Ctrl+w +      | 增加窗口 n 高度                             |
| Ctrl+w -          | 减小窗口高度                                |
| Ctrl+w =          | 统一窗口高度                                |
| {n} Ctrl+w _      | 将窗口高度指定为 n 高度                     |
| {,} Ctrl+w _      | 让窗口达到它可能的最大高度                  |



vim 多 tab 操作

|        命令       |                                 作用                                |
|-------------------|---------------------------------------------------------------------|
| vim -p a.js b.js  |                                                                     |
| :tabe[dit] {file} | edit specified file in a new tab                                    |
| :tabf[ind] {file} | open a new tab with filename given, searching the 'path' to find it |
| :tabc[lose]       | close current tab                                                   |
| :tabc[lose] {i}   | close i-th tab                                                      |
| :tabo[nly]        | close all other tabs (show only the current tab)                    |
|===================|=====================================================================|
| :tabs             | list all tabs including their displayed window                      |
| :tabm 0           | move current tab to first                                           |
| :tabm             | move current tab to last                                            |
| :tabm {i}         | move current tab to position i+1                                    |
|===================|=====================================================================|
| :tabn             | go to next tab                                                      |
| :tabp             | go to previous tab                                                  |
| :tabfirst         | go to first tab                                                     |
| :tablast          | go to last tab                                                      |
|===================|=====================================================================|
| gt                | go to next tab                                                      |
| gT                | go to previous tab                                                  |
| {i}gt             | go to tab in position i                                             |


vim 多 buffer 操作

|           命令          |                 作用                |
|-------------------------|-------------------------------------|
| vim a.js b.js           |                                     |
| :ls, :buffers           | 列出所有缓冲区                      |
| :bn[ext]                | 下一个缓冲区                        |
| :bp[revious]            | 上一个缓冲区                        |
| :b {number, expression} | 跳转到指定缓冲区                    |
| :b <Tab>                | 显示所有Buffer中的文件              |
| :b car<Tab>             | 显示 car.c car.h                    |
| :b *car<Tab>            | 显示 car.c jetcar.c car.h jetcar.h  |
| :b .h<Tab>              | 显示 vehicle.h car.h jet.h jetcar.h |
| :b .c<Tab>              | 显示 vehicle.c car.c jet.c jetcar.c |
| :b ar.c<Tab>            | 显示 car.c jetcar.c                 |
| :b j*c<Tab>             | 显示 jet.c jetcar.c jetcar.h        |
| :sb 3                   | 分屏并打开编号为3的Buffer           |
| :vertical sb 3          | 同上，垂直分屏                      |

参考

* <http://harttle.com/2015/11/14/vim-window.html>
* <http://harttle.com/2015/11/12/vim-tabpage.html>
* <http://harttle.com/2015/11/17/vim-buffer.html>
