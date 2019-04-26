---
title: rvm 使用
date: 2017-09-21 13:00:33
tags: [ruby, rvm, gem]
---

<https://rvm.io/rvm/install>

<!--more-->

mac

```shell
brew install gnupg gnupg2
```

```shell
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
ls ${HOME}/.gnupg*

\curl -sSL https://get.rvm.io | bash
```

使用 ruby 镜像

<https://gems.ruby-china.com/>

<!--more-->


```shell
echo "ruby_url=https://cache.ruby-china.com/pub/ruby" > ~/.rvm/user/db

rvm requirements
rvm list
rvm list known
rvm install 2.6.0
rvm install 2.6.0 --disable-binary
rvm use 2.6.0
rvm use 2.6.0 --default
rvm remove 2.4.1
rvm reinstall 2.6.0

ls ${HOME}/.rvm/rubies/
rvm remove all --archive --gems
```
