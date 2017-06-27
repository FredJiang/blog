---
title: iterm2 上传下载文件
date: 2017-06-27 10:39:59
tags: [iterm2]
---



```
brew install lrzsz
cd /usr/local/bin
sudo wget https://raw.github.com/mmastrac/iterm2-zmodem/master/iterm2-send-zmodem.sh
sudo wget https://raw.github.com/mmastrac/iterm2-zmodem/master/iterm2-recv-zmodem.sh
sudo chmod +x /usr/local/bin/iterm2-*
```

<!--more-->

打开 iTerm2，点击 preferences → profiles，选择某个 profile，如 Default，之后继续选择 advanced → triggers，选择 edit

添加如下triggers

```
    Regular expression: rz waiting to receive.\*\*B0100
    Action: Run Silent Coprocess
    Parameters: /usr/local/bin/iterm2-send-zmodem.sh
    Instant: checked

    Regular expression: \*\*B00000000000000
    Action: Run Silent Coprocess
    Parameters: /usr/local/bin/iterm2-recv-zmodem.sh
    Instant: checked
```


远端目标机器也要安装 `lrzsz`

参考

* <https://github.com/mmastrac/iterm2-zmodem>
* <http://blog.csdn.net/searobbers_duck/article/details/70754112>


