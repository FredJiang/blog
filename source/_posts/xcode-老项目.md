---
title: xcode 老项目
date: 2019-04-22 13:25:10
tags: [ios, xcode, mac]
---

* <https://stackoverflow.com/questions/21631313/xcode-project-vs-xcode-workspace-differences>
* <https://kangzubin.com/xcode-build-settings/>

<!--more-->

安装 vmware

安装 mac 虚拟机

安装 xcode

安装 ruby

```shell
\curl -sSL https://get.rvm.io | bash

echo "ruby_url=https://cache.ruby-china.com/pub/ruby" > ~/.rvm/user/db

rvm install 2.6.0

rvm use 2.6.0 --default
```

安装 cocoapods

```shell
# https://gems.ruby-china.com/
sudo gem update --system

gem list | grep cocoapods

sudo gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
gem sources -l

sudo gem install -n /usr/local/bin cocoapods -v 0.39.0
pod _0.39.0_ setup
# sudo gem install -n /usr/local/bin cocoapods
# pod setup
```

如果 `pod install` 报错

```
[!] The `master` repo requires CocoaPods 1.0.0 -  (currently using 0.39.0)
```

<http://blog.cocoapods.org/Sharding/>

则在 Podfile 第一行添加 `source "https://github.com/CocoaPods/Old-Specs"`

```shell
cd ~/.cocoapods/repos/master/
git fetch origin master
git checkout v0.32.1

cd project
pod _0.39.0_ install --no-repo-update
```

```shell
cd ~/Library/Developer/Xcode/DerivedData
```

```objectivec
- CFDictionaryAddValue( animatingCellTable, (void *)item.index, objc_unretainedPointer(item) );
+ CFDictionaryAddValue( animatingCellTable, (void *)item.index,      (__bridge void *)(item) );

- NSMutableDictionary * info = (NSMutableDictionary *) objc_unretainedObject(CFDictionaryGetValue( _selectionColorInfo, (__bridge void *)(view) ));
+ NSMutableDictionary * info = (NSMutableDictionary *)         (__bridge id)(CFDictionaryGetValue( _selectionColorInfo, (__bridge void *)(view) ));
```


<https://www.jianshu.com/p/35d34828e607>

```shell
cp /Users/Fred/Downloads/libstdc* /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk/usr/lib/
cd /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk/usr/lib/ && ls | grep 'c++' | sort | xargs head -n 20

cp /Users/Fred/Downloads/libstdc* /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk/usr/lib/
cd /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk/usr/lib/ && ls | grep 'c++' | sort | xargs head -n 20
```
