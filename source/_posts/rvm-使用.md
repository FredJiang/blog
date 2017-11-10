---
title: rvm 使用
date: 2017-09-21 13:00:33
tags: [ruby, rvm]
---

使用 ruby 镜像

<https://ruby.taobao.org/>

<!--more-->

rvm 

```
echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db

rvm requirements
rvm list
rvm list known
rvm install 2.4.1 
rvm install 2.4.1 --disable-binary
rvm use 2.4.1
rvm use 2.4.1 --default
rvm remove 2.4.0
rvm reinstall 2.4.1
```
