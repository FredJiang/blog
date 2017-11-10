---
title: tmux 使用
date: 2017-08-22 12:32:27
tags: [tmux, iTerm2, tmuxinator]
---

如果使用 iTerm2，且 tmux 的版本足够新的话，可以使用如下命令打开 tmux

* `tmux -CC`
* `tmux -CC attach`

然后在 iTerm2 中使用如下命令来复制会话

|       操作      |        说明        |
|-----------------|--------------------|
| cmd + d         | split vertically   |
| cmd + shift + d | split horizontally |
| cmd + t         | open a new tab     |
| cmd + n         | open a new window  |


<!--more-->

当然，如果想要更好地使用 tmux，就得进一步了解其它命令

几个常用命令

|                 操作                |                                  说明                                  |
|-------------------------------------|------------------------------------------------------------------------|
| tmux ls                             | 查看开启了哪些 session                                                 |
| tmux new -s test                    | 创建一个叫做 test 的 session，并且进入 tmux 界面                       |
| tmux attach -t test                 | 进入 session test                                                      |
| tmux kill-session -t target-session | destroys the given session                                             |
| tmux kill-session -a destroys       | destroys all sessions but the given one or the one you are attached to |
| tmux kill-server                    | 关掉所有 session                                                       |

在执行 `tmux` 命令后，可以使用如下快捷键

参考 <http://kumu-linux.github.io/blog/2013/08/06/tmux/>

### 基本操作

|   操作   |                                        说明                                        |
|----------|------------------------------------------------------------------------------------|
| ?        | 列出所有快捷键；按q返回                                                            |
| d        | 脱离当前会话,可暂时返回Shell界面，输入 tmux attach 能够重新进入之前会话            |
| s        | 选择并切换会话；在同时开启了多个会话时使用                                         |
| D        | 选择要脱离的会话；在同时开启了多个会话时使用                                       |
| :        | 进入命令行模式；此时可输入支持的命令，例如 kill-server 关掉所有 tmux 会话          |
| [        | 复制模式，光标移动到复制内容位置，空格键开始，方向键选择复制，回车确认，q/Esc 退出 |
| ]        | 进入粘贴模式，粘贴之前复制的内容，按 q/Esc 退出                                    |
| ~        | 列出提示信息缓存；其中包含了之前tmux返回的各种提示信息                             |
| t        | 显示当前的时间                                                                     |
| ctrl + z | 挂起当前会话                                                                       |

### pane 操作

|      操作     |                          说明                          |
|---------------|--------------------------------------------------------|
| "             | 将当前面板上下分屏                                     |
| %             | 将当前面板左右分屏                                     |
| x             | 关闭当前分屏                                           |
| !             | 将当前面板置于新窗口,即新建一个窗口,其中仅包含当前面板 |
| ctrl + 方向键 | 以 1 个单元格为单位移动边缘以调整当前面板大小          |
| alt + 方向键  | 以 5 个单元格为单位移动边缘以调整当前面板大小          |
| 空格键        | 可以在默认面板布局中切换，试试就知道了                 |
| q             | 显示面板编号                                           |
| o             | 选择当前窗口中下一个面板                               |
| 方向键        | 移动光标选择对应面板                                   |
| {             | 向前置换当前面板                                       |
| }             | 向后置换当前面板                                       |
| alt + o       | 逆时针旋转当前窗口的面板                               |
| ctrl + o      | 顺时针旋转当前窗口的面板                               |
| z             | tmux 1.8 新特性，最大化当前所在面板                    |


### window 操作

|  操作  |                   说明                   |
|--------|------------------------------------------|
| c      | 创建新窗口                               |
| &      | 关闭当前窗口                             |
| 数字键 | 切换到指定窗口                           |
| p      | 切换至上一窗口                           |
| n      | 切换至下一窗口                           |
| l      | 前后窗口间互相切换                       |
| w      | 通过窗口列表切换窗口                     |
| ,      | 重命名当前窗口，便于识别                 |
| .      | 修改当前窗口编号，相当于重新排序         |
| f      | 在所有窗口中查找关键词，便于窗口多了切换 |


下载配置文件（这个是我的配置文件，下载前，请备份自己的配置文件）

```
cd && \
wget "https://raw.githubusercontent.com/FredJiang/.tmux/master/.tmux.conf"
```

```
cd && \
wget "https://raw.githubusercontent.com/FredJiang/.vim/master/.vimrc"
```

tmux 配合 tmuxinator 使用

首先安装 tmuxinator

`gem install tmuxinator`

如果报错

> command not found: gem


centos 下

执行

`sudo yum install -y rubygems`

如果 ruby 版本不够的话，可以使用如下命令升级 ruby

在 centos 上

```
sudo yum groupinstall -y "Development Tools" && \
sudo yum install      -y  openssl-devel && \
sudo yum remove       -y  ruby ruby-devel && \
wget "http://cache.ruby-lang.org/pub/ruby/2.4/ruby-2.4.0.tar.gz" && \
tar xvfvz ruby-2.4.0.tar.gz && \
cd ruby-2.4.0 && \
./configure && \
make && \
sudo make install
```

在 ubuntu 上

```
sudo apt-get --purge remove -y ruby-rvm
sudo rm -rf /usr/share/ruby-rvm /etc/rvmrc /etc/profile.d/rvm.sh
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm --version # 若果 rvm 找不到的话，可以退出再登陆试试
rvm install 2.1.2
```


tmuxinator 安装好后

参考 <https://github.com/tmuxinator/tmuxinator>，执行如下命令，我这用的 shell 是 zsh

注意 tmux 的版本(我安装的时候的版本)

> The recommended version of tmux to use is 1.8 or later, with the exception of 2.5, which is not supported

```
cd && \
wget "https://raw.githubusercontent.com/tmuxinator/tmuxinator/master/completion/tmuxinator.zsh" && \
echo 'export EDITOR="vim"'     >> .zshrc && \
echo 'source ~/tmuxinator.zsh' >> .zshrc && \
source .zshrc && \
tmuxinator doctor
```


创建项目

`tmuxinator new myproject`

```
windows:
  - editor:
      layout: tiled
      # Synchronize all panes of this window, can be enabled before or after the pane commands run.
      # 'before' represents legacy functionality and will be deprecated in a future release, in favour of 'after'
      # synchronize: after
      panes:
        - vim
        - ls
        - ssh name@host -t -A 'pm2 logs'
        - ssh name@host -t -A 'pwd;bash -l'
        - #ls
  - server: bundle exec rails s
  - logs: tail -f log/development.log
```

5 种 layout

* even-horizontal
* even-vertical
* main-horizontal
* main-vertical
* tiled   


参考 

* <http://blog.jobbole.com/87584/>



