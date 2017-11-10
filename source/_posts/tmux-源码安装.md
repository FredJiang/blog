---
title: tmux 源码安装
date: 2017-08-29 17:27:41
tags: [tmux]
---

通过 `yum` 安装

```
sudo yum install -y epel-release
sudo yum install -y tmux
```

<!--more-->


通过源码安装

```
sudo yum groupinstall -y "Development Tools" && \
sudo yum install      -y gcc kernel-devel make ncurses-devel && \
cd && \
curl -OL "https://github.com/libevent/libevent/releases/download/release-2.0.22-stable/libevent-2.0.22-stable.tar.gz" && \
tar -xvzf libevent-2.0.22-stable.tar.gz && \
cd libevent-2.0.22-stable && \
./configure --prefix=/usr/local && \
make && \
sudo make install


cd && \
curl -OL "https://github.com/tmux/tmux/releases/download/2.3/tmux-2.3.tar.gz" && \
tar -xvzf tmux-2.3.tar.gz && \
cd tmux-2.3 && \
LDFLAGS="-L/usr/local/lib -Wl,-rpath=/usr/local/lib" ./configure --prefix=/usr/local && \
make && \
sudo make install
```


通过 git 安装

<https://github.com/tmux/tmux>

```
sudo yum groupinstall -y "Development Tools" && \
sudo yum install      -y gcc kernel-devel make ncurses-devel && \
cd && \
curl -OL "https://github.com/libevent/libevent/releases/download/release-2.0.22-stable/libevent-2.0.22-stable.tar.gz" && \
tar -xvzf libevent-2.0.22-stable.tar.gz && \
cd libevent-2.0.22-stable && \
./configure --prefix=/usr/local && \
make && \
sudo make install


git clone https://github.com/tmux/tmux.git && \
cd tmux && \
sh autogen.sh && \
./configure && \
make && \
sudo make install

./tmux -V

# ./tmux: error while loading shared libraries: libevent-2.0.so.5: cannot open shared object file: No such file or directory

ls /usr/local/lib/ | grep libevent

ls /usr/lib64/ | grep libevent

sudo ln -s /usr/local/lib/libevent-2.0.so.5 /usr/lib64/libevent-2.0.so.5


```

如果 `tmux` 报错

> protocol version mismatch (client 8, server 7)

则找到老的 `tmux` 进程 `ps aux | grep tmux`

然后杀掉进程 `kill -9 $PID`


