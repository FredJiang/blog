---
title: xcode 瘦身
date: 2016-04-17 16:10:36
tags: [ios, xcode]
---

[原文](http://blog.favo.org/post/31649090293/xcode-5-places-to-save-some-disk-space)


###### 1) Archives

打开 Window -> Organizer -> Archives，删掉所有的 archives。如果你觉得一个一个的删太慢的的话，可以在目录 `~/Library/Developer/Xcode/Archives` 下一次全删了。archive 比 ipa 要大，因为里面包含了注入 debug 信息的其他数据。

<!--more-->

###### 2) DerivedData

这个是基于每个项目生成的，其中包含了项目的索引、build output 和日志。DerivedData 是在打开项目之后的某个阶段自动生成的。打开 Window -> Organizer -> Project，删除项目的 DerivedData。

###### 3) Basics (Firmware & Logs)

###### 4) Old Device Information

在 `~/Library/Developer/Xcode/iOS\ DeviceSupport` 下能删除一些老的 iOS 信息。当你链接一个新版本的设备时会在该目录下重新生成。

###### Simulator-Apps

删除模拟器中的应用 `~/Library/Application\ Support/iPhone\ Simulator/` 中的 `Application`