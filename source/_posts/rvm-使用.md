---
title: rvm 使用
date: 2017-09-21 13:00:33
tags: [ruby, rvm]
---

<https://rvm.io/rvm/install>

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash
```

使用 ruby 镜像

<https://ruby.taobao.org/>

<!--more-->

`rvm`

```
echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db

rvm requirements
rvm list
rvm list known
rvm install 2.4.2
rvm install 2.4.2 --disable-binary
rvm use 2.4.2
rvm use 2.4.2 --default
rvm remove 2.4.1
rvm reinstall 2.4.2
```
